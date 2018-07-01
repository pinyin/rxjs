import {existing} from '@pinyin/maybe'
import {something} from '@pinyin/types'
import {isObservable, Observable, Subject, Subscriber, Subscription, TeardownLogic} from 'rxjs'
import {takeUntil} from 'rxjs/operators'
import {Pulse} from './Pulse';

export function fromReactiveIterator<T extends Exclude<something, Observable<any>>>(
    iterator: Iterator<T | Observable<any>>
): Observable<T> {
    return Observable.create((subscriber: Subscriber<T>): TeardownLogic => {
        const subscription = new Subscription()
        const closeSignal = new Subject()

        const closeIterator = closeSignal.subscribe(() => {
            if (existing(iterator.return)) {
                iterator.return()
            }
        })
        subscription.add(closeIterator)

        async function forwardValues(): Promise<void> {
            try {
                for (let next = iterator.next(); !subscriber.closed && !next.done;) {
                    if (isObservable<any>(next.value)) {
                        let value: any
                        try {
                            value = await next.value.pipe(takeUntil(closeSignal)).toPromise()
                        } catch (e) {
                            if (existing(iterator.throw)) {
                                iterator.throw(e)
                            }
                        }
                        next = iterator.next(value)
                    } else {
                        subscriber.next(next.value as T) // TODO why is type cast necessary?
                        next = iterator.next()
                    }
                }
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

export class Closed extends Error {
    constructor() {
        super(`Reactive iterator closed.`)
    }
}
