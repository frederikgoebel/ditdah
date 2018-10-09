import { encode } from './translator.js'

class InputH2C {
  constructor() {
    this.toSend = []
    this.index = -1
  }
  nextToken() {
    this.index++
    if (this.index < this.toSend.length)
      return this.toSend[this.index]
  }
  talk(text) {
    this.index = -1
    this.toSend = encode(text)
  }
}

export default InputH2C
