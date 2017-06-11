import Vue from 'vue'
import Router from 'vue-router'
import Container from '@/components/fragments/Container'
import Home from '@/components/pages/Home'

import RecipeOverview from '@/components/pages/recipe/Overview'
import RecipeCreate from '@/components/pages/recipe/RecipeEdit'
import RecipeEdit from '@/components/pages/recipe/Edit'
import RecipeDelete from '@/components/pages/recipe/Delete'

import IngredientOverview from '@/components/pages/ingredient/Overview'
import IngredientCreate from '@/components/pages/ingredient/IngredientEdit'
import IngredientEdit from '@/components/pages/ingredient/Edit'
import IngredientDelete from '@/components/pages/ingredient/Delete'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Container,
      meta: {
        label: 'Home'
      },
      children: [
        {
          path: '',
          name: 'Home',
          component: Home
        },
        {
          path: 'recipes',
          name: '',
          meta: {
            label: 'Recipes'
          },
          component: Container,
          children: [
            {
              path: '',
              name: 'RecipeOverview',
              component: RecipeOverview,
              meta: {
                label: 'Overview'
              }
            },
            {
              path: 'create',
              name: 'RecipeCreate',
              component: RecipeCreate,
              meta: {
                label: 'Add Recipe'
              },
              props: {mode: 'create'}
            },
            {
              path: ':id/edit',
              name: 'RecipeEdit',
              component: RecipeEdit,
              meta: {
                label: 'Edit Recipe'
              }
            },
            {
              path: ':id/delete',
              name: 'RecipeDelete',
              component: RecipeDelete,
              meta: {
                label: 'Delete Recipe'
              }
            }
          ]
        },
        {
          path: 'ingredients',
          name: '',
          meta: {
            label: 'Ingredients'
          },
          component: Container,
          children: [
            {
              path: '',
              name: 'IngredientOverview',
              component: IngredientOverview,
              meta: {
                label: 'Overview'
              }
            },
            {
              path: 'create',
              name: 'IngredientCreate',
              component: IngredientCreate,
              meta: {
                label: 'Add ingredient'
              },
              props: {mode: 'create'}
            },
            {
              path: ':id/edit',
              name: 'IngredientEdit',
              component: IngredientEdit,
              meta: {
                label: 'Edit Ingredient'
              }
            },
            {
              path: ':id/delete',
              name: 'IngredientDelete',
              component: IngredientDelete,
              meta: {
                label: 'Delete Ingredient'
              }
            }
          ]
        }
      ]
    }
  ]
})
