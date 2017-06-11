<template lang="pug">
.card.card-accent-primary
  .card-header
    slot(name="icon")
    | {{ title }}
    slot(name="header")
  .card-block
    slot(name="content")
</template>

<script>
export default {
  name: 'card',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>
