import {Tagged} from '@pinyin/types'
import {merge, Observable} from 'rxjs'
import {map} from 'rxjs/operators'
import {Observables} from './Observables'

export function namedMerge<T extends object>(observables: Observables<T>): Observable<Tagged<keyof T>> {
    const keys = Object.keys(observables) as Array<keyof T>
    const obsArray: Array<Observable<Tagged<keyof T>>> =
        keys.map(key =>
            observables[key].pipe(
                map(value => ({type: key, payload: value}))
            )
        )

    return merge(...obsArray)
}

