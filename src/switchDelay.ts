import {Observable} from 'rxjs'
import {mapTo, switchMap, take} from 'rxjs/operators'
import {Pipe} from './Pipe'
import {Pulse} from './Pulse'

export function switchDelay<T>(signal: Observable<Pulse>): Pipe<T, T> {
    return (obs: Observable<T>): Observable<T> => {
        return obs.pipe(
            switchMap(value =>
                signal.pipe(
                    take(1),
                    mapTo(value)
                )
            )
        )
    }
}
