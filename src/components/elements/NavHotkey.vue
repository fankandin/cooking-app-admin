<template lang="pug">
  span.abutton(v-on:click="go()", v-shortkey="JSON.stringify(hotkey)", @shortkey="go()", :title="hint()")
    i.fa.fa-plus-circle
    | Add
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true
    },
    action: {
      type: String,
      required: true
    },
    hotkey: {
      type: Array,
      required: false,
      default: function () {
        return ['ctrl', '`']
      }
    },
    title: {
      type: String,
      required: false,
      default: 'Add'
    }
  },
  methods: {
    go () {
      this.$router.push({name: this.to})
    },
    icon () {
      'sdasd'.toUpperCase()
      if (this.action === 'add') {
        return 'fa-plus-circle'
      }
    },
    hint () {
      return 'Hotkey: ' + this.hotkey[0].toUpperCase() + '+' + this.hotkey[1].toUpperCase()
    }
  }
}
</script>
