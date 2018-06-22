import {ms} from '@pinyin/types'
import {Observable, timer} from 'rxjs'
import {distinctUntilChanged, map, merge, scan, switchMap, timestamp, withLatestFrom} from 'rxjs/operators'
import {Pipe} from './Pipe'

export function auditTimeStable<T>(time: ms): Pipe<T> {
    return function (input: Observable<T>): Observable<T> {
        return input.pipe(
            timestamp(),
            scan((prev, curr) => curr.timestamp - prev.timestamp < time ? prev : curr),
            distinctUntilChanged(),
            merge(input.pipe(switchMap(() => timer(time)))),
            withLatestFrom(input),
            map(([_, input]) => input)
        )
    }
}
