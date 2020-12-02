<template>
  <CRow>
    <CCol col="12" xl="12">
      <CCard>
        <CCardHeader>
          Список пользователей
        </CCardHeader>
        <CCardBody>
          <CDataTable
            hover
            striped
            :items="items"
            :fields="fields"
            column-filter
            table-filter
            sorter
            items-per-page-select
            :items-per-page="10"
            clickable-rows
            :active-page="activePage"
            @row-clicked="rowClicked"
            :pagination="{ doubleArrows: false, align: 'center'}"
            @page-change="pageChange"
          >
            <template #isAdmin="data">
              <td>
                <CBadge>
                  {{data.item.isAdmin ? 'Админ' : 'Пользователь'}}
                </CBadge>
              </td>
            </template>
          </CDataTable>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import axios from "@/plugin/axios"

export default {
  name: 'Users',
  data () {
    return {
      items: [],
      fields: [
        { key: 'firstName', label: 'Имя', _classes: 'font-weight-bold' },
        { key: 'email', label: 'Почта' },
        { key: 'phone', label: 'Телефон' },
        { key: 'isAdmin', label: 'Роль' },
      ],
      activePage: 1
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler (route) {
        if (route.query && route.query.page) {
          this.activePage = Number(route.query.page)
        }
      }
    }
  },
  created() {
    const data = JSON.parse(localStorage.getItem('login'))

    axios({
      method: 'GET',
      url: 'api/users/all',
      headers: {
        Authorization: data.token
      },
    })
        .then(res => {
          if (res.data.ok) {
            this.items = res.data.body
          }
        })
        .catch(() => {
          this.$router.push({name: 'Login'})
        })
  },
  methods: {
    rowClicked (item) {
      this.$router.push({path: `users/${item._id}`})
    },
    pageChange (val) {
      this.$router.push({ query: { page: val }})
    }
  }
}
</script>
