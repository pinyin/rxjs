import {marbles} from 'rxjs-marbles/jest'
import {deduplicate} from './deduplicate'

describe(`${deduplicate.name}`, () => {
    test(`should not emit duplicate item`, marbles(m => {
        const source = m.cold('abcbacacb')
        const result = source.pipe(deduplicate(m.time('---|'), (a, b) => a === b, m.scheduler))
        const expected = m.cold('abc-a---b')
        m.expect(result).toBeObservable(expected)
    }))
})
