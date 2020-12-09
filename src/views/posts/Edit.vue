<template>
  <CCol xs="12" lg="12">
    <CCard>
      <CCardHeader>
        Редактировать пост
      </CCardHeader>
      <CCardBody>
        <CAlert v-if="alert.visible" :color="alert.type">
          {{ alert.msg }}
        </CAlert>

        <CForm @submit.prevent="editPostHandler">
          <CTabs>
            <CTab title="Редактор" active>
              <a class="mt-2 d-block" :href="getUrl(`/blog/${createLink(category)}/${createLink(title.en)}`)">
                Ссылка на пост {{getUrl(`/blog/${createLink(category)}/${createLink(title.en)}`)}}
              </a>

              <CTabs class="mt-3" :vertical="vertical">
                <CTab active>
                  <template slot="title">
                    <CIcon :width="30" :content="$options.ru"/>
                  </template>

                  <CInput
                      type="text"
                      v-model="title.ru"
                      class="mt-2"
                      label="Заголовок поста"
                      placeholder="Введите название..."
                      required
                  />

                  <ckeditor :editor="editor" v-model="editorData.ru"></ckeditor>
                </CTab>

                <CTab>
                  <template slot="title">
                    <CIcon :width="30" :content="$options.en"/>
                  </template>

                  <CInput
                      type="text"
                      v-model="title.en"
                      class="mt-2"
                      label="Заголовок поста"
                      placeholder="Введите название..."
                      required
                  />

                  <ckeditor :editor="editor" v-model="editorData.en"></ckeditor>
                </CTab>
              </CTabs>
            </CTab>
            <CTab title="Инфо">
              <CRow>
                <CCol xs="12" md="6">
                  <CInput
                      type="text"
                      v-model="category"
                      class="mt-2"
                      label="Категория"
                      placeholder="Введите категорию..."
                      required
                  />

                  <CInput
                      type="text"
                      v-model="author"
                      class="mt-2"
                      label="Автор"
                      placeholder="Введите ваше имя и фамилию..."
                      required
                  />

                  <CImg
                      v-if="previewImage"
                      :src="getUrl(previewImage)"
                      block
                      fluid
                      class="mb-2"
                  />

                  <CInputFile
                      label="Превью"
                      custom
                      horizontal
                      @change="uploadFileHandler"
                  />
                </CCol>

                <CCol xs="12" md="6">
                  <p class="mt-3"><strong>Фоновые изображения</strong> <small>максимум 2 фото</small></p>

                  <div>
                    <CImg
                        v-if="image1"
                        :src="getUrl(image1)"
                        block
                        fluid
                        class="mb-2"
                    />

                    <CRow class="justify-content-between">
                      <CCol :md="image1 ? 9 : 12">
                        <CInputFile
                            custom
                            @change="uploadImage1Handler"
                        />
                      </CCol>
                      <CCol v-if="image1" md="3">
                        <CButton @click="deleteImageHandler(1)" size="md" color="danger">Удалить</CButton>
                      </CCol>
                    </CRow>
                  </div>

                  <div v-if="image1" class="mt-4">
                    <CImg
                        v-if="image2"
                        :src="getUrl(image2)"
                        block
                        fluid
                        class="mb-2"
                    />

                    <CRow class="justify-content-between">
                      <CCol :md="image2 ? 9 : 12">
                        <CInputFile
                            custom
                            @change="uploadImage2Handler"
                        />
                      </CCol>
                      <CCol v-if="image2" md="3">
                        <CButton @click="deleteImageHandler(2)" size="md" color="danger">Удалить</CButton>
                      </CCol>
                    </CRow>
                  </div>
                </CCol>
              </CRow>
            </CTab>
          </CTabs>

          <CRow>
            <CCol class="btn mt-3">
              <CButton type="submit" size="md" color="success">Сохранить</CButton>
              <CButton @click="removePostHandler" size="md" class="ml-2" color="danger">Удалить</CButton>
              <CButton @click="$router.go(-1)" size="md" class="ml-4" color="dark">Отменить</CButton>
            </CCol>
          </CRow>
        </CForm>
      </CCardBody>
    </CCard>
  </CCol>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import flag from '@/mixins/flag.mixin'
import axios from "@/plugin/axios"
import config from "@/config/config"

export default {
  name: 'CreatePost',
  mixins: [flag],
  data: () => ({
    vertical: {navs: 'col-md-1', content: 'col-md-11'},

    editor: ClassicEditor,
    editorData: {},

    title: {},
    category: '',
    author: '',

    previewImage: "",
    image1: "",
    image2: "",

    alert: {
      visible: false,
      msg: '',
      type: ''
    }
  }),
  created() {
    const data = JSON.parse(localStorage.getItem('login'))

    axios({
      method: 'GET',
      url: `api/post/all/${this.$route.params.id}`,
      headers: {
        Authorization: data.token
      }
    })
        .then(res => {
          if (res.data.ok) {
            this.editorData = res.data.body.body.html
            this.title = res.data.body.title

            this.category = res.data.body.category
            this.author = res.data.body.author

            this.previewImage = res.data.body.picture

            this.image1 = res.data.body.body.image[0]
            if (res.data.body.body.image[1]) {
              this.image2 = res.data.body.body.image[1]
            }
          } else {
            console.log(res.data)
          }
        })
        .catch(err => {
          console.log(err)
        })
  },
  methods: {
    async uploadFileHandler(event) {
      let formData = new FormData();
      formData.append('image', event[0]);

      this.previewImage = await this.addImageHandler(formData)
    },
    async uploadImage1Handler(event) {
      let formData = new FormData();
      formData.append('image', event[0]);

      this.image1 = await this.addImageHandler(formData)
    },
    async uploadImage2Handler(event) {
      let formData = new FormData();
      formData.append('image', event[0]);

      this.image2 = await this.addImageHandler(formData)
    },

    deleteImageHandler(image) {
      switch (image) {
        case 1:
          if (this.image2) {
            this.image1 = this.image2
            this.image2 = ''
          } else {
            this.image1 = ''
          }
          break
        case 2:
          this.image2 = ''
          break
      }
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
    createLink(str) {
      return str.toLowerCase().split(' ').join('-')
    },

    alertHandler(msg, error) {
      this.alert.visible = true
      this.alert.msg = msg
      this.alert.type = error ? 'danger' : 'success'

      setTimeout(() => this.alert.visible = false, 5000)
    },

    removePostHandler () {
      const data = JSON.parse(localStorage.getItem('login'))

      axios({
        method: 'DELETE',
        url: `api/post/${this.$route.params.id}`,
        headers: {
          Authorization: data.token
        },
      })
          .then(res => {
            console.log(res.data)

            if (res.data.ok) {
              this.alertHandler(res.data.msg, false)

              setTimeout(() => this.$router.go(-1), 5000)
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

    editPostHandler() {
      const data = JSON.parse(localStorage.getItem('login'))
      const image = [this.image1]

      if (this.image2) {
        image.push(this.image2)
      }

      if (!this.image1 || !this.editorData || !this.previewImage || !this.category || !this.title || !this.author) {
        this.alertHandler('Форма не валидна', true)
        return
      }

      const formData = {
        category: this.category,
        title: this.title,
        picture: this.previewImage,
        body: {
          image,
          html: this.editorData
        },
        author: this.author,
      }

      axios({
        method: 'PUT',
        url: `api/post/edit/${this.$route.params.id}`,
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
              this.alertHandler('Сервер вернул ошибку, проверте консоль, Нажмите F12', true)
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
