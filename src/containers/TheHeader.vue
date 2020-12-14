<template>
  <CHeader fixed with-subheader light>
    <CToggler
        in-header
        class="ml-3 d-lg-none"
        @click="$store.commit('toggleSidebarMobile')"
    />
    <CToggler
        in-header
        class="ml-3 d-md-down-none"
        @click="$store.commit('toggleSidebarDesktop')"
    />
    <CHeaderBrand class="mx-auto d-lg-none" to="/">
      <CIcon name="logo" height="48" alt="Logo"/>
    </CHeaderBrand>
    <div class="m-menu">
      <CHeaderNav class="d-md-down-none mr-auto">
        <CHeaderNavItem class="px-3">
          <CHeaderNavLink to="/dashboard">
            Dashboard
          </CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem class="px-3">
          <CHeaderNavLink to="/users" exact>
            Пользователи
          </CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem class="px-3">
          <CHeaderNavLink>
            Настройки
          </CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>

      <div class="right">
        <router-link class="m-payment" to="/payment">
          <CIcon :width="30" :content="$options.bell"/>

          <div v-if="newPayment" class="m-badge">
            {{ newPayment }}
          </div>
        </router-link>

        <CButton class="m-btn" @click="logout" color="secondary">Выйти</CButton>
      </div>
    </div>
    <CSubheader class="px-3">
      <CBreadcrumbRouter class="border-0 mb-0"/>
    </CSubheader>
  </CHeader>
</template>

<script>
import {cilBell} from '@coreui/icons'
import axios from "../plugin/axios"

export default {
  name: 'TheHeader',
  bell: cilBell,
  data: () => ({
    newPayment: 0
  }),
  async created() {
    await this.getData()
    await setInterval(this.getData, 20000)
  },
  methods: {
    logout() {
      localStorage.removeItem('login')
      this.$router.push('/login')
    },
   async getData () {
      await axios({
        method: "GET",
        url: '/api/payment/new'
      })
          .then(res => {
            if (res.data.ok) {
              this.newPayment = res.data.body
            }
          })
          .catch(err => console.log(err))
    }
  }
}
</script>

<style lang="scss">
.m-menu {
  width: 90%;
  display: flex;
  align-content: flex-start;
  justify-content: space-between;
}

.m-btn {
  margin: 10px 0;
}

.m-payment {
  position: relative;
  margin-right: 20px;
  color: #535D6D;
}

.m-badge {
  position: absolute;
  top: -50%;
  right: -20%;

  display: flex;
  font-weight: bold;
  justify-content: center;

  color: #fff;

  width: 20px;
  height: 20px;

  background: #2EB85C;
  border-radius: 100px;
}
</style>
