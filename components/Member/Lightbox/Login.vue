<template>
  <div class="login">
    <div class="login__sns sns">
      <LoginButtonFacebook
        class="sns__facebook"
      />
      <LoginButtonGoogle
        class="sns__google"
      />
    </div>
    <div class="login__standard standard">
      <p class="standard__title">
        或使用鏡語音帳號登入
      </p>
      <div class="standard__form form">
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
        <div class="form__options options">
          <div
            class="options__remember-me remember-me"
            @click="toggleRememberMe"
          >
            <div
              :class="[
                'remember-me__checkbox',
                { 'remember-me__checkbox--checked' : shouldRememberMe }
              ]"
            />
            <p class="remember-me__text">
              保持登入
            </p>
          </div>
          <button
            class="options__forget-password"
          >
            忘記密碼
          </button>
        </div>
        <button
          class="form__login"
        >
          登入
        </button>
      </div>
    </div>
    <div class="login__register-wrapper register-wrapper">
      <p class="register-wrapper__title">
        還不是會員嗎？
      </p>
      <button
        class="register-wrapper__register"
        @click="$emit('register')"
      >
        立即註冊
      </button>
    </div>
  </div>
</template>

<script>
import LoginButtonFacebook from './LoginButtonFacebook.vue'
import LoginButtonGoogle from './LoginButtonGoogle.vue'
import UserInput from './UserInput.vue'

export default {
  components: {
    LoginButtonFacebook,
    LoginButtonGoogle,
    UserInput
  },
  data() {
    return {
      email: '',
      password: '',
      shouldRememberMe: false
    }
  },
  methods: {
    toggleRememberMe() {
      this.shouldRememberMe = !this.shouldRememberMe
    }
  }
}
</script>

<style lang="stylus" scoped>
.login
  background-color #eeeeee
  padding 36px 90px 31px 90px
  &__standard
    margin 38px 0 0 0
  &__register-wrapper
    margin 68px 0 0 0

.sns
  &__google
    margin 13px 0 0 0

.standard
  display flex
  flex-direction column
  align-items center
  &__title
    font-size 18px
    color #313131
  &__form
    margin 20px 0 0 0

.form
  &__input
    & + &
      margin 10px 0 0 0
  &__options
    margin 24px 0 0 0
  &__login
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

.options
  display flex
  justify-content space-between
  align-items center
  &__forget-password
    background-color transparent
    border none
    padding 0
    font-size 16px
    color #7d7d7d
    text-decoration underline
    cursor pointer
    &:focus
      outline none

.remember-me
  display flex
  align-items center
  font-size 16px
  color #7d7d7d
  cursor pointer
  user-select none
  &__checkbox
    width 16px
    height 16px
    border-radius 1px
    border 1px solid #7d7d7d
    margin 0 9px 0 0
    &--checked
      background-color #7d7d7d

.register-wrapper
  display flex
  justify-content center
  align-items center
  &__title
    font-size 16px
    color #7d7d7d
  &__register
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
