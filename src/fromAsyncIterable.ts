import {Observable, Subscriber, Unsubscribable} from 'rxjs'

export function fromAsyncIterable<T>(iterable: AsyncIterable<T>): Observable<T> {
    return Observable.create((subscriber: Subscriber<T>): Unsubscribable => {
        const iterator = iterable[Symbol.asyncIterator]()

        ;(async (): Promise<void> => { // best place for a semicolon ever ...
            try {
                do {
                    const next = await iterator.next()
                    if (next.done) {
                        break
                    }
                    subscriber.next(next.value)
                } while (!subscriber.closed)
                subscriber.complete()
            } catch (e) {
                subscriber.error(e)
            }
        })()

        return {
            unsubscribe: () => {} // FIXME memory leak?
        }
    })
}

