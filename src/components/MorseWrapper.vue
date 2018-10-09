<template>
<b-container fluid id="app" class="h-100 bg-dark">
  <b-row class="h-75">
    <MorseInputBase key="morseInputBase" v-if="mode == 'free'" :speed="speed" :volume="volume" />
    <MorseInputH2C key="morseInputH2C" v-if="mode == 'h2c'" :speed="speed" :volume="volume" />
  </b-row>
  <b-row class="bg-light h-25 pt-3 pb-3">
    <b-col sm="1">
    </b-col>
    <b-col sm="2">
      <b-form-group id="exampleInputGroup1" label="Words per minute" label-for="wpm" :description="'WPM:'+speed+' | Länge eines Dits: ' + Math.round(1200/speed)+' ms'">
        <b-form-input min="1" :value="speed" max="40" id="wpm" type="range" v-model="speed" required> </b-form-input>
      </b-form-group>
    </b-col>
    <b-col sm="2">
      <b-form-group id="volumeInputGroup" label="Volume" label-for="volume">
        <b-form-input v-on:change="enableAudio" min="0" :value="volume" max="0.3" step="0.01" id="volume" type="range" v-model="volume" required> </b-form-input>
      </b-form-group>
    </b-col>
    <b-col>
      <b-form-group label="Mode">
        <b-form-radio-group id="mode" v-model="mode">
          <b-form-radio value="free">Free</b-form-radio>
          <b-form-radio value="h2c">h2c</b-form-radio>
        </b-form-radio-group>
      </b-form-group>
    </b-col>
    <b-col sm="2">
      <label>Usage</label>
      <br />
      <p>
        Dit-Key: <b-badge>.<br /></b-badge><br />
        Dah-Key: <b-badge>-<br /></b-badge>
      </p>
    </b-col>
  </b-row>
</b-container>
</template>

<script>
import MorseInputBase from './MorseInputBase.vue'
import MorseInputH2C from './MorseInputH2C.vue'
import audioDriver from '../morser/audioDriver.js'


export default {
  name: "MorseWrapper",
  data() {
    return {
      speed: 20,
      volume: 0.3,
      mode: 'free',
      audioEnabled: false
    }
  },
  mounted() {
    let self = this
    this.audioEnabled = audioDriver.state == "running"
    this.volume = this.audioEnabled ? this.volume : 0.0
    audioDriver.onstatechange = function() {
      self.audioEnabled = audioDriver.state == "running"
    }
  },
  components: {
    MorseInputBase,
    MorseInputH2C
  },
  methods: {
    enableAudio(event) {
      if (event <= 0 && audioDriver.state == "running")
        audioDriver.suspend()
      else if (audioDriver.state == "suspended")
        audioDriver.resume()
    }
  }
}
</script>
