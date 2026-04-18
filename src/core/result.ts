export class Fail<F, S> {
  readonly value: F

  constructor(value: F) {
    this.value = value
  }

  isFail(): this is Fail<F, S> {
    return true
  }

  isSucess(): this is Sucess<F, S> {
    return false
  }
}

export class Sucess<F, S> {
  readonly value: S

  constructor(value: S) {
    this.value = value
  }

  isFail(): this is Fail<F, S> {
    return false
  }

  isSucess(): this is Sucess<F, S> {
    return true
  }
}

export type Result<F, S> = Fail<F, S> | Sucess<F, S>

export function fail<F, S>(value: F): Result<F, S> {
  return new Fail<F, S>(value)
}

export function sucess<F, S>(value: S): Result<F, S> {
  return new Sucess<F, S>(value)
}