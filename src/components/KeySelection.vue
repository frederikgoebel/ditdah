<template>
<b-modal :id="id" hide-header-close ok-title="Save" centered :title="titel" @hide="onHide" @show="onShow" @ok="$emit('input', newKey)">
  Old:
  <pre>{{this.value}}</pre>
  New:
  <pre>{{newKey}}</pre>
</b-modal>
</template>

<script>
export default {
  name: "KeySelection",
  props: {
    value: {
      type: String
    },
    titel: {
      type: String,
      default: "Change key"
    },
    id: {
      type: String,
      default: "key-change-modal"
    },
  },
  data() {
    return {
      newKey: this.value
    }
  },
  methods: {
    onShow() {
      document.addEventListener('keydown', this.onKeyDown)
    },
    onHide() {
      document.removeEventListener('keydown', this.onKeyDown)
    },
    onKeyDown(event) {
      this.newKey = event.key
    }
  }
}
</script>
