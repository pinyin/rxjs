import 'babel-polyfill'
import {timer} from 'rxjs'
import {mapTo, takeUntil, toArray} from 'rxjs/operators'
import {fromAsyncIterator} from './fromAsyncIterator'

// TODO don't use real time
describe(`${fromAsyncIterator.name}`, () => {
    let finished = 0

    async function* generator(): AsyncIterableIterator<number> {
        yield 1
        await timer(300).toPromise()
        yield 2
        yield timer(300).pipe(mapTo(3)).toPromise()
        yield* [4]
        finished++
    }

    test(`should convert async iterable to observable`, async () => {
        const result = await fromAsyncIterator(generator()).pipe(toArray()).toPromise()
        expect(result).toEqual([1, 2, 3, 4])
        expect(finished).toEqual(1)
    })

    test(`should await async iterable in order`, async () => {
        const result = await fromAsyncIterator(generator()).pipe(takeUntil(timer(500)), toArray()).toPromise()
        expect(result).toEqual([1, 2])
        expect(finished).toEqual(1)
    })
})
