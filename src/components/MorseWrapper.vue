<template>
<b-container fluid id="app" class="h-100 bg-dark">
  <b-row class="h-75">
    <MorseInputBase key="morseInputBase" v-if="mode == 'free'" :speed="speed" :volume="volume" :ditKey="ditKey" :dahKey="dahKey" />
    <MorseInputH2C key="morseInputH2C" v-if="mode == 'h2c'" :speed="speed" :volume="volume" />
  </b-row>
  <b-row class="bg-light h-25 pt-3 pb-3 justify-content-around">
    <b-col sm="2">
      <b-form-group id="exampleInputGroup1" label="Words per minute" label-for="wpm" :description="'WPM:'+speed+' | Length of a Dit: ' + Math.round(1200/speed)+' ms'">
        <b-form-input min="1" :value="speed" max="40" id="wpm" type="range" v-model="speed" required> </b-form-input>
      </b-form-group>
    </b-col>
    <b-col sm="2">
      <b-form-group id="volumeInputGroup" label="Volume" label-for="volume">
        <b-form-input v-on:change="enableAudio" min="0" :value="volume" max="0.3" step="0.01" id="volume" type="range" v-model="volume" required> </b-form-input>
      </b-form-group>
    </b-col>
    <b-col sm="2">
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
      <b-btn size="sm" v-b-modal.dit-key-changer>
        Dit-Key: <b-badge pill variant="light">&nbsp;{{ditKey}}&nbsp;</b-badge>
      </b-btn>
      <br />
      <br />
      <b-btn size="sm" v-b-modal.dah-key-changer>
        Dah-Key: <b-badge pill variant="light">&nbsp;{{dahKey}}&nbsp;</b-badge>
      </b-btn>




    </b-col>
    <b-col sm="2" align-self="end">
      <b-btn class="float-right" v-b-modal.about-modal>?</b-btn>
    </b-col>
  </b-row>

  <KeySelection id="dit-key-changer" titel="Change Dit-Key" v-model="ditKey" />
  <KeySelection id="dah-key-changer" titel="Change Dah-Key" v-model="dahKey" />

  <b-modal id="about-modal" centered title="ditdah">
    <h1>−·· ·· − −·· ·− ····</h1>
    <p class="my-4">ditdah is an online telegraph key emulator to generate morse code.
      <br />
      Features:
      <ul>
        <li>
          Morse code to letters
        </li>
        <li>
          Letters to morse code
        </li>
        <li>
          Fixed timing dual-lever paddle input emulation
        </li>
      </ul>
      WIP features:
      <ul>
        <li>
          Exercise mode
        </li>
        <li>
          Retro unfixed input emulation
        </li>
      </ul>
    </p>
    <p>
      The source code can be found on <a href="https://github.com/frederikgoebel/ditdah">github</a>.
    </p>

    <div slot="modal-footer">
      <p>
        created by frederik göbel
      </p>
    </div>
  </b-modal>
</b-container>
</template>

<script>
import MorseInputBase from './MorseInputBase.vue'
import MorseInputH2C from './MorseInputH2C.vue'
import audioDriver from '../morser/audioDriver.js'
import KeySelection from './KeySelection.vue'

export default {
  name: "MorseWrapper",
  data() {
    return {
      speed: 20,
      volume: 0.3,
      mode: 'free',
      audioEnabled: false,
      ditKey: ".",
      dahKey: "-"
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
    MorseInputH2C,
    KeySelection
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
