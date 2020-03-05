<template>
  <div>
    <Demo
      :direction="'vertical'"
      :value-buffered="0.5"
      :value-current="0.3"
    />
  </div>
</template>

<script>
import Demo from '~/components/PlayerRefactor/BasePlayerSlider.vue'

export default {
  components: {
    Demo
  }
}
</script>

<style lang="stylus" scoped>

</style>
