<template>
  <div>
    <CRow>
      <CCol sm="12">
        <CCard>
          <CCardHeader>
            Создать рассылку
          </CCardHeader>
          <CCardBody>
            <CAlert v-if="alert.visible" :color="alert.type">
              {{ alert.msg }}
            </CAlert>

            <CForm @submit.prevent="submitMailer">

              <CInput
                  type="text"
                  v-model="subject"
                  label="Тема письма"
                  placeholder="Введите тему письма..."
                  required
              />

              <ckeditor :editor="editor" v-model="editorData"></ckeditor>

              <CButton type="submit" class="mt-3" size="md" color="dark">
                Отправить
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import axios from "@/plugin/axios"
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  name: 'Mailer',
  data: () => ({
    items: [],

    editor: ClassicEditor,
    editorData: '<p>Content of the editor.</p>',

    subject: 'Новостная рассылка Errors Seed',

    alert: {
      visible: false,
      msg: '',
      type: ''
    }
  }),
  methods: {
    alertHandler(msg, error) {
      this.alert.visible = true
      this.alert.msg = msg
      this.alert.type = error ? 'danger' : 'success'

      setInterval(() => this.alert.visible = false, 5000)
    },

    submitMailer () {
      const data = JSON.parse(localStorage.getItem('login'))

      axios({
        method: 'POST',
        url: 'api/mailer/send',
        headers: {
          Authorization: data.token
        },
        data: {subject: this.subject, mail: this.editorData}
      })
          .then(res => {
            if (res.data.ok) {
              this.alertHandler(res.data.msg, false)
            } else {
              this.alertHandler(res.data.msg, true)
            }
          })
          .catch(err => {
            console.log(err)
            this.alertHandler('Произошла неизвестная ошибка, проверте консоль, Нажмите F12', true)
          })
    }
  }
}
</script>
