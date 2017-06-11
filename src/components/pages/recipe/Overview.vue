<template lang="pug">
  card(title="Overview")
    i.fa.fa-align-justify(slot="icon")
    span.float-right(slot="header")
      nav-hotkey(to="RecipeCreate", action="add", title="Add recipe")
    div(slot="content")
      .row
        b-form-fieldset.col-6(:horizontal="true", label="Rows per page:", :label-size="4")
          b-form-select(:options="[{text:10,value:10},{text:20,value:20},{text:30,value:30},{text:100,value:100}]", v-model="perPage")
        b-form-fieldset.col-6(:horizontal="true", label="Filter:", :style="{ 'float': 'right' }", :label-size="2")
          b-form-input(v-model="filter", placeholder="recipe")

      b-table(:striped="true", :hover="true", :bordered="true", :items="items", :fields="fields", :current-page="currentPage", :per-page="perPage", :filter="filter")
        template(slot="title", scope="item")
          | {{item.item.title}}
        template(slot="cookTime", scope="item")
          | {{ formatTime(item.item.cookTime) }}
        template(slot="precookTime", scope="item")
          | {{ formatTime(item.item.precookTime) }}
        template(slot="annotation", scope="item")
          | {{ formatPreview(item.item.annotation) }}
        template(slot="actions", scope="item")
          router-link(:to="{name: 'RecipeEdit', params: {id: item.item.id}}")
            i.fa.fa-edit.fa-lg(title="edit")
          router-link(:to="{name: 'RecipeDelete', params: {id: item.item.id}}")
            i.fa.fa-trash.fa-lg.text-danger(title="delete")

      .justify-content-center.row.my-1
        b-pagination(size="md", :total-rows="this.items.length", :per-page="perPage", v-model="currentPage")
</template>

<script>
  import Card from '@/components/fragments/Card'
  import Api from '@/api'
  import NavHotkey from '@/components/elements/NavHotkey'

  export default {
    name: 'recipe-overview',
    components: { Card, NavHotkey },
    methods: {
      formatTime (timeStr) {
        return timeStr ? (timeStr.substring(0, 2) + 'h ' + timeStr.substring(3, 5) + 'm') : ''
      }
    },
    data () {
      return {
        items: [],
        currentPage: 1,
        perPage: 30,
        filter: '',
        fields: {
          title: {
            label: 'Recipe',
            sortable: true
          },
          cookTime: {
            label: 'Cooking time',
            sortable: true
          },
          precookTime: {
            label: 'Preparation time',
            sortable: true
          },
          annotation: {
            label: 'Annotation',
            sortable: false
          },
          actions: {
            label: 'Actions'
          }
        }
      }
    },
    created () {
      Api.recipe.fetchAll().then(response => {
        this.items = response.data.data
      })
    }
  }
</script>
