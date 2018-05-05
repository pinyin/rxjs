import {ShapeOf} from '@pinyin/types'
import {Pipe} from './Pipe'

export type Pipes<In extends object,
    Out extends ShapeOf<In> = In,
    Key extends keyof Required<In> = keyof Required<In>> = {
    [K in Key]: Pipe<In[K], Out[K]>
}
