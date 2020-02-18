<template>
  <section>
    <b-field label="Email">
      <b-input type="email"
          placeholder="Email"
          v-model="loginForm.email"
          maxlength="30"
          required>
      </b-input>
    </b-field>

    <b-field label="Password">
      <b-input type="password"
          placeholder="Password"
          v-model="loginForm.password"
          required>
      </b-input>
    </b-field>

    <b-field>
      <b-button :loading="isFetching" @click="login">Login</b-button>
    </b-field>

    <b-field>
      <span class="error">{{ error }}</span>
    </b-field>
  </section>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'LoginForm',
  data () {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      isFetching: false,
      error: ''
    }
  },
  methods: {
    ...mapActions({
      setRole: 'setRole'
    }),

    async login () {
      this.isFetching = true
      if (this.validEmail(this.loginForm.email) && this.loginForm.password) {
        await fetch('http://localhost:3000/users?login=' + this.loginForm.email, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => {
            if (response.status === 200) {
              return response.json()
            } else {
              throw new Error(response.statusText)
            }
          })
          .then(data => {
            if (data.length === 0) throw new Error('Email is invalid. Please, try again!')
            else if (toString(data[0].password) !== toString(this.loginForm.password)) throw new Error('Password is invalid. Please, try again!')
            else {
              this.setRole(data[0].role)
              this.$router.push({ path: '/' })
            }
          })
          .catch(err => {
            console.log(err)
            this.error = err
          })
      }
      this.isFetching = false
    },
    validEmail: function (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // eslint-disable-line
      return re.test(email)
    }
  }
}
</script>

<style lang="scss" scoped>
  .error {
    color: #D8000C;
  }
</style>
