<template>
  <div>
    <CAlert v-if="alert.visible" :color="alert.type">
      {{ alert.msg }}
    </CAlert>
    <CRow>
      <CCol sm="12">

      </CCol>
    </CRow>
  </div>
</template>

<script>
import axios from "@/plugin/axios"
import flag from '@/mixins/flag.mixin'

const fields = [
  {key: 'title', label: 'Название', _classes: 'font-weight-bold'},
  {key: 'price', label: 'Цена доставки'},
  {key: 'shipping', label: 'Время доставки'},
  {
    key: 'show_details',
    label: '',
    _style: 'width:1%',
    sorter: false,
    filter: false
  }
]

export default {
  name: 'Faqs',
  mixins: [flag],
  data: () => ({
    items: [],

    fields,
    details: [],
    collapseDuration: 0,

    alert: {
      visible: false,
      msg: '',
      type: ''
    }
  }),
  created() {
    axios({method: 'GET', url: 'api/shipping'})
        .then(res => {
          if (res.data.ok) {
            this.items = res.data.body.map((item, id) => {
              return {...item, id}
            })
          }
        })
        .catch(() => {
          this.$router.push({name: 'Login'})
        })
  },
  methods: {
    alertHandler(msg, error) {
      this.alert.visible = true
      this.alert.msg = msg
      this.alert.type = error ? 'danger' : 'success'

      setInterval(() => this.alert.visible = false, 5000)
    },

    createNewShipping() {
      if (!this.title) {
        this.alertHandler('Форма не валидна', true)
        return
      }

      const data = JSON.parse(localStorage.getItem('login'))

      const formData = {
        title: this.title,
        price: this.price,
        shipping: this.shipping,
      }

      axios({
        method: 'POST',
        url: 'api/shipping',
        headers: {
          Authorization: data.token
        },
        data: formData
      })
          .then(res => {
            if (res.data.ok) {
              this.alertHandler(res.data.msg, false)
              this.items.push({...res.data.body, id: this.items.length})
            } else {
              this.alertHandler('Сервер вернул ошибку, проверте консоль, Нажмите F12', true)
              console.log(res.data)
            }
          })
          .catch(err => {
            this.alertHandler('Произошла неизвестная ошибка, проверте консоль, Нажмите F12', true)
            console.log(err)
          })
    },

    editShippingHandler(item) {
      const data = JSON.parse(localStorage.getItem('login'))

      const formData = {
        title: item.title,
        price: item.price,
        shipping: item.shipping,
      }

      axios({
        method: 'PUT',
        url: `api/shipping/${item._id}`,
        headers: {
          Authorization: data.token
        },
        data: formData
      })
          .then(res => {
            if (res.data.ok) {
              this.alertHandler(res.data.msg, false)
              this.toggleDetails(item)
            } else {
              this.alertHandler('Сервер вернул ошибку, проверте консоль, Нажмите F12', true)
            }
          })
          .catch(() => {
            this.$router.push({name: 'Login'})
            localStorage.removeItem('login')
          })
    },

    deleteShippingHandler(item) {
      const data = JSON.parse(localStorage.getItem('login'))

      axios({
        method: 'DELETE',
        headers: {
          Authorization: data.token
        },
        url: `api/shipping/${item._id}`
      })
          .then(res => {
            if (res.data.ok) {
              this.items = this.items.filter(store => store._id !== item._id)
              this.alertHandler(res.data.msg, false)
              this.toggleDetails(item)
            } else {
              this.alertHandler('Сервер вернул ошибку, проверте консоль, Нажмите F12', true)
            }
          })
    },

    toggleDetails(item) {
      this.$set(this.items[item.id], '_toggled', !item._toggled)
      this.collapseDuration = 300
      this.$nextTick(() => {
        this.collapseDuration = 0
      })
    }
  }
}
</script>
