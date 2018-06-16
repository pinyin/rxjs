import {Message} from '@pinyin/types'
import {Observable} from 'rxjs/internal/Observable'
import {merge} from 'rxjs/internal/observable/merge'
import {map} from 'rxjs/operators'
import {Observables} from './Observables'

export function namedMerge<T extends object>(observables: Observables<T>): Observable<Message<T>> {
    const keys = Object.keys(observables) as Array<keyof T>
    const obsArray: Array<Observable<Message<T>>> =
        keys.map(key =>
            observables[key].pipe(
                map(value => ({type: key, payload: value} as Message<T>))
            )
        )

    return merge(...obsArray)
}

