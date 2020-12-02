export default {
  methods: {
    id(str) {
      return str.toLowerCase().split(' ').join('_').split('-').join('_')
    }
  }
}
