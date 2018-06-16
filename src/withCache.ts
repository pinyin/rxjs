import {Observable} from 'rxjs'
import {tap} from 'rxjs/operators'
import {ObservableWithCache} from './ObservableWithCache'

export function withCache<T>(cached?: T): (source: Observable<T>) => ObservableWithCache<T> {
    return (source: Observable<T>) => {
        let latest: T | undefined = cached

        const cloned: ObservableWithCache<T> = source.pipe(
            tap(value => latest = value as T) // ???
        )   // TODO

        Object.defineProperty(cloned, 'cached', {
            get: () => {
                return latest
            }
        })

        return cloned
    }
}
