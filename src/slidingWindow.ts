import {ms} from '@pinyin/types'
import {Observable, OperatorFunction, SchedulerLike, Subscriber, Subscription, TeardownLogic} from 'rxjs'
import {async} from 'rxjs/internal/scheduler/async'

// inspired by https://github.com/bkon/rx-op-sliding-window
export function slidingWindow<T>(duration: ms,
                                 scheduler: SchedulerLike = async): OperatorFunction<T, Array<T>> {
    return (source: Observable<T>): Observable<Array<T>> => {
        return Observable.create((subscriber: Subscriber<Array<T>>): TeardownLogic => {
            const cache: Array<T> = []
            const subscription = new Subscription()

            const updateCache = source.subscribe(
                value => {
                    cache.push(value)
                    const removeFromCache = scheduler.schedule(() => cache.shift(), duration)
                    subscription.add(removeFromCache)
                    subscriber.next(Array.from(cache))
                },
                error => {
                    subscriber.error(error)
                },
                () => {
                    subscriber.complete()
                }
            )
            subscription.add(updateCache)

            return subscription
        })
    }
}
