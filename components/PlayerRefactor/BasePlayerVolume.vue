<template>
  <div>
    <button
      class="button-toggler"
    >
      <img
        :class="[
          { 'mute': shouldMute }
        ]"
        src=""
        alt=""
      >
    </button>
    <div>
      <BasePlayerSlider
        :direction="'vertical'"
        :value-current.sync="volume"
      />
    </div>
  </div>
</template>

<script>
import BasePlayerSlider from './BasePlayerSlider.vue'

export default {
  components: {
    BasePlayerSlider
  },
  props: {
    volumeCurrent: {
      type: Number,
      default: 1,
      validator(value) {
        return value >= 0 && value <= 1
      }
    }
  },
  computed: {
    volume: {
      get() {
        return this.volumeCurrent
      },
      set(value) {
        this.$emit('update:volumeCurrent', value)
      }
    },
    shouldMute() {
      return this.volume <= 0
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
