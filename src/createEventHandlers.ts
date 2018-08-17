import {EventHandlers} from '@pinyin/types'
import {Subjects} from './Subjects'

export function createEventHandlers<T extends object>(source: Subjects<T>): EventHandlers<T> {
    const publishers: EventHandlers<T> = {} as any
    const keys = Object.keys(source) as Array<keyof T & string>
    keys.forEach(key => {
        publishers[key] = (value: T[typeof key]) => source[key].next(value)
    })
    return publishers
}
