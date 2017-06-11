<template lang="pug">
  navbar
    button.navbar-toggler.mobile-sidebar-toggler.d-lg-none(type="button", @click="mobileSidebarToggle") &#9776;
    a.navbar-brand(href="#")
    ul.nav.navbar-nav.d-md-down-none
      li.nav-item
        a.nav-link.navbar-toggler.sidebar-toggler(href="#", @click="sidebarMinimize") &#9776;
</template>

<script>
import Navbar from '@/components/fragments/Navbar'
export default {
  name: 'app-header',
  components: { Navbar },
  methods: {
    sidebarMinimize (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-minimized')
    },
    mobileSidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-mobile-show')
    }
  }
}
</script>
