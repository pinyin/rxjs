import {Observable, Subscriber, Unsubscribable} from 'rxjs'

export function fromAsyncIterator<T>(iterator: AsyncIterator<T>): Observable<T> {
    return Observable.create((subscriber: Subscriber<T>): Unsubscribable => {
        async function forwardValues(): Promise<void> {
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
        }

        forwardValues()

        return {
            unsubscribe: () => {} // FIXME memory leak?
        }
    })
}

