<template>
  <div>
    <CRow>
      <CCol sm="12">
        <CCard>
          <CCardHeader>
            Добавить вопрос
          </CCardHeader>
          <CCardBody>
            <CAlert v-if="alert.visible" :color="alert.type">
              {{ alert.msg }}
            </CAlert>

            <CForm @submit.prevent="createNewFaq">
              <CTabs>
                <CTab active>
                  <template slot="title">
                    <CIcon :height="15" :content="$options.ru"/>
                  </template>

                  <CInput class="mt-3" type="text" v-model="title.ru" prepend="Вопрос"/>

                  <p>Ответ</p>
                  <ckeditor :editor="editor" v-model="text.ru"></ckeditor>
                </CTab>

                <CTab>
                  <template slot="title">
                    <CIcon :height="15" :content="$options.en"/>
                  </template>

                  <CInput class="mt-3" type="text" v-model="title.en" prepend="Вопрос"/>

                  <p>Ответ</p>
                  <ckeditor :editor="editor" v-model="text.en"></ckeditor>
                </CTab>
              </CTabs>

              <CButton class="mt-4" type="submit" size="md" color="dark">
                Добавить
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol sm="12">
        <CCard>
          <CCardHeader>
            Список всех магазинов
          </CCardHeader>
          <CCardBody>
            <CDataTable
                :items="items"
                :fields="fields"
                :items-per-page="10"
                hover
                table-filter
                items-per-page-select
                sorter
                pagination
            >
              <template #title="{item}">
                <td class="py-2">
                  <strong class="font-lg">{{item.title.ru}}</strong>
                </td>
              </template>
              <template #show_details="{item, index}">
                <td class="py-2">
                  <CButton
                      color="primary"
                      variant="outline"
                      square
                      size="sm"
                      @click="toggleDetails(item, index)"
                  >
                    {{ Boolean(item._toggled) ? 'Скрыть' : 'Показать' }}
                  </CButton>
                </td>
              </template>
              <template #details="{item}">
                <CCollapse :show="Boolean(item._toggled)" :duration="collapseDuration">
                  <CCardBody>
                    <CForm @submit.prevent="editFaqHandler(item)">
                      <CTabs>
                        <CTab active>
                          <template slot="title">
                            <CIcon :height="15" :content="$options.ru"/>
                          </template>

                          <CInput class="mt-3" type="text" v-model="item.title.ru" prepend="Вопрос"/>

                          <p>Ответ</p>
                          <ckeditor :editor="editor" v-model="item.text.ru"></ckeditor>
                        </CTab>

                        <CTab>
                          <template slot="title">
                            <CIcon :height="15" :content="$options.en"/>
                          </template>

                          <CInput class="mt-3" type="text" v-model="item.title.en" prepend="Вопрос"/>

                          <p>Ответ</p>
                          <ckeditor :editor="editor" v-model="item.text.en"></ckeditor>
                        </CTab>
                      </CTabs>

                      <CButton type="submit" size="sm" color="info" class="mt-4">
                        Применить
                      </CButton>
                      <CButton @click="deleteFaqHandler(item)" size="sm" color="danger" class="mt-4 ml-1">
                        Удалить
                      </CButton>
                    </CForm>
                  </CCardBody>
                </CCollapse>
              </template>
            </CDataTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import axios from "@/plugin/axios"
import flag from '@/mixins/flag.mixin'
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"

const fields = [
  {key: 'title', label: 'Вопрос', _style: 'min-width:200px', _classes: 'font-weight-bold'},
  {
    key: 'show_details',
    label: '',
    _style: 'width:1%',
    sorter: false,
    filter: false
  }
]

export default {
  name: 'Faqs',
  mixins: [flag],
  data: () => ({
    items: [],

    fields,
    details: [],
    collapseDuration: 0,

    editor: ClassicEditor,
    title: {
      en: 'How are seeds divided by the kinds?',
      ru: 'Как семена делятся по видам?'
    },
    text: {
      en: 'In general, it is worth saying that the mail is processed only for the acceptance of your order. We gladly draw attention and respond to any comments and questions, but not on a global scale. On all issues of cultivation, including on the very same "instructions", we advise you to contact our forum. There you will find many such topics and sections like "For Beginners", "Legal Section", "News", "Reports" and much more. Thus, in one of the relevant sections you can ask any question that interests you, to which you will be answered in detail by sensible, experienced people.',
      ru: 'В общем, стоит сказать, что почта обрабатывается только для принятия вашего заказа. Мы с радостью обращаем внимание и отвечаем на любые комментарии и вопросы, но не в глобальном масштабе. По всем вопросам выращивания, в том числе по той же «инструкции», советуем обращаться на наш форум. Там вы найдете множество таких тем и разделов, как «Для начинающих», «Юридический раздел», «Новости», «Отчеты» и многое другое. Таким образом, в одном из соответствующих разделов вы можете задать любой интересующий вас вопрос, на который вам подробно ответят толковые, опытные люди.'
    },

    alert: {
      visible: false,
      msg: '',
      type: ''
    }
  }),
  created() {
    axios({method: 'GET', url: 'api/faq'})
        .then(res => {
          if (res.data.ok) {
            this.items = res.data.body.map((item, id) => {
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

    createNewFaq() {
      if (!this.title || !this.text) {
        this.alertHandler('Форма не валидна', true)
        return
      }

      const data = JSON.parse(localStorage.getItem('login'))

      const formData = {
        title: this.title,
        text: this.text
      }

      axios({
        method: 'POST',
        url: 'api/faq/create',
        headers: {
          Authorization: data.token
        },
        data: formData
      })
          .then(res => {
            if (res.data.ok) {
              this.alertHandler(res.data.msg, false)
              this.items.push({...res.data.body, id: this.items.length})
            } else {
              this.alertHandler('Сервер вернул ошибку, проверте консоль, Нажмите F12', true)
              console.log(res.data)
            }
          })
          .catch(err => {
            this.alertHandler('Произошла неизвестная ошибка, проверте консоль, Нажмите F12', true)
            console.log(err)
          })
    },

    editFaqHandler(item) {
      const data = JSON.parse(localStorage.getItem('login'))

      const formData = {
        title: item.title,
        text: item.text
      }

      axios({
        method: 'PUT',
        url: `api/faq/edit/${item._id}`,
        headers: {
          Authorization: data.token
        },
        data: formData
      })
          .then(res => {
            if (res.data.ok) {
              this.alertHandler(res.data.msg, false)
              this.toggleDetails(item)
            } else {
              this.alertHandler('Сервер вернул ошибку, проверте консоль, Нажмите F12', true)
            }
          })
          .catch(() => {
            this.$router.push({name: 'Login'})
            localStorage.removeItem('login')
          })
    },

    deleteFaqHandler(item) {
      const data = JSON.parse(localStorage.getItem('login'))

      axios({
        method: 'DELETE',
        headers: {
          Authorization: data.token
        },
        url: `api/faq/${item._id}`
      })
          .then(res => {
            if (res.data.ok) {
              this.items = this.items.filter(store => store._id !== item._id)
              this.alertHandler(res.data.msg, false)
              this.toggleDetails(item)
            } else {
              this.alertHandler('Сервер вернул ошибку, проверте консоль, Нажмите F12', true)
            }
          })
    },

    toggleDetails(item) {
      this.$set(this.items[item.id], '_toggled', !item._toggled)
      this.collapseDuration = 300
      this.$nextTick(() => {
        this.collapseDuration = 0
      })
    }
  }
}
</script>
