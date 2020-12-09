<template>
  <div>
    <CRow>
      <CCol sm="12">
        <CCard>
          <CCardBody>
            <CAlert v-if="alert.visible" :color="alert.type">
              {{ alert.msg }}
            </CAlert>

            <CTabs>
              <CTab title="Генетика" active>
                <CCard class="mt-3">
                  <CCardHeader>
                    Создать фильтр
                  </CCardHeader>

                  <CCardBody>
                    <CForm @submit="createNewGeneticsFilter">
                      <CRow>
                        <CCol sm="6">
                          <CInput class="mt-3" type="text" v-model="geneticsName.en" prepend="Имя на анг."/>
                        </CCol>

                        <CCol sm="6">
                          <CInput class="mt-3" type="text" v-model="geneticsName.ru" prepend="Имя на рус."/>
                        </CCol>
                      </CRow>

                      <CInput
                          class="mt-3"
                          type="text"
                          v-model="geneticsId"
                          prepend="Id"
                          description="Введите ключевые слова по которому будет производится поиск"/>

                      <CButton type="submit" size="md" color="dark">
                        Добавить
                      </CButton>
                    </CForm>
                  </CCardBody>
                </CCard>

                <CCard>
                  <CCardHeader>
                    Список фильтров
                  </CCardHeader>
                  <CCardBody>
                    <CDataTable
                        :items="geneticsItems"
                        :fields="fields"
                        :items-per-page="10"
                        hover
                        items-per-page-select
                        sorter
                        pagination
                    >
                      <template #name="{item}">
                        <td class="py-2">
                          <strong class="font-lg">{{ item.name.ru }}</strong>
                        </td>
                      </template>
                      <template #show_details="{item, index}">
                        <td class="py-2">
                          <CButton
                              color="primary"
                              variant="outline"
                              square
                              size="sm"
                              @click="toggleDetailsGenetics(item, index)"
                          >
                            {{ Boolean(item._toggled) ? 'Скрыть' : 'Показать' }}
                          </CButton>
                        </td>
                      </template>
                      <template #details="{item}">
                        <CCollapse :show="Boolean(item._toggled)" :duration="collapseDuration">
                          <CCardBody>
                            <CForm @submit="editGeneticsFilterHandler(item)">
                              <CRow>
                                <CCol sm="6">
                                  <CInput class="mt-3" type="text" v-model="item.name.en" prepend="Имя на анг."/>
                                </CCol>

                                <CCol sm="6">
                                  <CInput class="mt-3" type="text" v-model="item.name.ru" prepend="Имя на рус."/>
                                </CCol>
                              </CRow>

                              <CInput
                                  class="mt-3"
                                  type="text"
                                  v-model="item.filterId"
                                  prepend="Id"
                                  description="Введите ключевые слова по которому будет производится поиск"/>

                              <CButton type="submit" size="sm" color="info" class="">
                                Применить
                              </CButton>
                              <CButton @click="deleteGeneticsFilterHandler(item)" size="sm" color="danger" class="ml-1">
                                Удалить
                              </CButton>
                            </CForm>
                          </CCardBody>
                        </CCollapse>
                      </template>
                    </CDataTable>
                  </CCardBody>
                </CCard>
              </CTab>
              <CTab title="Вкус">
                <CCard class="mt-3">
                  <CCardHeader>
                    Создать фильтр
                  </CCardHeader>

                  <CCardBody>
                    <CForm @submit="createNewTasteFilter">
                      <CRow>
                        <CCol sm="6">
                          <CInput class="mt-3" type="text" v-model="tasteName.en" prepend="Имя на анг."/>
                        </CCol>

                        <CCol sm="6">
                          <CInput class="mt-3" type="text" v-model="tasteName.ru" prepend="Имя на рус."/>
                        </CCol>
                      </CRow>

                      <CRow>
                        <CCol sm="8">
                          <CTextarea
                              label="Иконка"
                              v-model.trim="tasteSvg"
                              placeholder="Вставте сюда svg код иконки..."
                              rows="6"
                          />
                        </CCol>

                        <CCol class="align-items-sm-center d-flex justify-content-center my-svg-custom" sm="4" v-html="tasteSvg" />
                      </CRow>

                      <CInput
                          class="mt-3"
                          type="text"
                          v-model="tasteId"
                          prepend="Id"
                          description="Введите ключевые слова по которому будет производится поиск"/>

                      <CButton type="submit" size="md" color="dark">
                        Добавить
                      </CButton>
                    </CForm>
                  </CCardBody>
                </CCard>

                <CCard>
                  <CCardHeader>
                    Список фильтров
                  </CCardHeader>
                  <CCardBody>
                    <CDataTable
                        :items="tasteItems"
                        :fields="fields"
                        :items-per-page="10"
                        hover
                        items-per-page-select
                        sorter
                        pagination
                    >
                      <template #name="{item}">
                        <td class="py-2">
                          <strong class="font-lg">{{ item.name.ru }}</strong>
                        </td>
                      </template>
                      <template #show_details="{item, index}">
                        <td class="py-2">
                          <CButton
                              color="primary"
                              variant="outline"
                              square
                              size="sm"
                              @click="toggleDetailsTaste(item, index)"
                          >
                            {{ Boolean(item._toggled) ? 'Скрыть' : 'Показать' }}
                          </CButton>
                        </td>
                      </template>
                      <template #details="{item}">
                        <CCollapse :show="Boolean(item._toggled)" :duration="collapseDuration">
                          <CCardBody>
                            <CForm @submit="editTasteFilterHandler(item)">
                              <CRow>
                                <CCol sm="6">
                                  <CInput class="mt-3" type="text" v-model="item.name.en" prepend="Имя на анг."/>
                                </CCol>

                                <CCol sm="6">
                                  <CInput class="mt-3" type="text" v-model="item.name.ru" prepend="Имя на рус."/>
                                </CCol>
                              </CRow>

                              <CRow>
                                <CCol sm="8">
                                  <CTextarea
                                      label="Иконка"
                                      v-model.trim="item.svg"
                                      placeholder="Вставте сюда svg код иконки..."
                                      rows="6"
                                  />
                                </CCol>

                                <CCol class="align-items-sm-center d-flex justify-content-center my-svg-custom" sm="4" v-html="item.svg" />
                              </CRow>

                              <CInput
                                  class="mt-3"
                                  type="text"
                                  v-model="item.filterId"
                                  prepend="Id"
                                  description="Введите ключевые слова по которому будет производится поиск"/>

                              <CButton type="submit" size="sm" color="info" class="">
                                Применить
                              </CButton>
                              <CButton @click="deleteTasteFilterHandler(item)" size="sm" color="danger" class="ml-1">
                                Удалить
                              </CButton>
                            </CForm>
                          </CCardBody>
                        </CCollapse>
                      </template>
                    </CDataTable>
                  </CCardBody>
                </CCard>
              </CTab>
              <CTab title="Эффект">
                <CCard class="mt-3">
                  <CCardHeader>
                    Создать фильтр
                  </CCardHeader>

                  <CCardBody>
                    <CForm @submit="createNewEffectFilter">
                      <CRow>
                        <CCol sm="6">
                          <CInput class="mt-3" type="text" v-model="effectName.en" prepend="Имя на анг."/>
                        </CCol>

                        <CCol sm="6">
                          <CInput class="mt-3" type="text" v-model="effectName.ru" prepend="Имя на рус."/>
                        </CCol>
                      </CRow>

                      <CRow>
                        <CCol sm="8">
                          <CTextarea
                              label="Иконка"
                              v-model.trim="effectSvg"
                              placeholder="Вставте сюда svg код иконки..."
                              rows="6"
                          />
                        </CCol>

                        <CCol class="align-items-sm-center d-flex justify-content-center my-svg-custom" sm="4" v-html="effectSvg" />
                      </CRow>

                      <CInput
                          class="mt-3"
                          type="text"
                          v-model="effectId"
                          prepend="Id"
                          description="Введите ключевые слова по которому будет производится поиск"/>

                      <CButton type="submit" size="md" color="dark">
                        Добавить
                      </CButton>
                    </CForm>
                  </CCardBody>
                </CCard>

                <CCard>
                  <CCardHeader>
                    Список фильтров
                  </CCardHeader>
                  <CCardBody>
                    <CDataTable
                        :items="effectItems"
                        :fields="fields"
                        :items-per-page="10"
                        hover
                        items-per-page-select
                        sorter
                        pagination
                    >
                      <template #name="{item}">
                        <td class="py-2">
                          <strong class="font-lg">{{ item.name.ru }}</strong>
                        </td>
                      </template>
                      <template #show_details="{item, index}">
                        <td class="py-2">
                          <CButton
                              color="primary"
                              variant="outline"
                              square
                              size="sm"
                              @click="toggleDetailsEffect(item, index)"
                          >
                            {{ Boolean(item._toggled) ? 'Скрыть' : 'Показать' }}
                          </CButton>
                        </td>
                      </template>
                      <template #details="{item}">
                        <CCollapse :show="Boolean(item._toggled)" :duration="collapseDuration">
                          <CCardBody>
                            <CForm @submit="editEffectFilterHandler(item)">
                              <CRow>
                                <CCol sm="6">
                                  <CInput class="mt-3" type="text" v-model="item.name.en" prepend="Имя на анг."/>
                                </CCol>

                                <CCol sm="6">
                                  <CInput class="mt-3" type="text" v-model="item.name.ru" prepend="Имя на рус."/>
                                </CCol>
                              </CRow>

                              <CRow>
                                <CCol sm="8">
                                  <CTextarea
                                      label="Иконка"
                                      v-model.trim="item.svg"
                                      placeholder="Вставте сюда svg код иконки..."
                                      rows="6"
                                  />
                                </CCol>

                                <CCol class="align-items-sm-center d-flex justify-content-center my-svg-custom" sm="4" v-html="item.svg" />
                              </CRow>

                              <CInput
                                  class="mt-3"
                                  type="text"
                                  v-model="item.filterId"
                                  prepend="Id"
                                  description="Введите ключевые слова по которому будет производится поиск"/>

                              <CButton type="submit" size="sm" color="info" class="">
                                Применить
                              </CButton>
                              <CButton @click="deleteEffectFilterHandler(item)" size="sm" color="danger" class="ml-1">
                                Удалить
                              </CButton>
                            </CForm>
                          </CCardBody>
                        </CCollapse>
                      </template>
                    </CDataTable>
                  </CCardBody>
                </CCard>
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

const fields = [
  {key: 'name', label: 'Имя фильтра', _style: 'min-width:200px', _classes: 'font-weight-bold'},
  {key: 'filterId', label: 'Id фильтра'},
  {
    key: 'show_details',
    label: '',
    _style: 'width:1%',
    sorter: false,
    filter: false
  }
]

export default {
  name: 'Filters',
  data: () => ({
    details: [],
    collapseDuration: 0,

    geneticsName: {
      ru: '',
      en: ''
    },

    geneticsId: '',
    geneticsItems: [],
    fields,

    tasteName: {
      ru: '',
      en: ''
    },

    tasteSvg: '',
    tasteId: '',
    tasteItems: [],

    effectName: {
      ru: '',
      en: ''
    },

    effectSvg: '',
    effectId: '',
    effectItems: [],

    alert: {
      visible: false,
      msg: '',
      type: ''
    }
  }),
  watch: {
    geneticsId() {
      this.geneticsId = this.id(this.geneticsId)
    },
    tasteId() {
      this.tasteId = this.id(this.tasteId)
    },
    effectId() {
      this.effectId = this.id(this.effectId)
    }
  },
  created() {
    axios({method: 'GET', url: 'api/filters/genetics'})
        .then(res => {
          if (res.data.ok) {
            this.geneticsItems = res.data.body.map((item, id) => {
              return {...item, id}
            })
          }
        })
        .catch(() => {
          this.$router.push({name: 'Login'})
        })

    axios({method: 'GET', url: 'api/filters/tastes'})
        .then(res => {
          if (res.data.ok) {
            this.tasteItems = res.data.body.map((item, id) => {
              return {...item, id}
            })
          }
        })
        .catch(() => {
          this.$router.push({name: 'Login'})
        })

    axios({method: 'GET', url: 'api/filters/effects'})
        .then(res => {
          if (res.data.ok) {
            this.effectItems = res.data.body.map((item, id) => {
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

    // Create
    createNewGeneticsFilter() {
      if (!this.geneticsName.ru || !this.geneticsName.en || !this.geneticsId) {
        this.alertHandler('Форма не валидна', true)
        return
      }

      const data = JSON.parse(localStorage.getItem('login'))

      const formData = {
        name: this.geneticsName,
        filterId: this.geneticsId
      }

      axios({
        method: 'POST',
        url: 'api/filters/genetics',
        headers: {
          Authorization: data.token
        },
        data: formData
      })
          .then(res => {
            if (res.data.ok) {
              this.alertHandler(res.data.msg, false)
              this.geneticsItems.push({...res.data.body, id: this.geneticsItems.length})

              this.geneticsName.ru = ''
              this.geneticsName.en = ''
              this.geneticsId = ''
            } else {
              this.alertHandler('Сервер вернул ошибку, проверте консоль, Нажмите F12', true)
              console.log(res.data)
            }
          })
          .catch(() => {
            this.$router.push({name: 'Login'})
            localStorage.removeItem('login')
          })
    },
    createNewTasteFilter() {
      if (!this.tasteName.ru || !this.tasteName.en || !this.tasteId || !this.tasteSvg) {
        this.alertHandler('Форма не валидна', true)
        return
      }

      const data = JSON.parse(localStorage.getItem('login'))

      const formData = {
        name: this.tasteName,
        svg: this.tasteSvg,
        filterId: this.tasteId
      }

      axios({
        method: 'POST',
        url: 'api/filters/tastes',
        headers: {
          Authorization: data.token
        },
        data: formData
      })
          .then(res => {
            if (res.data.ok) {
              this.alertHandler(res.data.msg, false)
              this.tasteItems.push({...res.data.body, id: this.tasteItems.length})

              this.tasteName.ru = ''
              this.tasteName.en = ''
              this.tasteId = ''
              this.tasteSvg = ''
            } else {
              this.alertHandler('Сервер вернул ошибку, проверте консоль, Нажмите F12', true)
              console.log(res.data)
            }
          })
          .catch(() => {
            this.$router.push({name: 'Login'})
            localStorage.removeItem('login')
          })
    },
    createNewEffectFilter() {
      if (!this.effectName.ru || !this.effectName.en || !this.effectId || !this.effectSvg) {
        this.alertHandler('Форма не валидна', true)
        return
      }

      const data = JSON.parse(localStorage.getItem('login'))

      const formData = {
        name: this.effectName,
        svg: this.effectSvg,
        filterId: this.effectId
      }

      axios({
        method: 'POST',
        url: 'api/filters/effects',
        headers: {
          Authorization: data.token
        },
        data: formData
      })
          .then(res => {
            if (res.data.ok) {
              this.alertHandler(res.data.msg, false)
              this.effectItems.push({...res.data.body, id: this.effectItems.length})

              this.effectName.ru = ''
              this.effectName.en = ''
              this.effectSvg = ''
              this.effectId = ''
            } else {
              this.alertHandler('Сервер вернул ошибку, проверте консоль, Нажмите F12', true)
              console.log(res.data)
            }
          })
          .catch(() => {
            this.$router.push({name: 'Login'})
            localStorage.removeItem('login')
          })
    },

    // Edit
    editGeneticsFilterHandler (item) {
      const data = JSON.parse(localStorage.getItem('login'))

      axios({
        method: 'PUT',
        url: `api/filters/genetics/${item._id}`,
        headers: {
          Authorization: data.token
        },
        data: item
      })
          .then(res => {
            if (res.data.ok) {
              this.alertHandler(res.data.msg, false)
              this.toggleDetailsGenetics(item)
            } else {
              this.alertHandler('Сервер вернул ошибку, проверте консоль, Нажмите F12', true)
              console.log(res.data)
            }
          })
    },
    editTasteFilterHandler (item) {
      const data = JSON.parse(localStorage.getItem('login'))

      axios({
        method: 'PUT',
        url: `api/filters/tastes/${item._id}`,
        headers: {
          Authorization: data.token
        },
        data: item
      })
          .then(res => {
            if (res.data.ok) {
              this.alertHandler(res.data.msg, false)
              this.toggleDetailsTaste(item)
            } else {
              this.alertHandler('Сервер вернул ошибку, проверте консоль, Нажмите F12', true)
              console.log(res.data)
            }
          })
    },
    editEffectFilterHandler (item) {
      const data = JSON.parse(localStorage.getItem('login'))

      axios({
        method: 'PUT',
        url: `api/filters/effects/${item._id}`,
        headers: {
          Authorization: data.token
        },
        data: item
      })
          .then(res => {
            if (res.data.ok) {
              this.alertHandler(res.data.msg, false)
              this.toggleDetailsEffect(item)
            } else {
              this.alertHandler('Сервер вернул ошибку, проверте консоль, Нажмите F12', true)
              console.log(res.data)
            }
          })
    },

    // Delete
    deleteGeneticsFilterHandler (item) {
      const data = JSON.parse(localStorage.getItem('login'))

      axios({
        method: 'DELETE',
        url: `api/filters/genetics/${item._id}`,
        headers: {
          Authorization: data.token
        },
        data: item
      })
          .then(res => {
            if (res.data.ok) {
              this.alertHandler(res.data.msg, false)
              this.geneticsItems = this.geneticsItems.filter(filter => filter._id !== item._id)
              this.toggleDetailsGenetics(item)
            } else {
              this.alertHandler('Сервер вернул ошибку, проверте консоль, Нажмите F12', true)
              console.log(res.data)
            }
          })
    },
    deleteTasteFilterHandler (item) {
      const data = JSON.parse(localStorage.getItem('login'))

      axios({
        method: 'DELETE',
        url: `api/filters/tastes/${item._id}`,
        headers: {
          Authorization: data.token
        },
        data: item
      })
          .then(res => {
            if (res.data.ok) {
              this.alertHandler(res.data.msg, false)
              this.tasteItems = this.tasteItems.filter(filter => filter._id !== item._id)
              this.toggleDetailsTaste(item)
            } else {
              this.alertHandler('Сервер вернул ошибку, проверте консоль, Нажмите F12', true)
              console.log(res.data)
            }
          })
    },
    deleteEffectFilterHandler (item) {
      const data = JSON.parse(localStorage.getItem('login'))

      axios({
        method: 'DELETE',
        url: `api/filters/effects/${item._id}`,
        headers: {
          Authorization: data.token
        },
        data: item
      })
          .then(res => {
            if (res.data.ok) {
              this.alertHandler(res.data.msg, false)
              this.effectItems = this.effectItems.filter(filter => filter._id !== item._id)
              this.toggleDetailsEffect(item)
            } else {
              this.alertHandler('Сервер вернул ошибку, проверте консоль, Нажмите F12', true)
              console.log(res.data)
            }
          })
    },

    // Toggle
    toggleDetailsGenetics(item) {
      this.$set(this.geneticsItems[item.id], '_toggled', !item._toggled)
      this.collapseDuration = 300
      this.$nextTick(() => {
        this.collapseDuration = 0
      })
    },
    toggleDetailsTaste(item) {
      this.$set(this.tasteItems[item.id], '_toggled', !item._toggled)
      this.collapseDuration = 300
      this.$nextTick(() => {
        this.collapseDuration = 0
      })
    },
    toggleDetailsEffect(item) {
      this.$set(this.effectItems[item.id], '_toggled', !item._toggled)
      this.collapseDuration = 300
      this.$nextTick(() => {
        this.collapseDuration = 0
      })
    },
  }
}
</script>

<style lang="scss">
.my-svg-custom {

  svg {
    width: 100px;
    height: 100px;
  }
}
</style>
