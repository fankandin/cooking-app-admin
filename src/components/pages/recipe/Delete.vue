<template lang="pug">
  card(:title="'Delete the recipe \"' + current.name + '\"?'")
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
  name: 'recipe-delete',
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
      let back = () => { this.$router.push({ name: 'RecipeOverview' }) }
      Api.recipe.delete(this.$route.params.id).then(back)
    },
    onCancel (e) {
      e.preventDefault()
      this.$router.push({ name: 'RecipeOverview' })
    }
  },
  created () {
    if (this.$route.params.id) {
      Api.recipe.fetch(this.$route.params.id).then(response => {
        this.current = response.data.data
      })
    }
  }
}
</script>
