import {OperatorFunction} from 'rxjs'
import {tap} from 'rxjs/operators'

export function logValue<T>(tag: string, func?: (value: T) => any): OperatorFunction<T, T> {
    return tap(event => console.log(tag, func ? func(event) : event))
}
