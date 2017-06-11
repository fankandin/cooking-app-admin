<template lang="pug">
  div
    recipe-edit(mode="edit")
    ingredient-edit(mode="edit", :currentRecipeId="parseInt($route.params.id)")
</template>

<script>
import RecipeEdit from './RecipeEdit'
import IngredientEdit from './IngredientEdit'

export default {
  name: 'recipe-edit-parent',
  components: {
    RecipeEdit,
    IngredientEdit
  }
}
</script>
