import {Observable} from 'rxjs/internal/Observable'
import {concat} from 'rxjs/internal/observable/concat'
import {defer} from 'rxjs/internal/observable/defer'
import {of} from 'rxjs/internal/observable/of'

export function startWithLazy<T>(value: () => T): (source: Observable<T>) => Observable<T> {
    return (source: Observable<T>) => defer(() => concat(of(value()), source))
}
