import {Observable} from 'rxjs'

export type ObservableWithCache<T> = Observable<T> & { cached?: T }
