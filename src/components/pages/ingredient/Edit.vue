<template lang="pug">
  div
    ingredient-edit(mode="edit")
    translation-edit
</template>

<script>
import IngredientEdit from './IngredientEdit'
import TranslationEdit from './TranslationEdit'

export default {
  name: 'ingredient-edit-parent',
  components: {
    IngredientEdit,
    TranslationEdit
  }
}
</script>
