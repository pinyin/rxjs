import {Observable} from 'rxjs'

export type Pipe<A, B=A> = (source: Observable<A>) => Observable<B>

export type Pass<T> = Pipe<T, T>
export const Pass = <T>(observable: Observable<T>): Observable<T> => observable

