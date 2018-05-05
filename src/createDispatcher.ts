import {EventHandlers, ShapeOf} from '@pinyin/types'
import {applyMiddleware} from './applyMiddleware'
import {createPublishers} from './createPublishers'
import {createSubjects} from './createSubjects'
import {Observables} from './Observables'
import {Pipes} from './Pipes'

export function createDispatcher<T extends object, R extends ShapeOf<T> = T>(
    middleware: Pipes<T, R>
): Dispatcher<T, R> {
    const subjects = createSubjects<T>(middleware)
    return Object.assign(
        {publish: createPublishers<T>(subjects)},
        applyMiddleware<T, R>(subjects, middleware)
    )
}

export type Dispatcher<T extends object, R extends ShapeOf<T>> =
    { publish: EventHandlers<T> } &
    Observables<R>

export function publishAll<T extends object>(value: T, handlers: EventHandlers<T>): void {
    const keys = Object.keys(handlers) as Array<keyof T>
    keys.forEach(key => handlers[key](value[key]))
}
