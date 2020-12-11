import axios from "../plugin/axios"

export default  function admin ({next}) {
    const data = JSON.parse(localStorage.getItem('login'))

    if (!data) {
      return next({name: 'Login'})
    }

     axios({
        url: '/api/users/all',
        method: 'GET',
        headers: {
            Authorization: data.token
        }
    })
        .then((res) => {
            console.log(res)
        })
        .catch(next({name: 'Login'}))
}