<template lang="pug">
  ol.breadcrumb
    li.breadcrumb-item(v-for="(item, index) in list")
      span.active(v-if="isLast(index)") {{ showName(item) }}
      router-link(v-else="", :to="item.path || '/'") {{ showName(item) }}
</template>

<script>
export default {
  name: 'breadcrumb',
  props: {
    list: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  methods: {
    isLast (index) {
      return index === this.list.length - 1
    },
    showName (item) {
      return item.meta && item.meta.label || item.name
    }
  }
}
</script>
