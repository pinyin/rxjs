import {existing} from '@pinyin/maybe'
import {Message, ShapeOf} from '@pinyin/types'
import {Observable} from 'rxjs'
import {filter, map} from 'rxjs/operators'
import {Observables} from './Observables'

export function splitByTag<S extends object>(observable: Observable<Message<S>>,
                                             shape?: ShapeOf<S>): Observables<S> {
    if (existing(shape)) {
        return Object.keys(shape)
            .map(key => ({
                [key]: observable.pipe(
                    filter(message => message.type === key),
                    map(message => message.payload)
                )
            }))
            .reduce((acc, curr) => Object.assign(acc, curr), {} as Observables<S>)
    } else {
        return new Proxy({} as any, {
            get(target: {}, p: keyof S, receiver: any): any {
                return observable.pipe(
                    filter(message => message.type === p),
                    map(message => message.payload)
                )
            }
        })
    }
}
