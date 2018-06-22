import {ShapeOf} from '@pinyin/types';
import {Observable} from 'rxjs'
import {map} from 'rxjs/operators'
import {Observables} from './Observables'

export function splitObservable<T extends object>(observable: Observable<T>, shape: ShapeOf<T>): Observables<T> {
    const keys = Object.keys(shape) as Array<keyof T>
    return keys
        .map(key => ({[key]: observable.pipe(map(value => value[key]))}))
        .reduce((prev, curr) => Object.assign(prev, curr)) as any
}
