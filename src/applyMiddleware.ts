import {ShapeOf} from '@pinyin/types'
import {Observables} from './Observables'
import {Pipes} from './Pipes'

export function applyMiddleware<T extends object, R extends ShapeOf<T>>(
    origin: Observables<T>, pipes: Pipes<T, R>
): Observables<R> {
    const keys = Object.keys(origin) as Array<keyof T>
    return keys
        .map(key => ({[key]: pipes[key](origin[key])}))
        .reduce((prev, curr) => Object.assign(prev, curr)) as any
}
