class Error {
  public message?:any;
  public name?:string;
  constructor (message) {
    this.message = message
    this.name = 'Error'
  }
}

module.exports = Error
export {}