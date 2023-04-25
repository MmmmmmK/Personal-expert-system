export type Question = {
    title: string
}

export type Exodus = {
    name: string,
    probability: number
    pair: Array<Probabilities>
}

export type Probabilities = {
    number: number,
    good: number,
    bad: number
}