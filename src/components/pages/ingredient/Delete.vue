<template lang="pug">
  card(:title="'Delete the ingredient \"' + current.name + '\"?'")
    form(slot="content", v-on:submit.prevent="onSubmit", v-on:reset.prevent="onCancel")
      .form-group.info
        b.col-1 Name:
        span.col-2 {{ current.name }}
      .form-group
        button.btn.btn-primary(type="submit") Yes
        button.btn.btn-danger(v-on:click="onCancel") No
</template>

<script>
import Card from '@/components/fragments/Card'
import Api from '@/api'

export default {
  name: 'ingredient-delete',
  components: {
    Card
  },
  data () {
    return {
      current: {
        name: ''
      }
    }
  },
  methods: {
    onSubmit () {
      let back = () => { this.$router.push({ name: 'IngredientOverview' }) }
      Api.ingredient.delete(this.$route.params.id).then(back)
    },
    onCancel (e) {
      e.preventDefault()
      this.$router.push({ name: 'IngredientOverview' })
    }
  },
  created () {
    if (this.$route.params.id) {
      Api.ingredient.fetch(this.$route.params.id).then(response => {
        this.current = response.data.data
      })
    }
  }
}
</script>
