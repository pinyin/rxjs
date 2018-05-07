import {Discriminated} from '@pinyin/types'
import {Observable} from 'rxjs/internal/Observable'
import {merge} from 'rxjs/internal/observable/merge'
import {map} from 'rxjs/operators'
import {Observables} from './Observables'

export function namedMerge<T extends object>(observables: Observables<T>): Observable<Discriminated<T>> {
    const keys = Object.keys(observables) as Array<keyof T>
    const obsArray: Array<Observable<Discriminated<T>>> =
        keys.map(key =>
            observables[key].pipe(
                map(value => (Object.assign({type: key}, value) as Discriminated<T>))
            )
        )

    return merge(...obsArray)
}

