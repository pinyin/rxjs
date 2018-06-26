import {marbles} from 'rxjs-marbles/jest'
import {slidingWindow} from './slidingWindow'

describe(`${slidingWindow.name}`, () => {
    test(`should return a sliding window buffer`, marbles(m => {
        const source = m.cold("---a-bcd|")
        const result = source.pipe(slidingWindow(m.time('--|'), m.scheduler))
        const expected = m.cold("---a-bcd|", {a: ['a'], b: ['a', 'b'], c: ['b', 'c'], d: ['b', 'c', 'd']})
        m.expect(result).toBeObservable(expected)
    }))
})
