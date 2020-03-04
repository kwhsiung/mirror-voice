<template>
  <div>
    <nuxt-link
      :to="to"
      v-text="text"
    />
    <span
      class="time-total"
      v-text="timeTotalFormatted"
    />
    <span
      class="time-current"
      v-text="timeCurrentFormatted"
    />
  </div>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      default: '/'
    },
    text: {
      type: String,
      default: ''
    },
    timeTotal: {
      type: Number,
      default: 0,
      validator(value) {
        return value >= 0
      }
    },
    timeCurrent: {
      type: Number,
      default: 0,
      validator(value) {
        return value >= 0
      }
    }
  },
  data() {
    return {
      timeFormat: 'HH:mm:ss'
    }
  },
  computed: {
    timeTotalFormatted() {
      return this.$secondsToHms(this.timeTotal)
    },
    timeCurrentFormatted() {
      return this.$secondsToHms(this.timeCurrent)
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
