<template>
  <div>
    <CRow>
      <CCol sm="8" md="8">
        <CCard>
          <CCardHeader>
            Список купонов
          </CCardHeader>
          <CCardBody>
            <CDataTable
                :items="items"
                :fields="fields"
                :items-per-page="10"
                hover
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
                    <CForm @submit.prevent="editCoupon(item)">
                      <CRow class="form-group">
                        <CCol sm="6">
                          <CInput
                              type="number"
                              min="1"
                              max="100"
                              prepend="Скидка"
                              v-model="item.sale"
                              append="%"
                          />
                        </CCol>
                      </CRow>

                      <CButton type="submit" size="sm" color="info" class="">
                        Применить
                      </CButton>
                      <CButton @click="deleteCoupon(item)" size="sm" color="danger" class="ml-1">
                        Удалить
                      </CButton>
                    </CForm>
                  </CCardBody>
                </CCollapse>
              </template>
              <template #sale="data">
                <td>
                  {{ data.item.sale + '%' }}
                </td>
              </template>
            </CDataTable>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol sm="8" md="4">
        <CCard>
          <CCardHeader>
            Добавить купон
          </CCardHeader>
          <CCardBody>
            <CForm @submit.prevent="createNewCoupon">
              <CInput
                  type="number"
                  min="1"
                  max="100"
                  v-model="sale"
                  prepend="Скидка"
                  append="%"
              />

              <CButton type="submit" size="sm" color="info">
                Добавить
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import axios from "@/plugin/axios"

const fields = [
  {key: 'coupon', label: 'Купон', _style: 'min-width:200px', _classes: 'font-weight-bold'},
  {key: 'sale', label: 'Скидка', _style: 'min-width:100px;'},
  {
    key: 'show_details',
    label: '',
    _style: 'width:1%',
    sorter: false,
    filter: false
  }
]

export default {
  name: 'Coupons',
  data: () => ({
    items: [],

    fields,
    details: [],
    collapseDuration: 0,

    sale: '',
  }),
  created() {
    const data = JSON.parse(localStorage.getItem('login'))

    axios({
      method: 'GET',
      url: 'api/coupon/all',
      headers: {
        Authorization: data.token
      },
    })
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
    createNewCoupon() {
      if (!this.sale || this.sale > 100 || this.sale < 0) {
        return
      }

      axios({method: 'POST', url: 'api/coupon/create', data: {sale: this.sale}})
          .then(res => {
            if (res.data.ok) {
              this.items.push({...res.data.body, id: this.items.length})
            }
          })
          .catch(err => {
            console.log(err)
          })
    },

    editCoupon(item) {
      const [sale] = this.items.filter(coupon => coupon._id === item._id)

      axios({method: 'PUT', url: `api/coupon/edit/${item._id}`, data: {sale: sale.sale}})
          .then(res => {
            if (res.data.ok) {
              this.toggleDetails(item)
            }
          })
          .catch(err => {
            console.log(err)
          })
    },

    deleteCoupon(item) {
      const [sale] = this.items.filter(coupon => coupon._id === item._id)

      axios({method: 'DELETE', url: `api/coupon/${item._id}`, data: {sale: sale.sale}})
          .then(res => {
            if (res.data.ok) {
              this.items = this.items.filter(coupon => coupon._id !== item._id)
              this.toggleDetails(item)
            }
          })
          .catch(err => {
            console.log(err)
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
