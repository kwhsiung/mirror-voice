<template>
  <div class="lightbox">
    <header
      class="lightbox__header header"
    >
      <img
        src="~/assets/img/mirrorvoice_logo_login.png"
        class="header__logo"
        alt=""
      >
      <p class="header__title">
        {{ title[currentStatus] }}
      </p>
    </header>
    <Login
      v-show="currentStatus === 'login'"
      @register="toggleStatusRegister"
    />
    <Register
      v-show="currentStatus === 'register'"
      @login="toggleStatusLogin"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Login from './Login.vue'
import Register from './Register.vue'

export default {
  components: {
    Login,
    Register
  },
  data() {
    return {
      currentStatus: 'login',
      title: {
        login: '登入鏡語音',
        register: '註冊鏡語音帳號'
      }
    }
  },
  computed: {
    ...mapState({
      showLightbox: state => state.lightboxMember.showLightbox
    })
  },
  watch: {
    showLightbox() {
      if (!this.showLightbox) {
        setTimeout(() => {
          this.toggleStatusLogin()
        }, 250)
      }
    }
  },
  methods: {
    toggleStatusLogin() {
      this.currentStatus = 'login'
    },
    toggleStatusRegister() {
      this.currentStatus = 'register'
    }
  }
}
</script>

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
