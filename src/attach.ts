import {OperatorFunction} from 'rxjs'
import {Observable} from 'rxjs/internal/Observable'
import {merge} from 'rxjs/internal/observable/merge';
import {ignoreElements, shareReplay} from 'rxjs/operators'

export type SideEffect<T=any> = OperatorFunction<T, T> | Observable<any>
export function attach<T>(sideEffect: SideEffect<T>): OperatorFunction<T, T> {
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

