import {existing} from '@pinyin/maybe'
import {ShapeOf} from '@pinyin/types';
import {Observable} from 'rxjs'
import {map} from 'rxjs/operators'
import {Observables} from './Observables'

export function shallowSplit<T extends object>(source: Observable<T>,
                                               shape?: ShapeOf<T>): Observables<T> {
    if (existing(shape)) {
        const keys = Object.keys(shape) as Array<keyof T>
        return keys
            .map(key => ({[key]: source.pipe(map(value => value[key]))}))
            .reduce((prev, curr) => Object.assign(prev, curr)) as any
    } else {
        return new Proxy<Observables<T>>({} as any, {
            get(target: {}, p: keyof T, receiver: any): any {
                return source.pipe(map(value => value[p]))
            }
        })
    }
}
