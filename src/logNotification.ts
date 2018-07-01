import {Notification, Observable, OperatorFunction} from 'rxjs'
import {dematerialize, materialize} from 'rxjs/operators'
import {logValue} from './logValue'

export function logNotification<T>(tag: string, func?: (value: Notification<T>) => any): OperatorFunction<T, T> {
    return (obs: Observable<T>): Observable<T> => obs.pipe(
        materialize(),
        logValue(tag, func),
        dematerialize()
    )
}
