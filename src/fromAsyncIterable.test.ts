import 'babel-polyfill'
import {timer} from 'rxjs'
import {takeUntil, toArray} from 'rxjs/operators'
import {fromAsyncIterable} from './fromAsyncIterable'

describe(`${fromAsyncIterable.name}`, () => {
    let finished = 0

    async function* generator() {
        yield 1
        yield await timer(300).toPromise()
        yield 2
        yield await timer(300).toPromise()
        finished++
    }

    test(`should convert async iterable to observable`, async () => {
        const result = await fromAsyncIterable(generator()).pipe(toArray()).toPromise()
        expect(result).toEqual([1, 0, 2, 0])
        expect(finished).toEqual(1)
    })

    test(`should await async iterables in order`, async () => {
        const result = await fromAsyncIterable(generator()).pipe(takeUntil(timer(500)), toArray()).toPromise()
        expect(result).toEqual([1, 0, 2])
        expect(finished).toEqual(1)
    })
})
