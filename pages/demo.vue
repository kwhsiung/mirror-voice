<template>
  <div>
    <BasePlayerVolume
      style="margin-top: 500px; background-color: black"
      :volume-current.sync="vol"
    />
  </div>
</template>

<script>
import BasePlayerVolume from '~/components/PlayerRefactor/BasePlayerVolume.vue'

export default {
  components: {
    BasePlayerVolume
  },
  data() {
    return {
      vol: 0.5
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
