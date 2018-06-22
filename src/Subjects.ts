import {Subject} from 'rxjs'

export type Subjects<Events, Key extends keyof Required<Events> = keyof Required<Events>> = {
    [K in Key]: Subject<Events[K]>
}
