<template>
  <CRow>
    <CCol col="12" lg="6">
      <CCard>
        <CCardHeader>
          Редактирование пользователя
        </CCardHeader>
        <CCardBody>
          <CAlert
              :color="status"
              closeButton
              :show.sync="active"
          >
            {{ msg }}
          </CAlert>
          <CForm @submit.prevent="submitFormHandler">
            <CInput
                v-model="email"
                type="email"
                autocomplete="email"
                readonly
                label="Email"
                horizontal
                :is-valid="isPassed"
                valid-feedback="Аккаунт подтвержден"
                invalid-feedback="Аккаунт не подтвержден"
            />

            <CInput
                v-model="name"
                type="text"
                label="Имя"
                horizontal
            />

            <CInput
                v-model="phone"
                type="text"
                label="Телефон"
                horizontal
            />

            <CInput
                v-model="bonus"
                type="number"
                min="0"
                label="Бонус от рефералов"
                horizontal
            />

            <CSelect
                v-model="role"
                label="Роль"
                :options="['Админ','Пользователь']"
            />

            <CRow class="justify-content-end">
              <CButton type="submit" size="md" class="mr-3" color="success">Изменить</CButton>
              <CButton @click="removeUserHandler" v-if="removeVisible" size="md" class="mr-3" color="danger">Удалить</CButton>
            </CRow>
          </CForm>
        </CCardBody>
        <CCardFooter>
          <CButton color="primary" @click="goBack">Назад</CButton>
        </CCardFooter>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import axios from "@/plugin/axios"

export default {
  name: 'User',
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.usersOpened = from.fullPath.includes('users')
    })
  },
  data: () => ({
    usersOpened: null,

    email: '',
    name: '',
    city: '',
    phone: '',
    role: '',
    bonus: '',

    status: '',
    active: false,
    msg: '',

    isPassed: '',
  }),
  computed: {
    removeVisible () {
      const data = JSON.parse(localStorage.getItem('login'))
      return data.email !== this.email
    },
  },
  created() {
    const id = this.$route.params.id
    const data = JSON.parse(localStorage.getItem('login'))

    axios({
      method: 'GET',
      url: `api/users/all/${id}`,
      headers: {
        Authorization: data.token
      },
    })
        .then(res => {
          if (res.data.ok) {
            const user = res.data.body

            this.email = user.email
            this.name = user.firstName
            this.city = user.city
            this.phone = user.phone
            this.bonus = user.bonus
            this.isPassed = user.check.email.status
            this.role = user.isAdmin ? 'Админ' : 'Пользователь'
          }
        })
        .catch(() => {
          this.$router.push({name: 'Login'})
        })

  },
  methods: {
    goBack() {
      this.usersOpened ? this.$router.go(-1) : this.$router.push({path: '/users'})
    },
    submitFormHandler () {
      const id = this.$route.params.id
      const data = JSON.parse(localStorage.getItem('login'))

      const formData = {
        firstName: this.name,
        city: this.city,
        phone: this.phone,
        role: this.role === 'Админ',
        bonus: this.bonus,
      }

      axios({
        method: 'PUT',
        url: `api/users/edit/${id}`,
        headers: {
          Authorization: data.token
        },
        data: formData
      })
          .then(res => {
            if (res.data.ok) {
              this.status = 'success'
              this.active = true
              this.msg = res.data.msg
            } else {
              this.status = 'danger'
              this.active = true
              this.msg = res.data.msg
            }
          })
          .catch(() => {
            this.$router.push({name: 'Login'})
          })
    },
    removeUserHandler () {
      const id = this.$route.params.id
      const data = JSON.parse(localStorage.getItem('login'))

      axios({
        method: 'DELETE',
        url: `api/users/${id}`,
        headers: {
          Authorization: data.token
        }
      })
          .then(res => {
            if (res.data.ok) {
              this.goBack()
            } else {
              console.log(res.data)
            }
          })
          .catch(err => {
            console.log(err)
          })
    }
  }
}
</script>
