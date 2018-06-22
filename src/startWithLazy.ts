import {concat, defer, Observable, of} from 'rxjs'

export function startWithLazy<T>(value: () => T): (source: Observable<T>) => Observable<T> {
    return (source: Observable<T>) => defer(() => concat(of(value()), source))
}
