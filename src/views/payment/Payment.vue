<template>
  <div>
    <CRow>
      <CCol sm="12">
        <CCard>
          <CCardHeader>
            Товары
          </CCardHeader>

          <CCardBody class="m-body">
            <ul class="m-list">
              <li v-for="product in payment.body" :key="product.id" class="m-list-item">
                <div class="info">
                  <img class="info__image" :src="getUrl(product.thumb)" alt="">

                  <div class="description">
                    <router-link :to="`/products/product/${product.id}`">
                      {{ product.name }}
                    </router-link>

                    <div class="description__pack">
                      {{ product.pack }} шт.
                    </div>
                  </div>
                </div>

                <div class="m-price">
                  {{ product.pack * product.price.uah }} грн / {{ (product.pack * product.price.usd).toFixed(2) }}$
                </div>
              </li>
            </ul>

            <div class="m-subtotal">
              <span style="opacity: .8;">Промежуточная сумма:</span> {{ payment.price.subtotal.uah }} грн /
              {{ payment.price.subtotal.usd.toFixed(2) }}$
            </div>

            <div v-if="payment.price.coupon.body" class="coupon">
              <div class="coupon__body">Купон: {{ payment.price.coupon.body }}</div>
              <div class="coupon__sale">Скидка: {{ payment.price.coupon.sale }}%</div>
            </div>

            <div v-if="payment.price.payment === 'referral_bonus'" class="payment">
              Покупка была сделанна с бонусного счёта
            </div>

            <div class="payment">
              Доставка: <strong>{{ payment.price.shipping }} {{ payment.price.currency }}</strong>
            </div>

            <div class="m-subtotal">
              <span style="opacity: .8;">Итого:</span> {{ payment.price.total.uah }} грн /
              {{ payment.price.total.usd.toFixed(2) }}$
            </div>
          </CCardBody>
        </CCard>

        <CCard>
          <CCardHeader>
            Инфомация о заказе
          </CCardHeader>

          <CCardBody>
            <h3>
              <CBadge shape="pill" :color="status">{{ statusText }}</CBadge>
            </h3>
            <h3 v-if="payment.dontCall">Пользователь просил не перезванивать</h3>

            <h4 class="pt-2">Доставка: {{ payment.shipping }}</h4>

            <CRow class="pt-3 m-form">
              <CCol sm="12">
                <h4>Контактная информация</h4>
              </CCol>

              <CCol sm="6">
                <CInput type="text"
                        label="Почта"
                        horizontal
                        readonly
                        v-model="payment.info.email"/>
              </CCol>

              <CCol sm="6">
                <CInput type="text"
                        label="Телефон"
                        horizontal
                        readonly
                        v-model="payment.info.phone"/>
              </CCol>
            </CRow>

            <CRow class="pt-3 m-form">
              <CCol sm="12">
                <h4>Адрес доставки</h4>
              </CCol>

              <CCol sm="6">
                <CInput type="text"
                        label="Имя"
                        horizontal
                        readonly
                        v-model="payment.info.firstName"/>
              </CCol>

              <CCol sm="6">
                <CInput type="text"
                        label="Фамилия"
                        horizontal
                        readonly
                        v-model="payment.info.lastName"/>
              </CCol>

              <CCol sm="6">
                <CInput type="text"
                        label="Страна"
                        horizontal
                        readonly
                        v-model="payment.info.country"/>
              </CCol>

              <CCol sm="6">
                <CInput type="text"
                        label="Штат / Область"
                        horizontal
                        readonly
                        v-model="payment.info.stateProvince"/>
              </CCol>

              <CCol sm="6">
                <CInput type="text"
                        label="Город"
                        horizontal
                        readonly
                        v-model="payment.info.city"/>
              </CCol>

              <CCol sm="6">
                <CInput type="text"
                        label="Улица"
                        horizontal
                        readonly
                        v-model="payment.info.address"/>
              </CCol>

              <CCol sm="6">
                <CInput type="text"
                        label="Дом / Квартира"
                        horizontal
                        readonly
                        v-model="payment.info.apartment"/>
              </CCol>

              <CCol sm="6">
                <CInput type="text"
                        label="Почтовый индекс"
                        horizontal
                        readonly
                        v-model="payment.info.zipCode"/>
              </CCol>
            </CRow>

            <div v-if="status === 'warning'" class="m-button">
              <CButton @click="changeStatus('Принято в обработку')" color="primary">Принять в обработку</CButton>
            </div>

            <div v-else-if="status === 'primary'" class="m-button">
              <CButton @click="changeStatus('Отправленно')" class="mr-2" color="info">Отправить</CButton>
              <CButton @click="changeStatus('Оплаченно')" color="warning">Перевести в статус "Оплаченно"</CButton>
            </div>

            <div v-else-if="status === 'info'" class="m-button">
              <CButton @click="changeStatus('Завершенно')" class="mr-2" color="success">Завершить заказ</CButton>
              <CButton @click="changeStatus('Принято в обработку')" color="primary">Перевести в статус "Принято в обработку"</CButton>
            </div>

            <div v-else-if="status === 'success'" class="m-button">
              <CButton @click="changeStatus('Отправленно')" color="info">Перевести в статус "Отправленно"</CButton>
            </div>

            <div v-else-if="status === 'light'" class="m-button">
              <CButton @click="changeStatus('Оплаченно')" color="warning">Перевести в статус "Оплаченно"</CButton>
            </div>

            <div class="mt-2 m-button">
              <CButton @click="removeRevokeHandler('remove')" variant="outline" class="mr-2" color="danger">Удалить</CButton>
              <CButton @click="removeRevokeHandler('revoke')" variant="outline" class="mr-2" color="dark">Отменить</CButton>
              <CButton @click="$router.go(-1)" class="ml-3" color="info">Назад</CButton>
            </div>
            <div class="mt-1 m-button text-right">
              <small><em>При <strong>отмене</strong> или <strong>удаление</strong>, удалиться бонус от заказа и история покупок в личном кабинете <br>
              Если после этого возобновить заказ, бонус и история <strong>не</strong> востановятся</em></small>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import axios from "@/plugin/axios"
import config from "@/config/config"

export default {
  name: 'PaymentItem',
  data: () => ({
    payment: {},
    status: '',
    statusText: '',

    alert: {
      visible: false,
      msg: '',
      type: ''
    }
  }),
  watch: {
    statusText () {
      this.status = 'primary'

      switch (this.statusText) {
        case 'Оплаченно':
          this.status = 'warning'
          break
        case 'Принято в обработку':
          console.log(this.statusText)
          this.status = 'primary'
          break
        case 'Отправленно':
          this.status = 'info'
          break
        case 'Завершенно':
          this.status = 'success'
          break
        case 'Отменен':
          this.status = 'light'
          break
      }
    }
  },
  async created() {
    const data = await JSON.parse(localStorage.getItem('login'))

    await axios({
      url: `/api/payment/all/${this.$route.params.id}`,
      method: "GET",
      headers: {
        Authorization: data.token
      }
    })
        .then(res => {
          if (res.data.ok) {
            this.payment = res.data.body
            this.statusText = res.data.body.status
          } else {
            this.alertHandler(res.data.msg, true)
          }
        })
        .catch(err => console.log(err))
  },
  methods: {
    getUrl(url) {
      return config.url + url
    },

    async changeStatus(status) {
      const data = await JSON.parse(localStorage.getItem('login'))

      await axios({
        url: `/api/payment/status/${this.$route.params.id}`,
        method: "POST",
        headers: {
          Authorization: data.token
        },
        data: {status}
      })
          .then(res => {
            if (res.data.ok) {
              console.log(res.data)
              this.statusText = status
            }
          })
          .catch(err => console.log(err))
    },

    async removeRevokeHandler(action) {
      const data = await JSON.parse(localStorage.getItem('login'))

      await axios({
        url: `/api/payment/revoke/${this.$route.params.id}`,
        method: "POST",
        headers: {
          Authorization: data.token
        },
        data: {action}
      })
          .then(res => {
            if (res.data.ok) {
              if (action === 'remove') {
                this.$router.go(-1)
              } else if (action === 'revoke') {
                this.statusText = 'Отменен'
              }
            }
          })
          .catch(err => console.log(err))
    }
  }
}
</script>

<style lang="scss">
.m-button {
  display: flex;
  align-items: center;

  justify-content: flex-end;
}

.m-form {
  .form-control:disabled, .form-control[readonly] {
    background-color: transparent;
  }
}

.m-body {
  background: #272831;
  padding: 30px 0;
  color: #ffffff;
}

.m-list {
  padding: 30px 0;
  margin: 0 20px;
  list-style: none;

  border-top: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);

  &-item {
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    & + & {
      margin-top: 25px;
    }
  }

  .info {
    display: flex;
    align-items: flex-start;
    grid-gap: 15px;
    gap: 15px;

    &__image {
      width: 70px;
      height: 75px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      border: 1px solid rgba(255, 255, 255, 0.2);
      -o-object-fit: cover;
      object-fit: cover;
    }

    .description {
      a {
        font-size: 14px;
        letter-spacing: 0.933333px;
        text-transform: uppercase;
        display: block;
        opacity: 0.8;
        transition: opacity 0.3s 0s;
        padding: 5px 0 15px;
        text-decoration: none;
        color: #ffffff;

        &:hover {
          opacity: 1;
        }
      }

      &__pack {
        font-weight: bold;
        font-size: 14px;
        line-height: 14px;
      }
    }
  }
}

.m-price {
  font-weight: bold;
  font-size: 14px;
  line-height: 30px;
}

.m-subtotal {
  float: right;
  padding-top: 10px;
  padding-right: 20px;

  font-weight: bold;
  font-size: 17px;
  line-height: 30px;
}

.coupon {
  padding: 20px 0 0 20px;

  display: flex;
  align-items: center;

  &__body {
    font-weight: bold;
    font-size: 14px;
    line-height: 14px;
  }

  &__sale {
    padding-left: 40px;
    font-weight: bold;
    font-size: 16px;
  }
}

.payment {
  padding: 20px 0 0 20px;
  font-size: 15px;
}
</style>