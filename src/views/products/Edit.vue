<template>
  <CCol xs="12" lg="12">
    <CCard>
      <CCardHeader>
        Редактировать Товар
      </CCardHeader>
      <CCardBody>
        <CAlert v-if="alert.visible" :color="alert.type">
          {{ alert.msg }}
        </CAlert>

        <CRow v-if="!visible" class="my-3 justify-content-between">
          <CCol sm="8">
            <h4>Этот продукт сейчас не отображается в катаготе товаров на сайте</h4>
          </CCol>

          <CCol sm="2">
            <CButton @click="disableProductHandler(true)" size="md" class="ml-2" color="info">Открыть видимость</CButton>
          </CCol>
        </CRow>

        <CForm @submit="editProductHandler">
          <CTabs>
            <CTab title="Основная информация" active>
              <CInput
                  type="text"
                  v-model="name"
                  class="mt-2"
                  label="Название продукта"
                  placeholder="Введите название..."
                  required
              />

              <CRow>
                <CCol sm="6" md="3">
                  <CInput
                      type="number"
                      v-model="price.uah"
                      class="mt-2"
                      step="0.01"
                      append="₴"
                      label="Цена продукта UAH"
                      placeholder="Введите цену..."
                      required
                  />
                </CCol>

                <CCol sm="6" md="3">
                  <CInput
                      type="number"
                      v-model="price.usd"
                      class="mt-2"
                      step="0.01"
                      append="$"
                      label="Цена продукта USD"
                      placeholder="Введите цену..."
                      required
                  />
                </CCol>

                <CCol sm="6" md="3">
                  <CInput
                      type="number"
                      v-model="newPrice.uah"
                      class="mt-2"
                      step="0.01"
                      append="₴"
                      label="Цена по скидке UAH"
                      placeholder="Введите цену..."
                  />
                </CCol>

                <CCol sm="6" md="3">
                  <CInput
                      type="number"
                      v-model="newPrice.usd"
                      class="mt-2"
                      step="0.01"
                      append="$"
                      label="Цена по скидке USD"
                      placeholder="Введите цену..."
                  />
                </CCol>
              </CRow>

              <CRow class="mt-3">
                <CCol sm="6">
                  <CInput
                      type="text"
                      v-model="manufacturer"
                      class="mt-2"
                      min="1"
                      label="Произодитель"
                      placeholder="Введите произодителя..."
                      required
                  />
                </CCol>

                <CCol sm="6">
                  <CSelect
                      label="Тип Сорт"
                      size="md"
                      class="mt-2"
                      :value.sync="variety"
                      :options="optionsVariety"
                      placeholder="Выберете сорт"
                  />
                </CCol>

                <CCol sm="6">
                  <CSelect
                      label="Генетика"
                      size="md"
                      :value.sync="genetics"
                      :options="geneticsVariety"
                      placeholder="Выберете генетику"
                  />
                </CCol>

                <CCol sm="6">
                  <p class="mb-2">Терпены</p>
                  <CDropdown
                      togglerText="Выберете терпены"
                      color="light"
                  >
                    <CDropdownItem v-for="option in tasteVariety" @click="tasteHandler(option)" class="item" :key="option.value"
                                   :class="{isActive: option.isActive}">
                      {{ option.label }}
                    </CDropdownItem>
                  </CDropdown>
                </CCol>

                <CCol sm="6">
                  <CSelect
                      label="Тип цветения"
                      size="md"
                      :value.sync="bloom"
                      :options="bloomVariety"
                      placeholder="Выберете тип цветения"
                  />
                </CCol>

                <CCol sm="6">
                  <p class="mb-2">Эффекты</p>
                  <CDropdown
                      togglerText="Выберете эффекты"
                      color="light"
                  >
                    <CDropdownItem v-for="option in effectVariety" @click="effectHandler(option)" class="item" :key="option.value"
                                   :class="{isActive: option.isActive}">
                      {{ option.label }}
                    </CDropdownItem>
                  </CDropdown>
                </CCol>

                <CCol sm="6">
                  <CSelect
                      label="Пол"
                      size="md"
                      :value.sync="fem"
                      :options="femVariety"
                      placeholder="Выберете пол, насколько я понял..."
                  />
                </CCol>

                <CCol sm="6">
                  <CSelect
                      label="Место выращивания"
                      size="md"
                      :value.sync="place"
                      :options="placeVariety"
                      placeholder="Выберете место выращивания..."
                  />
                </CCol>

                <CCol sm="3">
                  <CInput
                      type="number"
                      v-model="flowering.from"
                      min="1"
                      label="Цветение от"
                      prepend="От"
                      required
                  />
                </CCol>

                <CCol sm="3">
                  <CInput
                      type="number"
                      v-model="flowering.to"
                      min="1"
                      label="Цветение до"
                      prepend="До"
                      required
                  />
                </CCol>

                <CCol sm="3">
                  <CInput
                      type="number"
                      v-model="productivity.from"
                      min="1"
                      label="Продуктивность от"
                      prepend="От"
                      required
                  />
                </CCol>

                <CCol sm="3">
                  <CInput
                      type="number"
                      v-model="productivity.to"
                      min="1"
                      label="Продуктивность до"
                      prepend="До"
                      append="mg2"
                      required
                  />
                </CCol>

                <CCol sm="3">
                  <CInput
                      type="number"
                      v-model="thc.from"
                      min="1"
                      label="Содержание ТГК"
                      append="%"
                      required
                  />
                </CCol>

                <CCol sm="3">
                  <CInput
                      type="number"
                      v-model="thc.to"
                      min="1"
                      label="Содержание ТГК до"
                      append="%"
                  />
                </CCol>

                <CCol sm="3">
                  <CInput
                      type="number"
                      v-model="harvest.from"
                      min="1"
                      label="Урожайность от"
                      prepend="От"
                      append="-"
                      required
                  />
                </CCol>

                <CCol sm="3">
                  <CInput
                      type="number"
                      v-model="harvest.to"
                      min="1"
                      label="Урожайность до"
                      append="Дней"
                      step="0.1"
                  />
                </CCol>

                <CCol sm="6">
                  <CSelect
                      label="Урожайность для фильтрации"
                      size="md"
                      :value.sync="harvestFilter"
                      :options="harvestVariety"
                      placeholder="Выберете урожайность"
                  />
                </CCol>

                <CCol sm="3">
                  <CInput
                      type="number"
                      v-model="height.from"
                      min="40"
                      max="220"
                      label="Высота от"
                      prepend="От"
                      append="см."
                      required
                  />
                </CCol>

                <CCol sm="3">
                  <CInput
                      type="number"
                      v-model="height.to"
                      min="40"
                      max="220"
                      prepend="До"
                      label="Высота"
                      append="см."
                  />
                </CCol>

                <CCol sm="4">
                  <CSelect
                      label="Екслюзив"
                      size="md"
                      :value.sync="exclusive"
                      :options="exclusiveVariety"
                  />
                </CCol>
              </CRow>

            </CTab>

            <CTab title="Фото">
              <CRow>
                <CCol xs="12" md="6">

                  <p class="mt-3"><strong>Превью товара</strong></p>

                  <CImg
                      v-if="mainPhoto"
                      :src="getUrl(mainPhoto)"
                      block
                      fluid
                      class="mb-2"
                  />

                  <CInputFile
                      label="Превью"
                      custom
                      horizontal
                      @change="uploadMainPhotoHandler"
                  />
                </CCol>

                <CCol xs="12" md="6">
                  <p class="mt-3"><strong>Изображения</strong></p>

                  <div class="mt-4">
                    <div v-for="image in images" :key="image">

                      <CImg
                          :src="getUrl(image)"
                          block
                          fluid
                          class="mb-2"
                      />

                      <CButton @click="deleteImageHandler(image)" class="mb-3" size="md" color="danger">Удалить
                      </CButton>
                    </div>


                    <CInputFile custom @change="uploadImagesHandler"/>
                  </div>
                </CCol>
              </CRow>
            </CTab>

            <CTab title="Описание">
              <CRow>
                <CCol xs="12" md="12">

                  <p class="mt-3"><strong>Описание продукта</strong></p>

                  <CTabs class="mt-3" :vertical="vertical">
                    <CTab active>
                      <template slot="title">
                        <CIcon :width="30" :content="$options.ru"/>
                      </template>

                      <ckeditor :editor="editor" v-model="editorData.ru"></ckeditor>
                    </CTab>

                    <CTab>
                      <template slot="title">
                        <CIcon :width="30" :content="$options.en"/>
                      </template>

                      <ckeditor :editor="editor" v-model="editorData.en"></ckeditor>
                    </CTab>
                  </CTabs>

                </CCol>

                <CCol xs="12" md="6">

                  <p class="mt-3"><strong>Изображение</strong></p>

                  <CImg
                      v-if="descriptionPhoto"
                      :src="getUrl(descriptionPhoto)"
                      block
                      fluid
                      class="mb-2"
                  />

                  <CRow>
                    <CCol xs="12" :md="descriptionPhoto ? 9 : 12">
                      <CInputFile
                          class="w-100"
                          custom
                          horizontal
                          @change="uploadDescriptionPhotoHandler"
                      />
                    </CCol>

                    <CCol v-if="descriptionPhoto" md="3">
                      <CButton @click="descriptionPhoto = ''" class="mb-3 w-100" size="md" color="danger">Удалить</CButton>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
            </CTab>

            <CTab title="Комментарии">
              <CDataTable
                  :items="comments"
                  :fields="fields"
                  :items-per-page="10"
                  hover
                  table-filter
                  items-per-page-select
                  sorter
                  pagination
              >
                <template #author="{item}">
                  <td class="py-2">
                    <router-link :to="`/users/${item.author._id}`">
                      {{ item.author.name }}
                    </router-link>
                  </td>
                </template>
                <template #delete="{item}">
                  <td class="py-2">
                    <CButton
                        color="danger"
                        square
                        size="sm"
                        @click="deleteComment(item._id)"
                    >
                      Удалить
                    </CButton>
                  </td>
                </template>
              </CDataTable>
            </CTab>
          </CTabs>

          <CRow>
            <CCol class="btn mt-3">
              <CButton type="submit" size="md" color="success">Сохранить</CButton>
              <CButton @click="removeProductHandler" size="md" class="ml-2" color="danger">Удалить</CButton>
              <CButton v-if="visible" @click="disableProductHandler(false)" size="md" class="ml-2" color="info">Спрятать</CButton>
              <CButton @click="$router.go(-1)" size="md" class="ml-4" color="dark">Отменить</CButton>
            </CCol>
          </CRow>
        </CForm>
      </CCardBody>
    </CCard>
  </CCol>
</template>

<script>
import axios from "@/plugin/axios"
import config from "@/config/config"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import flag from '@/mixins/flag.mixin'

const fields = [
  {key: 'author', label: 'Пользователь', _classes: 'font-weight-bold'},
  {key: 'rate', label: 'Оценка', _classes: 'font-weight-bold'},
  {key: 'body', label: 'Коментарий', _style: 'min-width: 400px', _classes: 'font-weight-bold'},
  {
    key: 'delete',
    label: '',
    _style: 'width:1%',
    sorter: false,
    filter: false
  }
]

export default {
  name: 'EditPost',
  mixins: [flag],
  data: () => ({
    vertical: {navs: 'col-md-1', content: 'col-md-11'},
    editor: ClassicEditor,
    editorData: {},

    fields,
    details: [],
    collapseDuration: 0,

    name: '',
    price: {},
    newPrice: {},

    // General
    manufacturer: '',
    variety: '',
    flowering: {},
    productivity: {},
    harvest: {},
    thc: undefined,
    genetics: '',
    bloom: '',
    fem: '',
    place: '',
    taste: [],
    effect: '',
    height: {
      from: '',
      to: ''
    },
    harvestFilter: '',
    exclusive: undefined,
    heightFilter: '',
    visible: undefined,
    comments: [],

    mainPhoto: '',
    descriptionPhoto: '',

    images: [],

    // Select
    optionsVariety: [],
    geneticsVariety: [],
    tasteVariety: [],
    effectVariety: [],
    harvestVariety: [
      {value: 'low', label: 'Невысокая'},
      {value: 'average', label: 'Средняя'},
      {value: 'high', label: 'Высокая'}
    ],
    bloomVariety: [
      {value: 'auto flowering', label: 'Автоцветущия'},
      {value: 'photo flowering', label: 'Фотоцветущия'}
    ],
    femVariety: [
      {value: 'autofeminized', label: 'Авто Феминизированные'},
      {value: 'feminized', label: 'Феминизированные'}
    ],
    placeVariety: [
      {value: 'indoor', label: 'В помещении'},
      {value: 'outdoor', label: 'На открытой местности'}
    ],
    exclusiveVariety: [
      {value: false, label: 'Нет'},
      {value: true, label: 'Да'}
    ],

    alert: {
      visible: false,
      msg: '',
      type: ''
    }
  }),
  created() {
    const data = JSON.parse(localStorage.getItem('login'))

    axios({method: 'GET', url: 'api/filters/genetics'})
        .then(res => {
          if (res.data.ok) {
            this.geneticsVariety = res.data.body.map(item => {
              return {value: item.filterId, label: item.name.en}
            })
          }
        })

    axios({method: 'GET', url: 'api/filters/tastes'})
        .then(res => {
          if (res.data.ok) {
            this.tasteVariety = res.data.body.map(item => {
              return {value: item.filterId, label: item.name.ru, isActive: false}
            })
          }
        })

    axios({method: 'GET', url: 'api/filters/effects'})
        .then(res => {
          if (res.data.ok) {
            this.effectVariety = res.data.body.map(item => {
              return {value: item.filterId, label: item.name.ru, isActive: false}
            })
          }
        })

    axios({method: 'GET', url: 'api/filters/variety'})
        .then(res => {
          if (res.data.ok) {
            this.optionsVariety = res.data.body.map(item => {
              return {value: item.filterId, label: item.name.ru}
            })
          }
        })

    axios({
      method: 'GET',
      url: `api/products/all/${this.$route.params.id}`,
      headers: {
        Authorization: data.token
      }
    })
        .then(res => {
          if (res.data.ok) {
            const data = res.data.body
            const dataGeneral = data.general

            this.name = data.name
            this.id = data._id
            this.visible = data.visible
            this.price = data.price
            this.newPrice = data.newPrice

            data.comments.map((item, index) => this.comments.push({...item, id: index}))

            // General
            this.manufacturer = dataGeneral.manufacturer
            this.variety = dataGeneral.variety
            this.flowering = dataGeneral.flowering
            this.productivity = dataGeneral.productivity
            this.harvest.from = dataGeneral.harvest.from
            this.harvest.to = dataGeneral.harvest.to
            this.thc = dataGeneral.thc
            this.genetics = dataGeneral.genetics
            this.bloom = dataGeneral.bloom
            this.fem = dataGeneral.fem
            this.place = dataGeneral.place
            this.taste = dataGeneral.taste
            this.tasteVariety.map(filter => {
              const [item] = this.taste.filter(item => item === filter.value)

              if(item) { filter.isActive = true }
            })

            this.effect = dataGeneral.effect
            this.effectVariety.map(filter => {
              const [item] = this.effect.filter(item => item === filter.value)

              if(item) { filter.isActive = true }
            })

            this.height.from = dataGeneral.height.sm.includes('-') ? dataGeneral.height.sm.split('-')[0] : dataGeneral.height.sm
            this.height.to = dataGeneral.height.sm.includes('-') ? dataGeneral.height.sm.split('-')[1] : ''
            this.harvestFilter = dataGeneral.harvest.filter

            this.editorData = data.description.html
            this.descriptionPhoto = data.description.image

            this.mainPhoto = data.pictures[0]
            data.pictures.map((photo, index) => {
              if (index !== 0) {
                this.images.push(photo)
              }
            })
          } else {
            console.log(res.data)
          }
        })
        .catch(err => {
          console.log(err)
        })
  },
  methods: {
    async tasteHandler(taste) {
      await this.tasteVariety.map(item => {
        if (item.value === taste.value) {
          if (item.isActive) {
            item.isActive = false
            this.taste = this.taste.filter(filter => filter !== item.value)
          } else {
            item.isActive = true
            this.taste.push(item.value)
          }
        }
      })
    },
    async effectHandler(effect) {
      await this.effectVariety.map(item => {
        if (item.value === effect.value) {
          if (item.isActive) {
            item.isActive = false
            this.effect = this.effect.filter(filter => filter !== item.value)
          } else {
            item.isActive = true
            this.effect.push(item.value)
          }
        }
      })
    },

    disableProductHandler (bool) {
      const data = JSON.parse(localStorage.getItem('login'))

      axios({
        method: 'PATCH',
        url: `api/products/${this.$route.params.id}`,
        headers: {
          Authorization: data.token
        },
        data: {visible: bool}
      })
          .then(res => {
            if(res.data.ok) {
              this.visible = bool
            }
          })
          .catch(err => {
            this.alertHandler('Произошла неизвестная ошибка, проверте консоль, Нажмите F12', true)
            console.log(err)
          })
    },
    async uploadMainPhotoHandler(event) {
      let formData = new FormData();
      formData.append('image', event[0]);

      this.mainPhoto = await this.addImageHandler(formData)
    },
    async uploadImagesHandler(event) {
      let formData = new FormData();
      formData.append('image', event[0]);

      this.images.push(await this.addImageHandler(formData))
    },

    deleteImageHandler(item) {
      this.images = this.images.filter(image => item !== image)
    },

    addImageHandler(formData) {
      return axios({
        method: 'POST',
        url: '/api/image',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
          .then(res => {
            if (res.data.ok) {
              return res.data.image
            }
          })
          .catch(err => {
            console.log(err)
          })
    },
    getUrl(url) {
      return config.url + url
    },
    checkEmpty() {
      return !this.name
          || !this.price.uah
          || !this.price.usd
          || !this.manufacturer
          || !this.variety
          || !this.flowering.from
          || !this.flowering.to
          || !this.productivity.to
          || !this.productivity.from
          || !this.harvest.to
          || !this.harvest.from
          || !this.genetics
          || !this.harvestFilter
          || !this.bloom
          || !this.fem
          || !this.place
          || this.taste.length === 0
          || !this.effect
          || !this.height.from
    },

    alertHandler(msg, error) {
      this.alert.visible = true
      this.alert.msg = msg
      this.alert.type = error ? 'danger' : 'success'

      setTimeout(() => this.alert.visible = false, 5000)
    },
    filterHeight() {
      if (this.height.to) {
        if (this.height.to >= 40 && this.height.to < 80) {
          return 'small'
        } else if (this.height.to >= 80 && this.height.to < 160) {
          return 'medium'
        } else if (this.height.to >= 160 && this.height.to <= 220) {
          return 'big'
        }
      } else {
        if (this.height.from >= 40 && this.height.from < 80) {
          return 'small'
        } else if (this.height.from >= 80 && this.height.from < 160) {
          return 'medium'
        } else if (this.height.from >= 160 && this.height.from <= 220) {
          return 'big'
        }
      }
    },
    filterPower() {
      if (10 >= this.thc.from) {
        return 'for newbies'
      } else if (this.thc.from > 10 && this.thc.from <= 15) {
        return 'light'
      } else if (this.thc.from > 15 && this.thc.from <= 20) {
        return 'normal'
      } else if (this.thc.from > 20) {
        return 'strong'
      }
    },

    editProductHandler() {
      const data = JSON.parse(localStorage.getItem('login'))

      if (this.checkEmpty()) {
        this.alertHandler('Форма не валидна', true)
        return
      }

      const formData = {
        name: this.name,
        price: this.price,
        newPrice: this.newPrice,
        pictures: [
          this.mainPhoto,
          ...this.images
        ],
        general: {
          manufacturer: this.manufacturer,
          variety: this.variety,
          flowering: this.flowering,
          productivity: this.productivity,
          genetics: this.genetics,
          harvest: {
            filter: this.harvestFilter,
            ...this.harvest
          },
          bloom: this.bloom,
          thc: this.thc,
          power: this.filterPower(),
          fem: this.fem,
          place: this.place,
          taste: this.taste,
          effect: this.effect,
          height: {
            sm: `${this.height.from}-${this.height.to}`,
            filter: this.filterHeight()
          },
          exclusive: this.exclusive
        },
        description: {
          html: this.editorData,
          image: this.descriptionPhoto
        }
      }

      axios({
        method: 'PUT',
        url: `api/products/${this.$route.params.id}`,
        headers: {
          Authorization: data.token
        },
        data: formData
      })
          .then(res => {
            console.log(res.data)
            if (res.data.ok) {
              this.alertHandler(res.data.msg, false)

              setTimeout(() => this.$router.go(-1), 2000)
            } else {
              this.alertHandler(res.data.msg, true)
              console.log(res.data)
            }
          })
          .catch(() => {
            this.$router.push({name: 'Login'})
            localStorage.removeItem('login')
          })
    },

    removeProductHandler () {
      const data = JSON.parse(localStorage.getItem('login'))

      axios({
        method: 'DELETE',
        url: `api/products/${this.$route.params.id}`,
        headers: {
          Authorization: data.token
        },
      })
          .then(res => {
            if (res.data.ok) {
              this.alertHandler(res.data.msg, false)

              setTimeout(() => this.$router.go(-1), 1500)
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

    deleteComment(_id) {
      const data = JSON.parse(localStorage.getItem('login'))

      axios({
        method: 'POST',
        url: `api/products/comments/delete/${this.$route.params.id}`,
        headers: {
          Authorization: data.token
        },
        data: {_id}
      })
          .then(res => {
            if (res.data.ok) {
              this.comments = this.comments.filter(comment => comment._id !== _id)
            }
          })
    }
  }
}
</script>

<style scoped>
.btn {
  display: flex;
  justify-content: flex-end;
}
.item:active {
  background: transparent;
}
.isActive {
  background: #321fdb !important;
  color: #fff !important;
}
</style>
