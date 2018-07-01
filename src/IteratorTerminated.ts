export class IteratorTerminated extends Error {
    constructor() {
        super(`Iterator terminated.`)
    }
}
