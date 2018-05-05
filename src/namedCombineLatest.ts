import {Observable} from 'rxjs/internal/Observable'
import {combineLatest} from 'rxjs/internal/observable/combineLatest'
import {map} from 'rxjs/operators'
import {Observables} from './Observables'

export function namedCombineLatest<T extends object>(observables: Observables<T>): Observable<T> {
    const keys = Object.keys(observables) as Array<keyof T>
    const obs = keys.map(key => observables[key])

    return combineLatest(obs).pipe(
        map(values =>
            values
                .map((value, i) => ({[keys[i]]: value}))
                .reduce((prev, curr) => Object.assign(prev, curr)) as any
        )
    )
}
