<template>
<b-col sm="12">
  <b-row class="h-75 align-self-center">
    <b-col sm="10" class="align-self-end">
      <pre class="text-white text-right" id="translation">{{code}}</pre>
    </b-col>
    <b-col sm="10">
      <pre class="text-white text-right" id="code">{{translation}}</pre>
    </b-col>

  </b-row>
  <b-row class="h-25 align-items-center">
    <b-col sm="12" class="s">
      <b-input-group size="lg">
        <b-form-input v-model="toSend" type="text" placeholder="Enter sth"></b-form-input>
        <b-input-group-append>
          <b-button v-on:click="send">Send</b-button>
          <b-button :disabled="morser.input.toSend.length == 0" v-on:click="playPause">{{morser.isPlaying?"Pause":"Resume"}}</b-button>
        </b-input-group-append>
      </b-input-group>

    </b-col>
  </b-row>
</b-col>
</template>

<script>
import Vue from 'vue'
import Morser from '../morser/Morser.js'
import InputH2C from '../morser/InputH2C.js'



const textLength = 64

export default {
  props: ["speed", "volume"],
  data() {
    return {
      toSend: "3DA0RS de k6rb tnx fer qso es hpe cu agn 73 SK 3DA0RS de k6rb ee",
      morser: new Morser(new InputH2C())
    }
  },
  watch: {
    speed: function(newVal) {
      this.morser.setSpeed(1200 / newVal)
    },
    volume: function(newVal) {
      this.morser.audio.setVolume(newVal)
    }
  },
  mounted: function() {
    Vue.util.defineReactive(this.morser, 'code', [])
    Vue.util.defineReactive(this.morser, 'translation', [])
    Vue.util.defineReactive(this.morser, 'detectedTokens', [])

    this.morser.setSpeed(1200 / this.speed)
    this.morser.audio.setVolume(this.volume)
    document.removeEventListener('keydown', this.keyDown)
    document.removeEventListener('keyup', this.keyUp)
    this.morser.go()
  },
  beforeDestroy: function() {
    this.morser.stop()
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
  },
  methods: {
    send() {
      this.morser.input.talk(this.toSend)
      this.morser.go()
    },
    playPause() {
      if (!this.morser.isPlaying)
        this.morser.go()
      else
        this.morser.stop()
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
