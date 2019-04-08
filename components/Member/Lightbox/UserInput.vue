<template>
  <div class="input-wrapper">
    <div class="input-wrapper__icon">
      <slot name="icon" />
    </div>
    <input
      v-model="input"
      class="input-wrapper__input"
      :type="type"
      :placeholder="placeholder"
    >
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: '',
      required: true
    }
  },
  data() {
    return {
      input: ''
    }
  },
  watch: {
    input() {
      this.$emit('update:input', this.input)
    }
  }
}
</script>

<style lang="stylus" scoped>
.input-wrapper
  width 270px
  height 40px
  border-radius 4px
  background-color #e5e5e5
  display flex
  align-items center
  padding 0 0 0 26px
  &__icon
    width 22px
    margin 0 25px 0 0
    display flex
    align-items center 
    & >>> img
      width 100%
  &__input
    background-color transparent
    border none
    font-size 16px
    color #7d7d7d
    &:focus
      outline none
    &::placeholder
      font-size 16px
      color #7d7d7d
</style>
