import {existing} from '@pinyin/maybe'
import {nothing, something} from '@pinyin/types'
import {isObservable, Observable, Subject, Subscriber, Subscription, TeardownLogic} from 'rxjs'
import {takeUntil} from 'rxjs/operators'
import {IteratorTerminated} from './IteratorTerminated'
import {Pulse} from './Pulse'

export function fromReactiveIterator<T extends Exclude<something, Observable<any>>>(
    iterator: Iterator<T | Observable<any>>
): Observable<T> {
    return Observable.create((subscriber: Subscriber<T>): TeardownLogic => {
        const subscription = new Subscription()
        const closeSignal = new Subject()

        let completed = false
        const closeIteratorOnUnsubscribe = closeSignal.subscribe(() => {
            if (!completed) {
                if (existing(iterator.throw)) {
                    iterator.throw(IteratorTerminated)
                }
            }
        })
        subscription.add(closeIteratorOnUnsubscribe)

        async function forwardValues(): Promise<void> {
            try {
                for (let next = iterator.next();
                     !subscriber.closed && !next.done;) {
                    let value: any = nothing
                    if (isObservable<any>(next.value)) {
                        try {
                            value = await next.value.pipe(takeUntil(closeSignal)).toPromise()
                        } catch (e) {
                            if (existing(iterator.throw)) {
                                iterator.throw(e)
                            }
                        }
                    } else {
                        value = next
                        subscriber.next(next.value as T) // TODO why is type cast necessary?
                    }
                    next = iterator.next(value)
                }
                completed = true
                subscriber.complete()
            } catch (e) {
                subscriber.error(e)
            }
        }

        forwardValues()

        return () => {
            subscription.unsubscribe()
            closeSignal.next(Pulse)
        }
    })
}


