<template>
  <div class="register">
    <div class="register__form">
      <UserInput
        class="form__input"
        :type="'text'"
        :placeholder="'暱稱'"
        :input.sync="nickname"
      >
        <img
          slot="icon"
          src="~/assets/img/icon_account.png"
          alt=""
        >
      </UserInput>
      <UserInput
        class="form__input"
        :type="'email'"
        :placeholder="'信箱'"
        :input.sync="email"
      >
        <img
          slot="icon"
          src="~/assets/img/icon_email.png"
          alt=""
        >
      </UserInput>
      <UserInput
        class="form__input"
        :type="'password'"
        :placeholder="'密碼'"
        :input.sync="password"
      >
        <img
          slot="icon"
          src="~/assets/img/icon_password.png"
          alt=""
        >
      </UserInput>
      <UserInput
        class="form__input"
        :type="'password'"
        :placeholder="'密碼確認'"
        :input.sync="passwordConfirm"
      >
        <img
          slot="icon"
          src="~/assets/img/icon_password.png"
          alt=""
        >
      </UserInput>
    </div>
    <div class="register__recaptcha-wrapper recaptcha-wrapper">
      <VueRecaptcha
        class="recaptcha-wrapper__recaptcha"
        :sitekey="recaptcha.siteKey"
        @verify="onRecaptchaVerify"
      />
    </div>
    <div class="register__reminder reminder">
      <p>
        按下註冊鈕的同時，表示您已詳閱我們的
        <nuxt-link
          to="/privacy_rule"
          @click.native="SET_SHOW_LIGHTBOX(false)"
        >
          資料使用政策與使用條款
        </nuxt-link>
        ，同意使用 mm 所提供的服務並訂閱電子報。
      </p>
    </div>
    <button
      class="register__register-button"
      @click="register"
    >
      註冊
    </button>
    <div class="register__login-wrapper login-wrapper">
      <p class="login-wrapper__title">
        已經是會員了？
      </p>
      <button
        class="login-wrapper__login"
        @click="$emit('login')"
      >
        馬上登入
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

import VueRecaptcha from 'vue-recaptcha'
import UserInput from './UserInput.vue'

export default {
  components: {
    UserInput,
    VueRecaptcha
  },
  data() {
    return {
      nickname: '',
      email: '',
      password: '',
      passwordConfirm: '',
      recaptcha: {
        siteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
        isVerify: false
      }
    }
  },
  computed: {
    isNicknameValid() {
      return this.nickname !== ''
    },
    isEmailValid() {
      return this.$isEmail(this.email)
    },
    isPasswordValid() {
      return this.password !== '' && this.password === this.passwordConfirm
    },
    canRegister() {
      return (
        this.isNicknameValid &&
        this.isEmailValid &&
        this.isPasswordValid &&
        this.recaptcha.isVerify
      )
    }
  },
  methods: {
    onRecaptchaVerify() {
      this.recaptcha.isVerify = true
    },

    ...mapMutations({
      SET_SHOW_LIGHTBOX: 'lightboxMember/SET_SHOW_LIGHTBOX'
    }),

    register() {
      // if (this.canRegister) {
      this.$sendRegister({
        nickname: this.nickname,
        email: this.email,
        password: this.password
      }).then(res => {
        console.log(res)
      })
      // }
    }
  }
}
</script>

<style lang="stylus" scoped>
.register
  background-color #eeeeee
  padding 21px 90px 31px 90px
  &__recaptcha-wrapper
    margin 21px 0 0 0
  &__reminder
    margin 21px 0 0 0
  &__register-button
    width 270px
    height 40px
    font-size 16px
    font-weight 600
    border-radius 4px
    border none
    background-color #d84939
    color white
    display flex
    justify-content center
    align-items center
    cursor pointer
    margin 24px 0 0 0
    &:focus
      outline none
  &__login-wrapper
    margin 27px 0 0 0

.form
  &__input
    & + &
      margin 10px 0 0 0

.recaptcha-wrapper
  width 270px
  height 67px
  &__recaptcha
    transform scale(0.894) // 270 / 340
    transform-origin 0 0

.reminder
  width 270px
  font-size 14px
  color #7d7d7d
  text-align justify
  line-height 1.43
  a
    color black

.login-wrapper
  display flex
  justify-content center
  align-items center
  &__title
    font-size 16px
    color #7d7d7d
  &__login
    background-color transparent
    border none
    padding 0
    font-size 16px
    color #d84939
    text-decoration underline
    cursor pointer
    &:focus
      outline none
</style>
