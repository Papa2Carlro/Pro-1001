<template>
  <CRow>
    <CCol col="12" xl="12">
      <CCard>
        <CCardHeader>
          Список товаров
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
            <template #visible="data">
              <td>
                {{ data.item.visible ? 'Видимо' : 'Скрыто' }}
              </td>
            </template>
            <template #price="data">
              <td>
                  {{ data.item.price.uah }} грн.
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
import config from "@/config/config"

export default {
  name: 'Products',
  data() {
    return {
      items: [],
      fields: [
        {key: 'name', label: 'Название товара', _classes: 'font-weight-bold'},
        {key: 'price', label: 'Цена'},
        {key: 'visible', label: 'Видимость'},
        {key: 'popularity', label: 'Колл. покупок'},
      ],
      activePage: 1
    }
  },
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
    axios({method: 'GET', url: 'api/products/all',})
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
    getUrl(url) {
      return config.url + url
    },
    rowClicked(item) {
      this.$router.push({path: `products/product/${item._id}`})
    },
    pageChange(val) {
      this.$router.push({query: {page: val}})
    }
  }
}
</script>
