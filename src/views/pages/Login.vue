<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>Вход</h1>
                  <p class="text-muted">Войдите в свой аккаунт</p>
                  <CInput
                      v-model="email"
                      placeholder="Email"
                      autocomplete="username email"
                      invalid-feedback="Введите валидные данные"
                      :is-valid="errorEmail"
                  >
                    <template #prepend-content>
                      <CIcon name="cil-user"/>
                    </template>
                  </CInput>
                  <CInput
                      placeholder="Password"
                      v-model="password"
                      type="password"
                      autocomplete="password"
                      invalid-feedback="Введите валидные данные"
                      :is-valid="errorPassword"
                  >

                    <template #prepend-content>
                      <CIcon name="cil-lock-locked"/>
                    </template>
                  </CInput>
                  <CRow>
                    <CCol col="6" class="text-left">
                      <CButton @click="submitHandler" color="primary" class="px-4">Вход</CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import axios from "@/plugin/axios"

export default {
  name: 'Login',
  data: () => ({
    email: 'priymak615@gmail.com',
    password: '9dce445b',

    errorEmail: true,
    errorPassword: true,
  }),
  watch: {
    email () {
      this.errorEmail = true
    },
    password () {
      this.errorPassword = true
    }
  },
  methods: {
    submitHandler() {
      axios({
        method: 'POST',
        url: '/api/users/login',
        data: {
          email: this.email,
          password: this.password,
        }
      })
          .then(res => {
            if (res.data.ok) {
              if (res.data.isAdmin) {
                localStorage.setItem('login', JSON.stringify({
                  email: this.email,
                  token: res.data.token
                }))

                this.$router.push('/')
              }
            } else {
              if (res.data.msg.email) {
                this.errorEmail = false
              } else if (res.data.msg.password) {
                this.errorPassword = false
              }
            }
          })
          .catch(err => {
            console.log(err)
          })
    }
  }
}
</script>
