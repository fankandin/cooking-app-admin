<template lang="pug">
  div(style="position:relative", v-bind:class="{'open':openSuggestion}")
    input.form-control(type="text" v-model="selectedName", @keydown.enter = "enter", @keydown.down = "down", @keydown.up = "up", @input = "change")
    ul.dropdown-menu(style="width:100%")
      li(v-for="(suggestion, index) in matches", :class="'dropdown-item' + (isActive(index) ? ' active' : '')", @click="suggestionClick(index)")
        span {{ suggestion.name }}
</template>

<script>
export default {
  props: {
    suggestions: {
      type: Array,
      required: true
    },
    selectedId: {
      required: true,
      twoWay: true
    }
  },
  data () {
    return {
      open: false,
      current: 0,
      selectedName: '',
      suggestionsMap: {}
    }
  },
  methods: {
    enter () {
      this.setSelected(this.current)
      this.open = false
    },
    up () {
      if (this.current > 0) {
        this.current--
      }
    },
    down () {
      if (this.current < this.matches.length - 1) {
        this.current++
      }
    },
    isActive (index) {
      return index === this.current
    },
    change () {
      if (this.open === false) {
        this.open = true
        this.current = 0
      }
    },
    suggestionClick (index) {
      this.setSelected(index)
      this.open = false
    },
    setSelected (index) {
      let match = this.matches[index]
      this.$emit('update:selectedId', match.id)
      this.selectedName = match.name
      this.current = this.suggestionsMap[this.selectedId]
    }
  },
  computed: {
    matches () {
      return this.suggestions.filter((data) => {
        return data.name.toLowerCase().indexOf(this.selectedName.toLowerCase()) >= 0
      })
    },
    openSuggestion () {
      return this.selectedName !== '' &&
        this.matches.length !== 0 &&
        this.open === true
    }
  },
  created () {
    for (let i = 0; i < this.suggestions.length; i++) {
      this.suggestionsMap[this.suggestions[i].id] = i
    }
    if (this.selectedId !== null) {
      this.current = this.suggestionsMap[this.selectedId]
      this.setSelected(this.current)
    }
  }
}
</script>
