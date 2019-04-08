<template>
  <button class="login-button">
    <img
      class="login-button__icon"
      src="~/assets/img/logo_fb.png"
      alt=""
    >
    <p>以 facebook 帳號登入</p>
  </button>
</template>

<style lang="stylus" scoped>
.login-button
  width 270px
  height 40px
  border-radius 4px
  border none
  background-color #39579a
  font-size 16px
  display flex
  align-items center
  padding 0 0 0 26px
  color white
  cursor pointer
  &:focus
    outline none
  &__icon
    width 22px
    margin 0 25px 0 0
</style>
