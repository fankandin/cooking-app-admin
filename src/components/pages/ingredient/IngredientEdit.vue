<template lang="pug">
  card(:title="getTitle()", id="block1")
    form(slot="content", v-on:submit.prevent="onSubmit", v-on:reset.prevent="onCancel")
      .form-group.row.required
        label.col-1.col-form-label(for="name") Name
        .col-2
          input#name.form-control(type="text", v-model="current.name", required, maxlength="160", ref="focused")
      .form-group
        button.btn.btn-primary(type="submit") Save
        button.btn.btn-danger(v-on:click="onCancel") Cancel
</template>

<script>
import Card from '@/components/fragments/Card'
import Api from '@/api'

export default {
  name: 'ingredient-edit',
  components: {
    Card
  },
  props: ['mode'],
  data () {
    return {
      current: {
        name: ''
      },
      oldName: ''
    }
  },
  methods: {
    onSubmit () {
      let next = () => { this.$router.push({ name: 'IngredientOverview' }) }
      const payload = Object.assign({}, this.current)
      if (this.mode === 'create') {
        Api.ingredient.create(payload).then(next)
      } else {
        Api.ingredient.update(this.$route.params.id, payload).then(next)
      }
    },
    onCancel (e) {
      e.preventDefault()
      this.$router.push({ name: 'IngredientOverview' })
    },
    getTitle () {
      return this.mode === 'create' ? 'Create new ingredient' : 'Edit ingredient "' + this.oldName + '"'
    }
  },
  created () {
    if (this.mode === 'edit') {
      Api.ingredient.fetch(this.$route.params.id).then(response => {
        this.current = response.data.data
        this.oldName = this.current.name
      })
    }
  },
  mounted () {
    this.$refs.focused.focus()
  }
}
</script>
