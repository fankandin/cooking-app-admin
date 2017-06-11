import axios from 'axios'

const api = {
  _retrieve: (uri) => axios.get(uri),
  ingredient: {
    fetchAll: () => axios.get('/api/ingredients'),
    fetch: (id) => axios.get('/api/ingredients/' + id),
    create: (payload) => axios.post('/api/ingredients', payload),
    update: (id, payload) => axios.patch('/api/ingredients/' + id, payload),
    delete: (id) => axios.delete('/api/ingredients/' + id)
  },
  ingredientTranslation: {
    fetchAll: (ingredientId) => axios.get('/api/ingredients/' + ingredientId + '/translations'),
    fetch: (id) => axios.get('/api/ingredients/translations/' + id),
    create: (payload) => axios.post('/api/ingredients/translations', payload),
    update: (id, payload) => axios.patch('/api/ingredients/translations/' + id, payload),
    delete: (id) => axios.delete('/api/ingredients/translations/' + id)
  },
  recipe: {
    fetchAll: () => axios.get('/api/recipes'),
    fetch: (id) => axios.get('/api/recipes/' + id),
    create: (payload) => axios.post('/api/recipes', payload),
    update: (id, payload) => axios.patch('/api/recipes/' + id, payload),
    delete: (id) => axios.delete('/api/recipes/' + id)
  },
  recipeIngredient: {
    fetchByRecipe: (recipeId) => axios.get('/api/recipes/' + recipeId + '/ingredients'),
    fetch: (id) => axios.get('/api/recipes/ingredients/' + id),
    create: (payload) => axios.post('/api/recipes/ingredients', payload),
    update: (id, payload) => axios.patch('/api/recipes/ingredients/' + id, payload),
    delete: (id) => axios.delete('/api/recipes/ingredients/' + id)
  },
  language: {
    fetchAll: () => axios.get('/api/languages')
  },
  ingredientUnit: {
    fetchAll: () => axios.get('/static/api/ingredient-units.json')
  }
}

export default api
