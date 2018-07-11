module.exports = class ErrorRes {
  constructor({ code, msg }) {
    this.code = code
    this.msg = msg
  }
}
