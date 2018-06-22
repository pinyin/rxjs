import {ShapeOf} from '@pinyin/types'
import {Subject} from 'rxjs'
import {Subjects} from './Subjects'

export function createSubjects<T extends object>(names: ShapeOf<T>): Subjects<T> {
    const keys = Object.keys(names) as Array<keyof T>
    return keys
        .map(key => ({[key]: new Subject()}))
        .reduce((prev, curr) => Object.assign(prev, curr)) as any
}
