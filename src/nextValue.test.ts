import {timer} from 'rxjs'
import {share} from 'rxjs/operators'
import {nextValue} from './nextValue'

describe(`${nextValue.name}`, () => {
    const observable = timer(100, 100).pipe(share())
    const next = nextValue(observable)

    test(`should return next value from observable`, async () => {
        const subscription = observable.subscribe() // make observable emit value

        expect(await next()).toEqual(0)
        await timer(50).toPromise()
        expect(await next()).toEqual(1)
        await timer(150).toPromise()
        expect(await next()).toEqual(3)

        subscription.unsubscribe()
    })

    test(`should release observable after await`, async () => {
        const first = await next()
        expect(first).toEqual(0)
        const second = await next()
        expect(second).toEqual(0)
    })

})
