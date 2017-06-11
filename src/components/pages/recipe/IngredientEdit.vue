<template lang="pug">
  card(:title="getTitle()", id="block1")
    i.fa.fa-align-justify(slot="icon")
    span.float-right.abutton(slot="header", v-on:click="enableModeAdd()" v-shortkey="['ctrl', '`']", @shortkey="enableModeAdd()", title="Hotkey: CTRL + `")
      i.fa.fa-plus-circle
      | Add

    form(slot="content", v-on:submit.prevent="onSubmitAdd", v-on:reset.prevent="onCancelIngredientEdit" v-if="modeAdd")
      p(style="margin-bottom: 12px;") Add new ingredient:
      table.table.table-striped.table-hover.table-bordered(role="grid")
        thead
          tr
            th {{ fields.ingredient.label }}
            th(colspan=2) {{ fields.amount.label }}
            th {{ fields.amountNetto.label }}
            th {{ fields.preparation.label }}
            th {{ fields.actions.label }}
        tbody
          tr(role="row")
            td
              autocomplete(:suggestions="ingredientsAvailable", :selectedId.sync="ingredientToAdd.ingredientId")
            td(colspan=2)
              input.form-control(type="text", v-model="ingredientToAdd.amount", maxlength=7, pattern="[0-9.]+", style="width: 5em; float:left;")
              select.form-control(v-model="ingredientToAdd.measurement", style="width: 150px")
                option(v-for="unit in units", v-bind:value="unit.unit") {{ unit.unit }}
            td
              input.form-control(type="checkbox", v-model="ingredientToAdd.amountNetto")
            td
              input.form-control(type="text", v-model="ingredientToAdd.preparation", maxlength="255")
            td
              button.btn.btn-primary(type="submit") Add
              button.btn.btn-danger(v-on:click="disableModeAdd") Cancel

    form(slot="content", v-on:submit.prevent="submit(onSubmitEdit)")
      table.table.table-striped.table-hover.table-bordered()
        thead
          tr
            th {{ fields.ingredient.label }}
            th(colspan=2) {{ fields.amount.label }}
            th {{ fields.amountNetto.label }}
            th {{ fields.preparation.label }}
            th {{ fields.actions.label }}
        tbody
          tr(v-for="item in recipeIngredients")
            td
              autocomplete(v-if="isModeEdit(item.id)", :suggestions="ingredientsAvailable", :selectedId.sync="item.ingredient.id")
              span(v-else) {{ item.ingredient.name }}
            td(colspan=2)
              div(v-if="isModeEdit(item.id)" style="white-space:nowrap")
                input.form-control(type="text", v-model="item.amount", maxlength=7, pattern="[0-9.]+", style="width: 5em; float:left;")
                select.form-control(type="text", style="width: 150px")
                  option(v-for="unit in units",v-bind:value="unit.unit") {{ unit.unit }}
              span(v-else) {{ item.amount }}
                span {{ ' ' + item.measurement }}
            td
              input(type="checkbox", :disabled="!isModeEdit(item.id)", v-model="item.amountNetto")
            td
              input.form-control(type="text", v-if="isModeEdit(item.id)", v-model="item.preparation", maxlength=255)
              span(v-else) {{ item.preparation }}
            td(width="200", colspan="nowrap")
              span(v-if="currentRecipeIngredientEditId==item.id")
                button.btn.btn-primary(type="submit" v-if="modeEdit") Save
                button.btn.btn-primary(v-on:click="submit(onSubmitDelete)" v-if="modeDelete") Delete
                button.btn.btn-danger(v-on:click="disableModeEdit" v-if="modeEdit") Cancel
                button.btn.btn-danger(v-on:click="disableModeDelete" v-if="modeDelete") Cancel
              span(v-else)
                i.fa.fa-edit.fa-lg(title="edit", v-on:click="enableModeEdit(item.id)")
                i.fa.fa-trash.fa-lg.text-danger(title="delete", v-on:click="enableModeDelete(item.id)")
</template>

<script>
import Card from '@/components/fragments/Card'
import Api from '@/api'
import Autocomplete from '@/components/elements/Autocomplete'

const entityDefault = {
  ingredientId: null,
  amount: 0,
  amountNetto: false,
  measurement: 'gram',
  preparation: ''
}

export default {
  name: 'recipe-ingredient-edit',
  components: { Card, Autocomplete },
  props: {
    mode: {
      type: String,
      required: true
    },
    currentRecipeId: {
      type: Number,
      required: true
    }

  },
  data () {
    return {
      isIngredientSuggestionOpen: false,
      currentIngredientSuggestion: 0,

      units: {},
      recipeIngredients: [],
      ingredientsAvailable: [],
      ingredientToAdd: entityDefault,
      fields: {
        ingredient: {
          label: 'Ingredient',
          sortable: true
        },
        amount: {
          label: 'Amount',
          sortable: true
        },
        measurement: {
          label: 'Unit of measurement'
        },
        amountNetto: {
          label: 'Amount netto'
        },
        preparation: {
          label: 'Preparation'
        },
        actions: {
          label: 'Actions'
        }
      },
      currentRecipeIngredientEditId: null,
      modeAdd: false,
      modeEdit: false,
      modeDelete: false
    }
  },
  methods: {
    getTitle () {
      return 'Ingredients in the recipe'
    },

    onSubmitEdit (recipeIngredient) {
      let payload = Object.assign({}, recipeIngredient)
      delete payload.id // id is set in the URI
      payload.ingredientId = payload.ingredient.id
      delete payload.ingredient // id is set in the URI

      Api.recipeIngredient.update(recipeIngredient.id, payload).then(response => {
        Api._retrieve(response.headers.location).then(response => {
          Object.assign(recipeIngredient, response.data.data)
          this.disableModeEdit()
        })
      })
    },
    onSubmitDelete (recipeIngredient) {
      Api.recipeIngredient.delete(recipeIngredient.id).then(this.reloadRecipeIngredients)
    },
    submit (action) {
      for (let i = 0; i < this.recipeIngredients.length; i++) {
        if (this.currentRecipeIngredientEditId === this.recipeIngredients[i].id) {
          action(this.recipeIngredients[i])
          return
        }
      }
    },
    onSubmitAdd () {
      let payload = Object.assign({}, this.ingredientToAdd)
      payload.recipeId = this.currentRecipeId
      this.disableModeAdd()
      Api.recipeIngredient.create(payload).then(this.reloadRecipeIngredients)
    },

    enableModeAdd () {
      this.modeAdd = true
    },
    enableModeEdit (recipeIngredientId) {
      this.currentRecipeIngredientEditId = recipeIngredientId
      this.modeEdit = true
      this.modeDelete = false
    },
    enableModeDelete (recipeIngredientId) {
      this.currentRecipeIngredientEditId = recipeIngredientId
      this.modeDelete = true
      this.modeEdit = false
    },
    disableModeEdit () {
      this.currentRecipeIngredientEditId = null
      this.modeEdit = false
    },
    disableModeDelete () {
      this.currentRecipeIngredientEditId = null
      this.modeDelete = false
    },
    disableModeAdd () {
      this.modeAdd = false
    },
    reloadRecipeIngredients () {
      this.ingredientToAdd = Object.assign({}, entityDefault)
      Api.recipeIngredient.fetchByRecipe(this.$route.params.id).then(response => {
        this.recipeIngredients = response.data.data
      })
    },
    isModeEdit (itemId) {
      return this.modeEdit && this.currentRecipeIngredientEditId === itemId
    }
  },
  created () {
    Api.ingredientUnit.fetchAll().then(response => {
      for (let i = 0; i < response.data.data.length; i++) {
        this.units[response.data.data[i].unit] = Object.assign([], response.data.data[i])
      }
    })
    this.reloadRecipeIngredients()
    Api.ingredient.fetchAll().then(response => {
      for (let i = 0; i < response.data.data.length; i++) {
        this.ingredientsAvailable.push({id: response.data.data[i].id, 'name': response.data.data[i].name})
      }
    })
  }
}
</script>
