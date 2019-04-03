<template>
  <header class="header">
    <nuxt-link to="/">
      <img class="header__logo" src="~/assets/img/logo04.png" alt="">
    </nuxt-link>
    <button
      class="header__login login"
      @click="SET_SHOW_LIGHTBOX(true)"
    >
      登入
    </button>
  </header>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations({
      SET_SHOW_LIGHTBOX: 'lightboxMember/SET_SHOW_LIGHTBOX'
    })
  }
}
</script>

<style lang="stylus" scoped>
.header
  height 70px
  background-color #d84939
  padding 0 20px
  display flex
  align-items center
  justify-content space-between
  &__logo
    // width 100px
    height 35px

.login
  background-color transparent
  border none
  color white
  padding 0
  cursor pointer
  &:focus
    outline none

@media (max-width 768px)
  .header
    height 72px
    padding 0 0 0 14px
</style>
