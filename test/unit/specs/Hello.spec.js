import Vue from 'vue'
import router from '@/router'
import App from '@/App'

describe('App.vue', () => {
  it('should render correct contents', () => {
    /* eslint-disable no-new */
    new Vue({
      el: document.createElement('div'),
      router,
      template: '<App/>',
      components: { App }
    })

    // expect(vm.$el.querySelector('.hello h1').textContent)
    //   .to.equal('Welcome to Your Vue.js Ap')
  })
})
