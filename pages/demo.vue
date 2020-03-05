<template>
  <div>
    <Demo
      :is-playing="false"
      :show-tracks-nav="true"
    />
  </div>
</template>

<script>
import Demo from '~/components/PlayerRefactor/BasePlayerNavs.vue'

export default {
  components: {
    Demo
  }
}
</script>

<style lang="stylus" scoped>

</style>
