<template>
  <div>
    <Demo
      :to="'/test'"
      :text="'textxxxxxxxx'"
      :time-current="123"
      :time-total="12345"
    />
  </div>
</template>

<script>
import Demo from '~/components/PlayerRefactor/BasePlayerInfo.vue'

export default {
  components: {
    Demo
  }
}
</script>

<style lang="stylus" scoped>

</style>
