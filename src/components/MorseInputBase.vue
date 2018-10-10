<template>
<b-col sm="10" class="align-self-center">
  <pre class="text-white text-right" id="translation">{{code}}</pre>
  <pre class="text-white text-right" id="code">{{translation}}</pre>
</b-col>
</template>

<script>
import Vue from 'vue'
//import { morser } from '../morser/singletons.js'
import Morser from '../morser/Morser.js'

const textLength = 64

export default {
  name: 'MorseInputBase',
  props: {
    speed: {
      type: Number,
      default: 25
    },
    volume: {
      type: Number,
      default: 1
    },
    ditKey: {
      type: String,
      default: "."
    },
    dahKey: {
      type: String,
      default: "-"
    }
  },
  watch: {
    speed(newVal) {
      this.morser.setSpeed(1200 / newVal)
    },
    volume(newVal) {
      this.morser.audio.setVolume(newVal)
    }
  },
  data() {
    return {
      morser: new Morser()
    }
  },
  mounted: function() {
    Vue.util.defineReactive(this.morser, 'code', [])
    Vue.util.defineReactive(this.morser, 'translation', [])
    Vue.util.defineReactive(this.morser, 'detectedTokens', [])

    this.morser.setSpeed(1200 / this.speed)
    this.morser.audio.setVolume(this.volume)
    document.addEventListener('keydown', this.keyDown)
    document.addEventListener('keyup', this.keyUp)
  },
  beforeDestroy: function() {
    document.removeEventListener('keydown', this.keyDown)
    document.removeEventListener('keyup', this.keyUp)
  },
  methods: {
    keyDown: function(event) {
      if (event.repeat)
        return
      const keyName = event.key;
      if (keyName == this.ditKey)
        this.morser.input.ditDown()
      if (keyName == this.dahKey)
        this.morser.input.dahDown()
    },

    keyUp: function(event) {
      const keyName = event.key;
      if (keyName == this.ditKey) {
        this.morser.input.ditUp()
      }
      if (keyName == this.dahKey) {
        this.morser.input.dahUp()
      }
    }
  },
  computed: {
    code() {
      var code = this.morser.code.join('')
      if (code.length > textLength)
        code = code.substring(code.length - textLength)
      return code
    },
    translation() {
      var translation = this.morser.translation.join('')
      if (translation.length > textLength)
        translation = translation.substring(translation.length - textLength)
      return translation
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
pre {
  font-size: 30px;
  font-family: monospace;
}
</style>
