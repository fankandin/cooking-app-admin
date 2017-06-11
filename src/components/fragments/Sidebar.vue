<template lang="pug">
  .sidebar
      nav.sidebar-nav
        ul.nav
          li.nav-item
            router-link.nav-link(:to="{name: 'Home'}")
              i.icon-home
              | Home
          li.nav-item
            router-link.nav-link(:to="{name: 'RecipeOverview'}")
              i.icon-book-open
              | Recipes
          li.nav-item
            router-link.nav-link(:to="{name: 'IngredientOverview'}")
              i.icon-basket-loaded
              | Ingredients
</template>

<script>
export default {
  name: 'sidebar'
}
</script>
