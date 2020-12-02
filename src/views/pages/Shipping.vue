<template>
  <div>
    <CRow>
      <CCol sm="12">
        <CCard>
          <CCardHeader>
            Редактировать страницу
          </CCardHeader>
          <CCardBody>
            <CAlert v-if="alert.visible" :color="alert.type">
              {{ alert.msg }}
            </CAlert>

            <CForm @submit.prevent="editPageHandler">
              <CTabs>
                <CTab active>
                  <template slot="title">
                    <CIcon :height="15" :content="$options.ru"/>
                  </template>

                  <ckeditor :editor="editor" v-model="editorData.ru"></ckeditor>
                </CTab>

                <CTab>
                  <template slot="title">
                    <CIcon :height="15" :content="$options.en"/>
                  </template>

                  <ckeditor :editor="editor" v-model="editorData.en"></ckeditor>
                </CTab>
              </CTabs>

              <CButton class="mt-3" type="submit" size="md" color="dark">
                Сохранить
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import axios from "@/plugin/axios"
import flag from '@/mixins/flag.mixin'

export default {
  name: 'Payment',
  mixins: [flag],
  data: () => ({
    editor: ClassicEditor,
    editorData: {
      ru: '',
      en: ''
    },

    alert: {
      visible: false,
      msg: '',
      type: ''
    }
  }),
  created() {
    axios({method: 'GET', url: 'api/pages/shipping',})
        .then(res => {
          if (res.data.ok) {
            this.editorData = res.data.body[0].html
          } else {
            this.alertHandler('При загрузке что то пошло не так, проверте консоль', true)
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

    editPageHandler() {
      const data = JSON.parse(localStorage.getItem('login'))

      axios({
        method: 'PUT',
        url: 'api/pages/shipping',
        headers: {
          Authorization: data.token
        },
        data: {html: this.editorData}
      })
          .then(res => {
            if (res.data.ok) {
              this.alertHandler(res.data.msg, false)
            } else {
              this.alertHandler('Сервер вернул ошибку, проверте консоль, Нажмите F12', true)
            }
          })
          .catch(err => {
            this.alertHandler('Произошла неизвестная ошибка, проверте консоль, Нажмите F12', true)
            console.log(err)
          })
    }
  }
}
</script>
