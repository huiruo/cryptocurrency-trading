import { MissingParameterError } from '../error/missingParameterError'
import { isEmptyValue } from './utils'

export const validateRequiredParameters = paramObject => {
  if (!paramObject || isEmptyValue(paramObject)) { throw new MissingParameterError() }
  const emptyParams = []
  Object.keys(paramObject).forEach(param => {
    if (isEmptyValue(paramObject[param])) {
      emptyParams.push(param)
    }
  })
  if (emptyParams.length) { throw new MissingParameterError(emptyParams) }
}

export const hasOneOfParameters = paramObject => {
  if (!paramObject || isEmptyValue(paramObject)) { throw new MissingParameterError() }
  const params = Object.values(paramObject)
  if (params.every(isEmptyValue)) {
    throw new MissingParameterError(Object.keys(paramObject))
  }
}
