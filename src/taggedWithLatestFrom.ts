import {EMPTY, Observable} from 'rxjs'
import {withLatestFrom} from 'rxjs/operators'
import {Observables} from './Observables'

export function taggedWithLatestFrom<T extends object>(origin: Observables<T>): Observable<T> {
    const keys = Object.keys(origin) as Array<keyof T>
    return keys
        .reduce(
            (prev, name: keyof T) => mergeEventInto(prev, name, origin[name]),
            EMPTY as Observable<T>
        )
}

function mergeEventInto<Obj, Key extends keyof Obj>(to: Observable<Obj>, toKey: Key, from: Observable<Obj[Key]>): Observable<Obj> {
    return to.pipe(withLatestFrom(from, (toItem, fromItem) => (toItem[toKey] = fromItem, toItem)))
}
