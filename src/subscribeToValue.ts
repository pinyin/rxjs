import {Observable} from 'rxjs'
import {SubscriptionLikeValue} from './SubscriptionLikeValue'

export function subscribeToValue<T>(obs: Observable<T>): SubscriptionLikeValue<T> {
    const subscription: SubscriptionLikeValue<T> =
        obs.subscribe(value => subscription.value = value)

    return subscription
}
