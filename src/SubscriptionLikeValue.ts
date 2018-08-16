import {SubscriptionLike} from 'rxjs'

export type SubscriptionLikeValue<T> = SubscriptionLike & { value?: T }

