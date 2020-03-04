<template>
  <nav>
    <button
      class="rewind-button"
      @click="handleClickRewind"
    />
    <button
      class="fastforward-button"
      @click="handleClickFastforward"
    />
    <div
      v-show="showTracksNav"
      class="tracks-nav"
    >
      <button
        class="backward-button"
        @click="handleClickBackward"
      />
      <button
        class="forward-button"
        @click="handleClickForward"
      />
    </div>
    <button
      :class="[
        'main-button',
        { 'play': isPlaying },
        { 'pause': !isPlaying }
      ]"
      @click="handleClickMain"
    />
  </nav>
</template>

<script>
export default {
  props: {
    isPlaying: {
      type: Boolean,
      default: false
    },
    showTracksNav: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClickRewind() {
      this.$emit('rewind')
    },
    handleClickFastforward() {
      this.$emit('fastforward')
    },
    handleClickBackward() {
      this.$emit('backward')
    },
    handleClickForward() {
      this.$emit('forward')
    },
    handleClickMain() {
      const event = this.isPlaying ? 'pause' : 'play'
      this.$emit(event)
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
