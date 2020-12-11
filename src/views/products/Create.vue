<template>
  <CCol xs="12" lg="12">
    <CCard>
      <CCardHeader>
        Создать Товар
      </CCardHeader>
      <CCardBody>
        <CAlert v-if="alert.visible" :color="alert.type">
          {{ alert.msg }}
        </CAlert>

        <CForm @submit="createProductHandler">
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
                      append="₴"
                      step="0.01"
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
                      label="Тип Сорта"
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
                      :show.sync="show"
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
                      label="Эффект"
                      size="md"
                      :value.sync="effect"
                      :options="effectVariety"
                      placeholder="Выберете эффект"
                  />
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
                      append="Месяцев"
                      step="0.1"
                      required
                  />
                </CCol>

                <CCol sm="3">
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
                      v-model="yieldStr"
                      min="1"
                      label="Колл. грамм на штамм"
                      append="гр."
                      required
                  />
                </CCol>

                <CCol sm="4">
                  <CInput
                      type="number"
                      v-model="height"
                      min="40"
                      max="220"
                      label="Высота"
                      append="см."
                      required
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
                      <CButton @click="descriptionPhoto = ''" class="mb-3 w-100" size="md" color="danger">Удалить
                      </CButton>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
            </CTab>
          </CTabs>

          <CRow>
            <CCol class="btn mt-3">
              <CButton type="submit" size="md" color="success">Сохранить</CButton>
              <CButton @click="$router.go(-1)" size="md" class="ml-2" color="dark">Отменить</CButton>
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

export default {
  name: 'CreatePost',
  mixins: [flag],
  data: () => ({
    vertical: {navs: 'col-md-1', content: 'col-md-11'},

    editor: ClassicEditor,
    editorData: {
      ru: "<h2>Как бороться с приступом хронической головной боли</h2><p>Мы живем во втором тысячелетии. Он предлагает новые удивительные возможности и проблемы: вы можете выращивать собственный урожай, используя семена из Нидерландов. Есть клуб преданных садоводов.</p><p>Его участники - друзья, которые обмениваются семенами и опытом. Также они вместе ездят в поездки. Однажды они решили основать компанию и распространять радость от каннабиса.</p>",
      en: "<h2>How to deal with pain from a chronic headache attack</h2><p>We live in the second millennium. It offers amazing new possibilities and challenges: you can grow your own crop using seeds from the Netherlands. There is a club of dedicated gardeners.</p><p>Its members are friends who share seeds and experiences. They also travel together. One day they decided to start a company and spread the joy of cannabis.</p>"
    },
    show: false,

    name: 'Auto Russian Rocket Fuel',
    price: {
      uah: 106,
      usd: 26,
    },
    newPrice: {
      uah: null,
      usd: null,
    },

    // General
    manufacturer: 'Errors Seeds',
    variety: '',
    flowering: {
      from: 8,
      to: 10
    },
    productivity: {
      from: 100,
      to: 200
    },
    harvest: {
      from: 2,
      to: 2.5
    },
    thc: {
      from: 15,
      to: ''
    },
    yieldStr: 50,
    genetics: '',
    bloom: '',
    fem: '',
    place: '',
    taste: [],
    effect: '',
    height: 60,
    harvestFilter: '',
    exclusive: false,

    mainPhoto: '/uploads/29112020-191950__778-ganga-big.jpg',
    descriptionPhoto: '/uploads/02122020-204145__350-picture.jpg',

    images: [
      "/uploads/29112020-192653__786-picture-1.jpg",
      "/uploads/29112020-192657__278-picture-2.jpg",
      "/uploads/29112020-192700__545-picture-3.jpg",
      "/uploads/29112020-192703__834-picture-4.jpg",
    ],

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
      {value: 'photo flowering', label: 'Фотоцветущия'},
      {value: 'regular', label: 'Регуляр'},
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
              return {value: item.filterId, label: item.name.ru}
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
  },
  methods: {
    async tasteHandler(taste) {
      this.show = true
      await this.tasteVariety.map(item => {
        if (item.value === taste.value) {
          this.show = true
          if (item.isActive) {
            item.isActive = false
            this.taste = this.taste.filter(filter => filter !== item.value)
          } else {
            item.isActive = true
            this.taste.push(item.value)
          }
        }
      })

      this.show = true
    },
    async uploadMainPhotoHandler(event) {
      let formData = new FormData();
      formData.append('image', event[0]);

      this.mainPhoto = await this.addImageHandler(formData)
    },
    async uploadDescriptionPhotoHandler(event) {
      let formData = new FormData();
      formData.append('image', event[0]);

      this.descriptionPhoto = await this.addImageHandler(formData)
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
          || !this.yieldStr
          || !this.genetics
          || !this.harvestFilter
          || !this.bloom
          || !this.fem
          || !this.place
          || this.taste.length === 0
          || !this.effect
          || !this.height
    },

    alertHandler(msg, error) {
      this.alert.visible = true
      this.alert.msg = msg
      this.alert.type = error ? 'danger' : 'success'

      setTimeout(() => this.alert.visible = false, 5000)
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

    filterHeight() {
      if (this.height >= 40 && this.height < 80) {
        return 'small'
      } else if (this.height >= 80 && this.height < 160) {
        return 'medium'
      } else if (this.height >= 160 && this.height <= 220) {
        return 'big'
      }
    },

    createProductHandler() {
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
          yield: this.yieldStr,
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
            sm: this.height,
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
        method: 'POST',
        url: 'api/products/create',
        headers: {
          Authorization: data.token
        },
        data: formData
      })
          .then(res => {
            if (res.data.ok) {
              this.alertHandler(res.data.msg, false)

              setTimeout(() => this.$router.go(-1), 5000)
            } else {
              this.alertHandler(res.data.msg, true)
              console.log(res.data)
            }
          })
          .catch(() => {
            this.$router.push({name: 'Login'})
            localStorage.removeItem('login')
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
</style>

<style>
.item:active {
  background: transparent;
}
.isActive {
  background: #321fdb !important;
  color: #fff !important;
}
</style>