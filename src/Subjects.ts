import {Subject} from 'rxjs/internal/Subject'

export type Subjects<Events, Key extends keyof Required<Events> = keyof Required<Events>> = {
    [K in Key]: Subject<Events[K]>
}
