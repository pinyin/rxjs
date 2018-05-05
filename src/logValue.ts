import {tap} from 'rxjs/operators'
import {Pipe} from './Pipe'

export function logValue<T>(tag: string, func?: (value: T) => any): Pipe<T, T> {
    return tap(event => console.log(tag, func ? func(event) : event))
}
