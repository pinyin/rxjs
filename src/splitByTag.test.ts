import {Message} from '@pinyin/types'
import {marbles} from 'rxjs-marbles/jest'
import {splitByTag} from './splitByTag'

type Shape = {
    a: 'a'
    b: 'b'
    c: 'c'
}

describe(`${splitByTag.name}`, () => {
    test(`should return multiple observables by tag`, marbles(m => {
        const source = m.cold<Message<Shape>>(
            'abcd',
            {
                a: {type: 'a', payload: 'a'},
                b: {type: 'b', payload: 'b'},
                c: {type: 'c', payload: 'c'},
                d: {type: 'a', payload: 'a'}
            }
        )
        const result = splitByTag<Shape>(source)
        const expected = {
            a: m.cold('a--a'),
            b: m.cold('-b--'),
            c: m.cold('--c-')
        }
        m.expect(result.a).toBeObservable(expected.a)
        m.expect(result.b).toBeObservable(expected.b)
        m.expect(result.c).toBeObservable(expected.c)
    }))
})
