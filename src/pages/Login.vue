<template>
  <div class="fixed fixed-center bg-grey-1 text-white">
    <q-form class="q-gutter-md" @submit.prevent="submitForm">
      <q-card square  class="flex-center text-center" style="width: 400px; padding:50px">
        <img src="assets/quasar-logo.png" style='max-width:300px; padding-top:30px; padding-bottom:50px'>
        <q-card-separator />
        <div class="text-left" >
          <q-input label="Логин" v-model="login.username">
            </q-input>
            <q-input label="Пароль" type="password" v-model="login.password">
            </q-input>
        </div>
        <q-card-actions>
          <q-btn class="full-width" color="primary" label="Вход" type="submit" rounded></q-btn>
        </q-card-actions>
      </q-card>
    </q-form>
  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { mapActions } from 'vuex'
import qs from 'qs'

let $q

export default {
  name: 'Login',
  data () {
    return {
      login: {
        username: '',
        password: '',
        grant_type: 'password',
        client_id: 'employee-interaction-fe'
      }
    }
  },
  methods: {
    ...mapActions('auth', ['doLogin']),
    async submitForm () {
      if (!this.login.username || !this.login.password) {
        $q.notify({
          type: 'negative',
          message: 'Неверный логин или пароль.'
        })
      } else if (this.login.password.length < 6) {
        $q.notify({
          type: 'negative',
          message: 'Пароль должен содержать больше 6 символов.'
        })
      } else {
        try {
          await this.doLogin(qs.stringify(this.login))
          const toPath = this.$route.query.to || '/admin'
          this.$router.push(toPath)
        } catch (err) {
          if (err.response.data.detail) {
            $q.notify({
              type: 'negative',
              message: 'Неверный логин или пароль.'
            })
          }
        }
      }
    }
  },
  mounted () {
    $q = useQuasar()
  }
}
</script>
