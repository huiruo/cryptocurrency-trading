const Error = require('../error/error')

export{}
class MissingParameterError extends Error {
  constructor (paramNames) {
    super(`One or more of required parameters is missing: ${paramNames ? paramNames.slice().join(', ') : ''} `)
    this.name = 'MissingParameterError'
  }
}

module.exports = MissingParameterError
