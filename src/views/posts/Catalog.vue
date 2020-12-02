<template>
  <CRow>
    <CCol col="12" xl="12">
      <CCard>
        <CCardHeader>
          Список постов
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
            <template #title="data">
              <td>
                {{ data.item.title.ru }}
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
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import axios from "@/plugin/axios"
import DataFilter from '@/filters/date.filter'

export default {
  name: 'Users',
  data() {
    return {
      items: [],
      fields: [
        {key: 'title', label: 'Заголовок'},
        {key: 'category', label: 'Категория', _classes: 'font-weight-bold'},
        {key: 'author', label: 'Автор'},
        {key: 'timeStamp', label: 'Дата создания'},
      ],
      activePage: 1
    }
  },
  filters: {DataFilter},
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        if (route.query && route.query.page) {
          this.activePage = Number(route.query.page)
        }
      }
    }
  },
  created() {
    axios({
      method: 'GET',
      url: 'api/post/all',
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
    rowClicked(item) {
      this.$router.push({path: `posts/post/${item._id}`})
    },
    pageChange(val) {
      this.$router.push({query: {page: val}})
    }
  }
}
</script>
