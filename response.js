export default class Response {
  constructor(statusCode, text) {
    console.log('Response constructor', {statusCode, text});
    this.statusCode = statusCode;
    this.text = text;
  }
}
