<template>
  <div>
    <button class="button-toggler" v-text="playbackRateCurrentIndicator" />
    <ol v-show="showPicker" class="picker">
      <li
        v-for="rate in ratesAvailable"
        :key="rate"
        :class="[
          'picker__list-item',
          { 'active': rate === playbackRateCurrent }
        ]"
        @click="pickRate(rate)"
        v-text="formatRateDisplay(rate)"
      />
    </ol>
  </div>
</template>

<script>
import _ from 'lodash'
import { ratesAvailable } from './comm/rate'

export default {
  props: {
    playbackRateCurrent: {
      type: Number,
      default: 1.0,
      validator(value) {
        return ratesAvailable.includes(value)
      }
    }
  },
  data() {
    return {
      ratesAvailable,
      showPicker: false
    }
  },
  computed: {
    playbackRateCurrentIndicator() {
      const playbackRateFloat = this.formatRateDisplay(this.playbackRateCurrent)
      return `X ${playbackRateFloat}`
    }
  },
  methods: {
    togglePicker() {
      this.showPicker = !this.showPicker
    },
    hidePicker() {
      this.showPicker = false
    },
    formatRateDisplay(rate) {
      const rateString = rate.toString()
      return _.padEnd(rateString, 3, '.0')
    },
    pickRate(rate) {
      this.$emit('update:playbackRateCurrent', rate)
    }
  }
}
</script>

<style lang="stylus" scoped></style>
