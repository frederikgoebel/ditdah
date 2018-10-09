import { decode } from "./translator.js"
import MorseAudio from "./MorseAudio.js"
import Tokens from "./Tokens.js"
import Input from "./Input.js"

class Morser {
  constructor(input = new Input()) {
    this.audio = new MorseAudio()
    this.input = input
    this.code = []
    this.word = []
    this.translation = []
    this.detectedTokens = []

    this.isPlaying = true

    this.ditsToPlay = 0
    this.last = null

    this.dit = {
      dits: 1,
      time: 1 * 120,
      sign: "·",
      wasDown: false,
      isDown: false,
    }
    this.dah = {
      dits: 3,
      time: 3 * 120,
      sign: "−",
      wasDown: false,
      isDown: false,
    }
    this.space = {
      dits: 3,
      time: 3 * 120,
      sign: " "
    }
    this.pause = {
      dits: 7,
      time: 7 * 120,
      sign: " "
    }

    this.setSpeed(120)
  }

  setSpeed(ditTime) {
    this.dit.time = this.dit.dits * ditTime
    this.dah.time = this.dah.dits * ditTime
    this.space.time = this.space.dits * ditTime
    this.pause.time = this.pause.dits * ditTime
    clearInterval(this.ticker)
    this.ticker = setInterval(() => {
      this.tick()
    }, this.dit.time);
  }

  // called every dit milliseconds
  tick() {
    if (!this.isPlaying)
      return
    if (this.ditsToPlay > 0) {
      this.ditsToPlay--
      return
    }
    switch (this.input.nextToken()) {
      case Tokens.DAH:
        this.addCode(this.dah)
        break
      case Tokens.DIT:
        this.addCode(this.dit)
        break
      case Tokens.SPACE:
        this.addSpace(this.space)
        break
    }
  }

  addCode(code) {
    this.last = code
    this.ditsToPlay = code.dits
    this.code.push(code.sign)
    this.translation.push(this.space.sign)

    code.wasDown = false
    this.word.push(code.sign)
    this.audio.playFor(code.time)
  }

  addSpace() {
    this.last = null
    this.ditsToPlay = this.space.dits
    this.code.push(this.space.sign)
    this.translation.push(this.space.sign)

    if (this.word.length > 0) {
      this.translate()
      this.word = []
    }
  }

  translate() {
    var translation = decode(this.word.join(''))
    if (translation) {
      this.detectedTokens.push(translation)
      var index = this.translation.length - this.word.length - 1
      this.translation[index] = translation
    }
  }
  go() {
    this.isPlaying = true
  }
  stop() {
    this.isPlaying = false
  }
}


export default Morser
