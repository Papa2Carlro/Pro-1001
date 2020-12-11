<template>
  <div>
    <CRow>
      <CCol sm="12">
        <CCard>
          <CCardHeader>
            Добавить метод доставки
          </CCardHeader>
          <CCardBody>
            <CAlert v-if="alert.visible" :color="alert.type">
              {{ alert.msg }}
            </CAlert>

            <CForm @submit.prevent="createNewShipping">

              <CInput class="mt-3" type="text" required placeholder="Введите название метода доставки..." v-model="title"
                      prepend="Название"/>

              <CRow>
                <CCol sm="12">
                  <p class="mb-2">Цена доставки</p>
                </CCol>
                <CCol sm="6">
                  <CInput type="number" step="0.01" required placeholder="Введите цену доставки в гривнах..."
                          v-model="price.uah">
                    <template slot="prepend-content">
                      <CIcon :height="15" :content="$options.ua"/>
                    </template>
                  </CInput>
                </CCol>

                <CCol sm="6">
                  <CInput type="number" step="0.01" required placeholder="Введите цену доставки в долларах..."
                          v-model="price.usd">
                    <template slot="prepend-content">
                      <CIcon :height="15" :content="$options.en"/>
                    </template>
                  </CInput>
                </CCol>
              </CRow>

              <CRow>
                <CCol sm="12">
                  <p class="mb-2">Время доставки</p>
                </CCol>
                <CCol sm="6">
                  <CInput type="number"
                          placeholder="Введите время доставки..."
                          prepend="От"
                          append="До"
                          v-model="shipping.from"/>
                </CCol>

                <CCol sm="6">
                  <CInput type="number"
                          placeholder="Введите время доставки..."
                          append="Рабочих дней"
                          v-model="shipping.to"/>
                </CCol>
              </CRow>

              <CButton class="mt-4" type="submit" size="md" color="dark">
                Добавить
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol sm="12">
        <CCard>
          <CCardHeader>
            Список всех методов
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
              <template #price="{item}">
                <td class="py-2">
                  <span v-if="item.price.uah === 0">Free</span>
                  <span v-else>{{ item.price.uah }} грн / {{ item.price.usd }}$</span>
                </td>
              </template>
              <template #shipping="{item}">
                <td class="py-2">
                  От {{ item.shipping.from }} до {{ item.shipping.to }} рабочих дней
                </td>
              </template>
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
                    <CForm @submit.prevent="editShippingHandler(item)">
                      <CInput class="mt-3" type="text" required placeholder="Введите название метода доставки..." v-model="item.title"
                              prepend="Название"/>

                      <CRow>
                        <CCol sm="12">
                          <p class="mb-2">Цена доставки</p>
                        </CCol>
                        <CCol sm="6">
                          <CInput type="number" step="0.01" required placeholder="Введите цену доставки в гривнах..."
                                  v-model="item.price.uah">
                            <template slot="prepend-content">
                              <CIcon :height="15" :content="$options.ua"/>
                            </template>
                          </CInput>
                        </CCol>

                        <CCol sm="6">
                          <CInput type="number" step="0.01" required placeholder="Введите цену доставки в долларах..."
                                  v-model="item.price.usd">
                            <template slot="prepend-content">
                              <CIcon :height="15" :content="$options.en"/>
                            </template>
                          </CInput>
                        </CCol>
                      </CRow>

                      <CRow>
                        <CCol sm="12">
                          <p class="mb-2">Время доставки</p>
                        </CCol>
                        <CCol sm="6">
                          <CInput type="number"
                                  placeholder="Введите время доставки..."
                                  prepend="От"
                                  append="До"
                                  required
                                  v-model="item.shipping.from"/>
                        </CCol>

                        <CCol sm="6">
                          <CInput type="number"
                                  placeholder="Введите время доставки..."
                                  append="Рабочих дней"
                                  required
                                  v-model="item.shipping.to"/>
                        </CCol>
                      </CRow>

                      <CButton type="submit" size="sm" color="info" class="mt-4">
                        Применить
                      </CButton>
                      <CButton @click="deleteShippingHandler(item)" size="sm" color="danger" class="mt-4 ml-1">
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

    title: '',
    price: {
      usd: '',
      uah: ''
    },
    shipping: {
      from: '',
      to: ''
    },

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
