import {Subject} from 'rxjs'
import {ObservableWithCache} from './ObservableWithCache'
import {withCache} from './withCache'

describe(`${withCache.name}`, () => {
    const source: Subject<number> = new Subject()
    const cached: ObservableWithCache<number> = source.pipe(withCache(1))

    test(`should create a cache property on result observable`, () => {
        expect(cached.cached).toEqual(1)
    })

    test(`should not affect original observable`, () => {
        expect((source as any).cached).toBeUndefined()
    })

    test(`should automatically update cache to latest emitted value`, () => {
        const subscription = cached.subscribe()
        source.next(2)
        subscription.unsubscribe()
        expect(cached.cached).toEqual(2)
    })
})
