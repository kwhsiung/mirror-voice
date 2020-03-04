<template>
  <nuxt-link
    :to="to"
  >
    <img
      :src="imgSrc"
      alt=""
    >
  </nuxt-link>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      default: '/'
    },
    imgSrc: {
      type: String,
      default: ''
    }
  }
}
</script>

<style land="stylus" scoped>
</style>
