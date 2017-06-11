<template lang="pug">
  card(title="Overview")
    i.fa.fa-align-justify(slot="icon")
    span.float-right(slot="header")
      nav-hotkey(to="IngredientCreate", action="add")
    div(slot="content")
      .row
        b-form-fieldset.col-6(:horizontal="true", label="Rows per page:", :label-size="4")
          b-form-select(:options="[{text:10,value:10},{text:20,value:20},{text:30,value:30},{text:100,value:100}]", v-model="perPage")
        b-form-fieldset.col-6(:horizontal="true", label="Filter:", :style="{ 'float': 'right' }", :label-size="2")
          b-form-input(v-model="filter", placeholder="ingredient")
      b-table(:striped="true", :hover="true", :bordered="true", :items="items", :fields="fields", :current-page="currentPage", :per-page="perPage", :filter="filter")
        template(slot="name", scope="item")
          | {{item.item.name}}
        template(slot="actions", scope="item")
          router-link(:to="{name: 'IngredientEdit', params: {id: item.item.id}}")
            i.fa.fa-edit.fa-lg(title="edit")
          router-link(:to="{name: 'IngredientDelete', params: {id: item.item.id}}")
            i.fa.fa-trash.fa-lg.text-danger(title="delete")
      .justify-content-center.row.my-1
        b-pagination(size="md", :total-rows="this.items.length", :per-page="perPage", v-model="currentPage")
</template>

<script>
import Card from '@/components/fragments/Card'
import Api from '@/api'
import NavHotkey from '@/components/elements/NavHotkey'

export default {
  name: 'ingredient-overview',
  components: {Card, NavHotkey},
  data () {
    return {
      items: [],
      currentPage: 1,
      perPage: 30,
      filter: '',
      fields: {
        name: {
          label: 'Ingredient',
          sortable: true
        },
        actions: {
          label: 'Actions'
        }
      }
    }
  },
  created () {
    Api.ingredient.fetchAll().then(response => {
      this.items = response.data.data
    })
  }
}
</script>
