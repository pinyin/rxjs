import {Observable} from 'rxjs'
import {take} from 'rxjs/operators'

export function nextValue<T>(observable: Observable<T>): () => Promise<T> {
    return () => new Promise<T>((resolve, reject) =>
        observable.pipe(take(1)).subscribe(resolve, reject) // TODO is it possible to return a realtime promise directly?
    )
}
