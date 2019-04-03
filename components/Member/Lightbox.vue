<template>
  <div class="lightbox">
    <header
      class="lightbox__header header"
    >
      <img
        v-lazy="require('~/assets/img/mirrorvoice_logo_login.png')"
        class="header__logo"
        alt=""
      >
      <p class="header__title">
        註冊鏡語音帳號
      </p>
    </header>
  </div>
</template>

<style lang="stylus" scoped>
.header
  height 124px
  background-color #d84939
  display flex
  flex-direction column
  justify-content space-between
  align-items center
  padding 33px 0 21px 0
  &__logo
    width 270px
    height 34px
  &__title
    font-size 18px
    color white
    margin 0
</style>
