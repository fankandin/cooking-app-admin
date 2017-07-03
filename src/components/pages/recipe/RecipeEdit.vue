<template lang="pug">
  card(:title="getTitle()", id="block1")
    form(slot="content", v-on:submit.prevent="onSubmit", v-on:reset.prevent="onCancel")
      .form-group.row.required
        label.col-3.col-form-label(for="title") Title
        .col-4
          input#title.form-control(type="text", v-model="current.title", required, maxlength="160")
      .form-group.row
        label.col-3.col-form-label(for="cookTime") Cooking time
        .col-4
          input#cookTime.form-control.field-time(type="text", v-model="current.cookTime", placeholder="HH:mm", v-on:blur="normalizeTime('cookTime')", :pattern="getInputPatternTime()")
          i.icon-clock.form-element-icon
      .form-group.row
        label.col-3.col-form-label(for="precookTime") Preparation time
        .col-4
          input#precookTime.form-control.field-time(type="text", v-model="current.precookTime", placeholder="HH:mm", v-on:blur="normalizeTime('precookTime')", :pattern="getInputPatternTime()")
          i.icon-clock.form-element-icon
      .form-group.row.btm-bordered
        label.col-3.col-form-label(for="annotation") Annotation
        .col-9
          input#annotation.form-control(type="text", v-model="current.annotation")
      .form-group.row
        label.col-3.col-form-label(for="method") Method
        .col-9
          textarea#method.form-control(v-model="current.method", style="height: 300px")
      .form-group.row.required.btm-bordered
        label.col-3.col-form-label(for="languageId") Language
        .col-2
          select#languageId.form-control.custom-select(v-model="current.languageId", required)
            option(v-for="language in languages", :value="language.id") {{ language.text }}
      .form-group
        button.btn.btn-primary(type="submit") {{ mode==='create' ? 'Create' : 'Save' }}
        button.btn.btn-danger(v-on:click="onCancel") Cancel
</template>

<script>
import Card from '@/components/fragments/Card'
import Api from '@/api'

const entityDefault = {
  languageId: null,
  cookTime: '',
  precookTime: '',
  name: '',
  nameExtra: '',
  note: ''
}

export default {
  name: 'recipe-create',
  components: {
    Card
  },
  props: ['mode'],
  data () {
    return {
      current: Object.assign({}, entityDefault),
      languages: [],
      oldName: '',
      timeRegex: /^([0-9]{1,2})([:]?([0-5][0-9])([:]?([0-5][0-9]))?)?$/
    }
  },
  methods: {
    onSubmit () {
      const payload = Object.assign({}, this.current)

      delete payload.id
      if (this.current.cookTime === '') {
        delete payload.cookTime
      }
      if (this.current.precookTime === '') {
        delete payload.precookTime
      }

      let next = () => { this.$router.push({ name: 'RecipeOverview' }) }
      if (this.mode === 'create') {
        Api.recipe.create(payload).then(next)
      } else {
        Api.recipe.update(this.$route.params.id, payload).then(next)
      }
    },
    onCancel (e) {
      e.preventDefault()
      this.$router.push({ name: 'RecipeOverview' })
    },
    getTitle () {
      return this.mode === 'create' ? 'Create new recipe' : 'Edit recipe "' + this.oldName + '"'
    },
    getInputPatternTime () {
      var regex = this.timeRegex.toString()
      return regex.substring(2, regex.length - 2)
    },
    normalizeTime (timeFieldName) {
      if (!this.current[timeFieldName]) {
        return
      }
      var matches = this.current[timeFieldName].match(this.timeRegex)
      var result = ''
      if (matches) {
        result = matches[1] + ':'
        if (typeof matches[2] !== 'undefined') {
          result += matches[3] + (typeof matches[4] !== 'undefined' ? ':' + matches[5] : ':00')
        } else {
          result += '00:00'
        }
        this.current[timeFieldName] = result
      } else {
        this.current[timeFieldName] = ''
      }
    }
  },
  created () {
    if (this.mode === 'edit') {
      Api.recipe.fetch(this.$route.params.id).then(response => {
        this.current = Object.assign({}, response.data.data)
        this.oldName = this.current.title
      })
    }
    Api.language.fetchAll().then(response => {
      for (let i = 0; i < response.data.data.length; i++) {
        this.languages.push({id: response.data.data[i].id, text: response.data.data[i].code})
      }
    })
  }
}
</script>
