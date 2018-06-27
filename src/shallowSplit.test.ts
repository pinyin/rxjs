import {marbles} from 'rxjs-marbles'
import {shallowSplit} from './shallowSplit'

describe(`${shallowSplit.name}`, () => {
    type Shape = {
        s1: string
        s2: string
    }

    test(`should split tagged observable to observables`, marbles(m => {
        const source = m.cold<Shape>('ab', {a: {s1: 'a', s2: 'b'}, b: {s1: 'c', s2: 'd'}})
        const result = shallowSplit(source)
        const expected = {s1: m.cold('ac'), s2: m.cold('bd')}
        m.expect(result.s1).toBeObservable(expected.s1)
        m.expect(result.s2).toBeObservable(expected.s2)
    }))
})
