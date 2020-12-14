<template>
  <div>
    <CRow>
      <CCol col="12">
        <CCard>
          <CCardHeader>
            Список заказов
          </CCardHeader>
          <CCardBody>
            <CTabs :vertical="vertical">
              <CTab :title="`Оплаченно (${paid.length})`">
                <CDataTable
                    hover
                    striped
                    :items="paid"
                    :fields="fields"
                    items-per-page-select
                    :items-per-page="10"
                    clickable-rows
                    @row-clicked="rowClicked"
                    :pagination="{ doubleArrows: false, align: 'center'}"
                >
                  <template #info="data">
                    <td>
                      {{data.item.info.email}} <br>
                      <span v-if="!data.item.dontCall">{{data.item.info.phone}}</span>
                    </td>
                  </template>
                  <template #price="data">
                    <td>
                      <CBadge>
                        {{ data.item.price.total.uah }} грн / {{data.item.price.total.usd}}$
                      </CBadge>
                    </td>
                  </template>
                  <template #timeStamp="data">
                    <td>
                      <CBadge>
                        {{ data.item.timeStamp | DataFilter }}
                      </CBadge>
                    </td>
                  </template>
                </CDataTable>
              </CTab>
              <CTab :title="`Принято в обработку (${order.length})`">
                <CDataTable
                    hover
                    striped
                    :items="order"
                    :fields="fields"
                    items-per-page-select
                    :items-per-page="10"
                    clickable-rows
                    @row-clicked="rowClicked"
                    :pagination="{ doubleArrows: false, align: 'center'}"
                >
                  <template #info="data">
                    <td>
                      {{data.item.info.email}} <br>
                      <span v-if="!data.item.dontCall">{{data.item.info.phone}}</span>
                    </td>
                  </template>
                  <template #price="data">
                    <td>
                      <CBadge>
                        {{ data.item.price.total.uah }} грн / {{data.item.price.total.usd}}$
                      </CBadge>
                    </td>
                  </template>
                  <template #timeStamp="data">
                    <td>
                      <CBadge>
                        {{ data.item.timeStamp | DataFilter }}
                      </CBadge>
                    </td>
                  </template>
                </CDataTable>
              </CTab>
              <CTab :title="`Отправленно (${send.length})`">
                <CDataTable
                    hover
                    striped
                    :items="send"
                    :fields="fields"
                    items-per-page-select
                    :items-per-page="10"
                    clickable-rows
                    @row-clicked="rowClicked"
                    :pagination="{ doubleArrows: false, align: 'center'}"
                >
                  <template #info="data">
                    <td>
                      {{data.item.info.email}} <br>
                      <span v-if="!data.item.dontCall">{{data.item.info.phone}}</span>
                    </td>
                  </template>
                  <template #price="data">
                    <td>
                      <CBadge>
                        {{ data.item.price.total.uah }} грн / {{data.item.price.total.usd}}$
                      </CBadge>
                    </td>
                  </template>
                  <template #timeStamp="data">
                    <td>
                      <CBadge>
                        {{ data.item.timeStamp | DataFilter }}
                      </CBadge>
                    </td>
                  </template>
                </CDataTable>
              </CTab>
              <CTab :title="`Завершенные (${received.length})`">
                <CDataTable
                    hover
                    striped
                    :items="received"
                    :fields="fields"
                    items-per-page-select
                    :items-per-page="10"
                    clickable-rows
                    @row-clicked="rowClicked"
                    :pagination="{ doubleArrows: false, align: 'center'}"
                >
                  <template #info="data">
                    <td>
                      {{data.item.info.email}} <br>
                      <span v-if="!data.item.dontCall">{{data.item.info.phone}}</span>
                    </td>
                  </template>
                  <template #price="data">
                    <td>
                      <CBadge>
                        {{ data.item.price.total.uah }} грн / {{data.item.price.total.usd}}$
                      </CBadge>
                    </td>
                  </template>
                  <template #timeStamp="data">
                    <td>
                      <CBadge>
                        {{ data.item.timeStamp | DataFilter }}
                      </CBadge>
                    </td>
                  </template>
                </CDataTable>
              </CTab>
              <CTab :title="`Отменненые (${excellent.length})`">
                <CDataTable
                    hover
                    striped
                    :items="excellent"
                    :fields="fields"
                    items-per-page-select
                    :items-per-page="10"
                    clickable-rows
                    @row-clicked="rowClicked"
                    :pagination="{ doubleArrows: false, align: 'center'}"
                >
                  <template #info="data">
                    <td>
                      {{data.item.info.email}} <br>
                      <span v-if="!data.item.dontCall">{{data.item.info.phone}}</span>
                    </td>
                  </template>
                  <template #price="data">
                    <td>
                      <CBadge>
                        {{ data.item.price.total.uah }} грн / {{data.item.price.total.usd}}$
                      </CBadge>
                    </td>
                  </template>
                  <template #timeStamp="data">
                    <td>
                      <CBadge>
                        {{ data.item.timeStamp | DataFilter }}
                      </CBadge>
                    </td>
                  </template>
                </CDataTable>
              </CTab>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import axios from "@/plugin/axios"
import flag from '@/mixins/flag.mixin'
import DataFilter from '@/filters/date.filter'

// оплачено, формирование заказа, отправленно, получено.

const fields = [
  {key: 'info', label: 'Контакты', _classes: 'font-weight-bold'},
  {key: 'price', label: 'Сумма заказа', _classes: 'font-weight-bold'},
  {key: 'shipping', label: 'Доставка'},
  {key: 'timeStamp', label: 'Время заказа'},
]

export default {
  name: 'PaymentCatalog',
  mixins: [flag],
  filters: {DataFilter},
  data: () => ({
    items: [],
    paid: [],
    order: [],
    send: [],
    received: [],
    excellent: [],

    fields,
    vertical: {navs: 'col-md-2', content: 'col-md-10'},

    alert: {
      visible: false,
      msg: '',
      type: ''
    }
  }),
  async created() {
    const data = await JSON.parse(localStorage.getItem('login'))

    await axios({
      url: '/api/payment/new/reset',
      method: "GET",
      headers: {
        Authorization: data.token
      }
    })
        .then(res => console.log(res.data.msg))
        .catch(err => console.log(err))

    await axios({
      url: '/api/payment/all',
      method: "GET",
      headers: {
        Authorization: data.token
      }
    })
        .then(res => {
          if (res.data.ok) {
            this.items = res.data.body.reverse()
            this.paymentSortHandler()
          } else {
            this.alertHandler(res.data.msg, true)
          }
        })
        .catch(err => console.log(err))
  },
  methods: {
    rowClicked(item) {
      this.$router.push({path: `payment/${item._id}`})
    },
    pageChange(val) {
      this.$router.push({query: {page: val}})
    },
    paymentSortHandler () {
      this.paid = this.items.filter(payment => payment.status === 'Оплаченно')
      this.order = this.items.filter(payment => payment.status === 'Принято в обработку')
      this.send = this.items.filter(payment => payment.status === 'Отправленно')
      this.received = this.items.filter(payment => payment.status === 'Завершенно')
      this.excellent = this.items.filter(payment => payment.status === 'Отменен')
    }
  }
}
</script>

<style>
.paid {
  background: #cdcdcd;
}
</style>