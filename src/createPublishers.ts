import {EventHandlers} from '@pinyin/types';
import {Subjects} from './Subjects'

export function createPublishers<T extends object>(subjects: Subjects<T>): EventHandlers<T> {
    const keys = Object.keys(subjects) as Array<keyof T>
    return keys
        .map(key => ({[key]: (value: T[typeof key]) => subjects[key].next(value)}))
        .reduce((prev, curr) => Object.assign(prev, curr)) as any
}
