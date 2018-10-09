import audioDriver from './audioDriver.js'

class MorseAudio {
  constructor() {
    this.volume = 0.0
    this.audioCtx = audioDriver
    this.oscillator = this.audioCtx.createOscillator();
    this.gainNode = this.audioCtx.createGain();
    this.oscillator.connect(this.gainNode);
    this.oscillator.frequency.value = 600;
    this.gainNode.gain.value = this.volume;
    this.oscillator.start(0)
    this.gainNode.connect(this.audioCtx.destination);
  }
  playFor(milliseconds) {
    this.gainNode.gain.setTargetAtTime(this.volume, this.audioCtx.currentTime, 0.0015);
    setTimeout(() => {
      this.gainNode.gain.setTargetAtTime(0, this.audioCtx.currentTime, 0.0015);
    }, milliseconds);
  }

  setVolume(volume) {
    this.volume = volume
  }
}

export default MorseAudio
