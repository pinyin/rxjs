import {Observable} from 'rxjs/internal/Observable'
import {merge} from 'rxjs/internal/observable/merge';
import {ignoreElements, shareReplay} from 'rxjs/operators'
import {Pipe} from './Pipe'

export type SideEffect<T=any> = Pipe<T, any> | Observable<any>
export function attach<T>(sideEffect: SideEffect<T>): Pipe<T, T> {
    return (source$: Observable<T>): Observable<T> => {
        const origin$ = source$.pipe(
            shareReplay(1)
        )
        return merge(
            origin$,
            origin$.pipe(
                typeof sideEffect === 'function' ? sideEffect : () => sideEffect,
                ignoreElements()
            )
        )
    }
}

