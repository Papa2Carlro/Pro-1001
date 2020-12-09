<template>
  <CCol xs="12" lg="12">
    <CCard>
      <CCardHeader>
        Создать пост
      </CCardHeader>
      <CCardBody>
        <CAlert v-if="alert.visible" :color="alert.type">
          {{ alert.msg }}
        </CAlert>

        <CForm @submit="createPostHandler">
          <CTabs>
            <CTab title="Редактор" active>

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
                  <p class="mt-3"><strong>Фоновые изображения</strong></p>

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
              <CButton @click="$router.go(-1)" size="md" class="ml-2" color="dark">Отменить</CButton>
            </CCol>
          </CRow>
        </CForm>
      </CCardBody>
    </CCard>
  </CCol>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "@/plugin/axios"
import flag from '@/mixins/flag.mixin'

import config from "@/config/config"

export default {
  name: 'CreatePost',
  mixins: [flag],
  data: () => ({
    vertical: {navs: 'col-md-1', content: 'col-md-11'},

    editor: ClassicEditor,
    editorData: {
      ru: '<p>Контент.</p>',
      en: '<p>Content of the editor.</p>'
    },

    title: {
      ru: 'Это новый пост сделанный с админки',
      en: 'New post from the admin area'
    },
    category: 'News',
    author: 'Bob Marley',

    previewImage: "/uploads/26112020-163742__726-blog-1.png",
    image1: "/uploads/26112020-181137__982-man.png",
    image2: "/uploads/26112020-181225__617-picrure.png",

    alert: {
      visible: false,
      msg: '',
      type: ''
    }
  }),
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

    alertHandler(msg, error) {
      this.alert.visible = true
      this.alert.msg = msg
      this.alert.type = error ? 'danger' : 'success'

      setTimeout(() => this.alert.visible = false, 5000)
    },

    createPostHandler() {
      const data = JSON.parse(localStorage.getItem('login'))
      const image = [this.image1]

      if (this.image2) {
        image.push(this.image2)
      }

      if (!this.image1 || !this.editorData.ru || !this.editorData.en || !this.previewImage || !this.category || !this.title.ru || !this.title.en || !this.author) {
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
        method: 'POST',
        url: 'api/post/create',
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
