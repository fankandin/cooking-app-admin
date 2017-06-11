<template lang="pug">
  card(:title="'Additional information and translations for ingredient \"' + this.currentIngredient.name +'\"'", id="block2")
    i.fa.fa-align-justify(slot="icon")
    span.float-right.abutton(slot="header", v-on:click="enableModeAdd()", v-shortkey="['ctrl', '`']", @shortkey="enableModeAdd()", title="Hotkey: CTRL + `")
      i.fa.fa-plus-circle
      | Add

    form(slot="content", v-on:submit.prevent="onSubmitAdd", v-on:reset.prevent="onCancelIngredientEdit" v-if="modeAdd")
      p(style="margin-bottom: 12px;") Add new translation:
      table.table.table-striped.table-hover.table-bordered(role="grid")
        thead
          tr(role="row")
            th(v-for="field in fields") {{ field.label }}
        tbody
          tr(role="row")
            td
              b-form-select.required(v-model="translationToAdd.languageId", :options="languages", required value-field="id")
            td
              input.form-control(type="text", v-model="translationToAdd.name", required)
            td
              input.form-control(type="text", v-model="translationToAdd.nameExtra")
            td
              input.form-control(type="text", v-model="translationToAdd.note")
            td
              button.btn.btn-primary(type="submit") Add
              button.btn.btn-danger(v-on:click="disableModeAdd") Cancel
      p(style="margin-bottom: 12px;") Current translations:

    form(slot="content", v-on:submit.prevent="submit(onSubmitEdit)")
      b-table(:striped="true", :hover="true", :bordered="true", :items="translations", :fields="fields")
        template(slot="languageId", scope="item")
          b-form-select(v-model="item.item.languageId", :options="languages", value-field="id", required, v-if="modeEdit && currentTranslationEditId==item.item.id")
          img(v-else, :src="getCountryFlag(languagesFlags[item.item.languageId])")
        template(slot="name", scope="item")
          input.form-control.required(type="text", v-model="item.item.name", required, v-if="modeEdit && currentTranslationEditId==item.item.id")
          span(v-else) {{ item.item.name }}
        template(slot="nameExtra", scope="item")
          input.form-control(type="text", v-model="item.item.nameExtra", v-if="modeEdit && currentTranslationEditId==item.item.id")
          span(v-else) {{ item.item.nameExtra }}
        template(slot="note", scope="item")
          input.form-control(type="text", v-model="item.item.note", v-if="modeEdit && currentTranslationEditId==item.item.id")
          span(v-else) {{ item.item.note }}
        template(slot="actions", scope="item")
          span(v-if="currentTranslationEditId==item.item.id")
            button.btn.btn-primary(type="submit" v-if="modeEdit") Save
            button.btn.btn-primary(v-on:click="submit(onSubmitDelete)" v-if="modeDelete") Delete
            button.btn.btn-danger(v-on:click="disableModeEdit" v-if="modeEdit") Cancel
            button.btn.btn-danger(v-on:click="disableModeDelete" v-if="modeDelete") Cancel
          span(v-else)
            i.fa.fa-edit.fa-lg(title="edit", v-on:click="enableModeEdit(item.item.id)")
            i.fa.fa-trash.fa-lg.text-danger(title="delete", v-on:click="enableModeDelete(item.item.id)")
</template>

<script>
  import Card from '@/components/fragments/Card'
  import Api from '@/api'
  import LanguageConfig from '@/configs/language'

  const entityDefault = {
    languageId: null,
    name: '',
    nameExtra: '',
    note: ''
  }

  export default {
    name: 'ingredient-translation-edit',
    components: {
      Card
    },
    data () {
      return {
        currentIngredient: Object.assign({}, entityDefault),
        translationToAdd: Object.assign({}, entityDefault),
        translations: [],
        oldName: '',
        fields: {
          languageId: {
            label: 'Language',
            sortable: false
          },
          name: {
            label: 'Name',
            sortable: true
          },
          nameExtra: {
            label: 'Name extra'
          },
          note: {
            label: 'Note'
          },
          actions: {
            label: 'Actions'
          }
        },
        languages: [],
        currentTranslationEditId: null,
        usedLanguages: [], // to be used for filtering selectable languages
        languagesFlags: {},
        modeAdd: false,
        modeEdit: false,
        modeDelete: false
      }
    },
    methods: {
      onSubmitEdit (translation) {
        let payload = Object.assign({}, translation)
        delete payload.id // id is set in the URI
        delete payload.ingredientId // it is not load to change ingredientId

        Api.ingredientTranslation.update(translation.id, payload).then(response => {
          Api._retrieve(response.headers.location).then(response => {
            Object.assign(translation, response.data.data)
            this.disableModeEdit()

            if (this.usedLanguages.indexOf(translation.languageId) === -1) {
              this.usedLanguages.push(translation.languageId)
            }
          })
        })
      },
      onSubmitDelete (translation) {
        Api.ingredientTranslation.delete(translation.id).then(this.reloadTranslations)
      },
      submit (action) {
        for (let i = 0; i < this.translations.length; i++) {
          if (this.currentTranslationEditId === this.translations[i].id) {
            action(this.translations[i])
            return
          }
        }
      },
      onSubmitAdd () {
        let payload = Object.assign({}, this.translationToAdd)
        payload.ingredientId = this.currentIngredient.id
        this.disableModeAdd()
        Api.ingredientTranslation.create(payload).then(this.reloadTranslations)
      },
      enableModeAdd () {
        this.modeAdd = true
      },
      enableModeEdit (translationId) {
        this.currentTranslationEditId = translationId
        this.modeEdit = true
        this.modeDelete = false
      },
      enableModeDelete (translationId) {
        this.currentTranslationEditId = translationId
        this.modeDelete = true
        this.modeEdit = false
      },
      disableModeEdit () {
        this.currentTranslationEditId = null
        this.modeEdit = false
      },
      disableModeDelete () {
        this.currentTranslationEditId = null
        this.modeDelete = false
      },
      disableModeAdd () {
        this.modeAdd = false
      },
      reloadTranslations () {
        Api.ingredientTranslation.fetchAll(this.$route.params.id).then(response => {
          this.translations = response.data.data
          for (let i = 0; i < this.translations.length; i++) {
            this.usedLanguages.push(this.translations.languageId)
          }
        })
      },
      getCountryFlag (countryCode) {
        return LanguageConfig.getFlag(countryCode)
      }
    },
    created () {
      Api.ingredient.fetch(this.$route.params.id).then(response => {
        this.currentIngredient = response.data.data
        this.oldName = this.currentIngredient.name
      })
      Api.language.fetchAll().then(response => {
        for (let i = 0; i < response.data.data.length; i++) {
          this.languages.push({id: response.data.data[i].id, text: response.data.data[i].code})
          this.languagesFlags[response.data.data[i].id] = response.data.data[i].code
        }
      })
      this.reloadTranslations()
    }
  }
</script>
