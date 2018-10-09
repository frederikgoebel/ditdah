import Tokens from "./Tokens.js"

class Input {
  constructor() {
    this.ditsToPlay = 0
    this.last = null

    this.ditIsDown = false
    this.dahIsDown = false
    // keep the order of down events so the order of ifs does not matter
    this.toPlay = []
  }
  nextToken() {
    if (this.toPlay.length > 0) {
      let tp = this.toPlay.shift()
      this.last = tp
      return tp
    }

    if (this.last == Tokens.DAH && this.ditIsDown) {
      this.last = Tokens.DIT
      return Tokens.DIT
    } else if (this.last == Tokens.DIT && this.dahIsDown) {
      this.last = Tokens.DAH
      return Tokens.DAH
    } else if (this.ditIsDown) {
      this.last = Tokens.DIT
      return Tokens.DIT
    } else if (this.dahIsDown) {
      this.last = Tokens.DAH
      return Tokens.DAH
    } else {
      this.last = Tokens.SPACE
      return Tokens.SPACE
    }
  }

  ditDown() {
    this.ditIsDown = true
    this.toPlay.push(Tokens.DIT)
  }
  dahDown() {
    this.dahIsDown = true
    this.toPlay.push(Tokens.DAH)
  }
  ditUp() {
    this.ditIsDown = false
  }
  dahUp() {
    this.dahIsDown = false
  }
}

export default Input
