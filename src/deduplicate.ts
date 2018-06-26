import {ms} from '@pinyin/types'
import {Observable, OperatorFunction, SchedulerLike} from 'rxjs'
import {async} from 'rxjs/internal/scheduler/async'
import {filter, map} from 'rxjs/operators'
import {slidingWindow} from './slidingWindow'

export function deduplicate<T>(
    duration: ms,
    equals: (a: T, b: T) => boolean = (a, b) => a === b,
    scheduler: SchedulerLike = async
): OperatorFunction<T, T> {
    return (source: Observable<T>): Observable<T> => {
        return source.pipe(
            slidingWindow(duration, scheduler),
            filter(buffer => {
                const curr = buffer[buffer.length - 1]
                for (let i = 0; i < buffer.length - 1; i++) {
                    if (equals(curr, buffer[i])) {
                        return false
                    }
                }
                return true
            }),
            map(buffer => buffer[buffer.length - 1])
        )
    }
}
