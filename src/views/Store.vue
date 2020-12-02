<template>
  <div>
    <CRow>
      <CCol sm="12">
        <CCard>
          <CCardHeader>
            Добавить магазин
          </CCardHeader>
          <CCardBody>
            <CAlert v-if="alert.visible" :color="alert.type">
              {{ alert.msg }}
            </CAlert>

            <CForm @submit.prevent="createNewStore">
              <CInput type="text" v-model="title" prepend="Название магазина"/>

              <CRow>
                <CCol sm="6">
                  <CInput type="text" v-model="country" prepend="Страна на латинице"/>
                </CCol>
                <CCol sm="6">
                  <CInput type="text" v-model="address" append="Адресс"/>
                </CCol>
              </CRow>

              <CRow>
                <CCol sm="6">
                  <CInput type="number" v-model="lat" prepend="Долгота" step="0.000001"/>
                </CCol>
                <CCol sm="6">
                  <CInput type="number" v-model="lng" append="Широта" step="0.000001"/>
                </CCol>
              </CRow>

              <CButton type="submit" size="md" color="dark">
                Добавить
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol sm="12">
        <CCard>
          <CCardHeader>
            Список всех магазинов
          </CCardHeader>
          <CCardBody>
            <CDataTable
                :items="items"
                :fields="fields"
                :items-per-page="10"
                hover
                table-filter
                items-per-page-select
                sorter
                pagination
            >
              <template #show_details="{item, index}">
                <td class="py-2">
                  <CButton
                      color="primary"
                      variant="outline"
                      square
                      size="sm"
                      @click="toggleDetails(item, index)"
                  >
                    {{ Boolean(item._toggled) ? 'Скрыть' : 'Показать' }}
                  </CButton>
                </td>
              </template>
              <template #details="{item}">
                <CCollapse :show="Boolean(item._toggled)" :duration="collapseDuration">
                  <CCardBody>
                    <CForm @submit.prevent="editShopHandler(item)">
                      <CInput type="text" v-model="item.title" prepend="Название магазина"/>

                      <CRow>
                        <CCol sm="6">
                          <CInput type="text" v-model="item.country" prepend="Страна на латинице"/>
                        </CCol>
                        <CCol sm="6">
                          <CInput type="text" v-model="item.address" append="Адресс"/>
                        </CCol>
                      </CRow>

                      <CRow>
                        <CCol sm="6">
                          <CInput type="number" v-model="item.lat" prepend="Долгота" step="0.000001"/>
                        </CCol>
                        <CCol sm="6">
                          <CInput type="number" v-model="item.lng" append="Широта" step="0.000001"/>
                        </CCol>
                      </CRow>

                      <CButton type="submit" size="sm" color="info" class="">
                        Применить
                      </CButton>
                      <CButton @click="deleteShopHandler(item)" size="sm" color="danger" class="ml-1">
                        Удалить
                      </CButton>
                    </CForm>
                  </CCardBody>
                </CCollapse>
              </template>
            </CDataTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import axios from "@/plugin/axios"

const fields = [
  {key: 'title', label: 'Название магазина', _style: 'min-width:200px', _classes: 'font-weight-bold'},
  {key: 'country', label: 'Страна', _style: 'min-width:100px;'},
  {key: 'address', label: 'Адрес', _style: 'min-width:100px;'},
  {
    key: 'show_details',
    label: '',
    _style: 'width:1%',
    sorter: false,
    filter: false
  }
]

export default {
  name: 'Stores',
  data: () => ({
    items: [],

    fields,
    details: [],
    collapseDuration: 0,

    title: 'Canabis Shop',
    country: 'USA',
    address: 'Vreimsida 426, 3803 Bø I Telemark, Norway',
    lat: '46.483893',
    lng: '30.741873',

    alert: {
      visible: false,
      msg: '',
      type: ''
    }
  }),
  created() {
    axios({ method: 'GET', url: 'api/store' })
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

    createNewStore() {
      if (!this.title || !this.country || !this.address || !this.lat || !this.lng) {
        this.alertHandler('Форма не валидна', true)
        return
      }

      const data = JSON.parse(localStorage.getItem('login'))

      const formData = {
        title: this.title,
        country: this.country,
        address: this.address,
        lat: this.lat,
        lng: this.lng,
      }

      axios({
        method: 'POST',
        url: 'api/store/create',
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

    editShopHandler(item) {
      const data = JSON.parse(localStorage.getItem('login'))

      const formData = {
        title: item.title,
        country: item.country,
        address: item.address,
        lat: item.lat,
        lng: item.lng,
      }

      axios({
        method: 'PUT',
        url: `api/store/edit/${item._id}`,
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
          .catch(err => {
            this.alertHandler('Произошла неизвестная ошибка, проверте консоль, Нажмите F12', true)
            console.log(err)
          })
    },

    deleteShopHandler(item) {
      const data = JSON.parse(localStorage.getItem('login'))

      axios({
        method: 'DELETE',
        headers: {
          Authorization: data.token
        },
        url: `api/store/${item._id}`
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
