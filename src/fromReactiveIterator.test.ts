import {Observable, timer} from 'rxjs'
import {mapTo, startWith, takeUntil, tap, toArray} from 'rxjs/operators'
import {fromReactiveIterator} from './fromReactiveIterator'

describe(`${fromReactiveIterator.name}`, () => {
    let finished = 0
    function* generator(): Iterator<number | Observable<any>> {
        yield 1
        yield timer(100)
        yield 2
        yield timer(100).pipe(startWith(1))
        yield 3
        const d: 4 = yield timer(100).pipe(mapTo(4))
        yield d
        yield timer(100).pipe(tap(() => finished++))
    }

    it(`should convert iterator to observable`, async () => {
        const result = fromReactiveIterator(generator()).pipe(toArray()).toPromise()
        expect(await result).toEqual([1, 2, 3, 4])
        expect(finished).toEqual(1)
    })

    it(`should terminate unfinished observable when unsubscribed`, async () => {
        const result = fromReactiveIterator(generator()).pipe(takeUntil(timer(350)), toArray()).toPromise()
        expect(await result).toEqual([1, 2, 3, 4])
        expect(finished).toEqual(1)
    })
})
