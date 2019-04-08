<template>
  <div
    class="lightbox-wrapper"
    @click="$emit('close')"
  >
    <div
      class="lightbox-wrapper__content content"
      @click.stop
    >
      <img
        class="content__close"
        :src="closeIconPath"
        alt=""
        @click="$emit('close')"
      >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    closeIconTheme: {
      type: String,
      default: 'dark',
      validator(value) {
        return ['dark', 'light'].includes(value)
      }
    }
  },
  computed: {
    closeIconPath() {
      const fileName = this.closeIconTheme === 'dark' ? 'close_gray' : 'close'
      return require(`~/assets/img/${fileName}.png`)
    }
  }
}
</script>

<style lang="stylus" scoped>
.lightbox-wrapper
  width 100vw
  height 100vh
  background-color rgba(0, 0, 0, 0.5)
  position fixed
  top 0
  left 0
  z-index 1000
  display flex
  justify-content center
  align-items center
  &__content
    border-radius 4px
    overflow hidden // perform border-radius cliping
    box-shadow 1.4px 1.4px 3.8px 0.2px rgba(0, 0, 0, 0.2)
    background-color #ffffff

.content
  position relative
  min-width 450px
  min-height 100px
  // padding 14px
  &__close
    position absolute
    top 14px
    right 14px
    width 20px
    height 20px
    cursor pointer

@media (max-width 768px)
  .content
    min-width 80vw
    padding 8px
    &__close
      top 8px
      right 8px
</style>
