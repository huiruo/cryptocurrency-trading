import { Error } from '../error/error'

export class MissingParameterError extends Error {
  public name: string;
  constructor(paramNames?) {
    super(`One or more of required parameters is missing: ${paramNames ? paramNames.slice().join(', ') : ''} `)
    this.name = 'MissingParameterError'
  }
}
