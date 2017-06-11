<template lang="pug">
  #app
    app-header
    .app-body
      sidebar
      main.main
        breadcrumb(:list="list")
        .container-fluid
          router-view
</template>

<script>
import AppHeader from '@/components/fragments/AppHeader'
import Sidebar from '@/components/fragments/Sidebar'
import Breadcrumb from '@/components/fragments/Breadcrumb'
export default {
  name: 'app',
  components: {
    AppHeader,
    Sidebar,
    Breadcrumb
  },
  computed: {
    list () {
      return this.$route.matched
    }
  }
}
</script>
