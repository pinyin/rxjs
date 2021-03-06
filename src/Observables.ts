import {Observable} from 'rxjs'

export type Observables<Events extends object, Name extends keyof Events = keyof Events> = {
    [N in Name]: Observable<Events[N]>
}

