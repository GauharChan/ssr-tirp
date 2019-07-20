import {Message} from 'element-ui'
export default function ({ $axios, redirect }) {
    $axios.onError(error => {
      const {message,statusCode} = error.response.data
      if(statusCode === 400){
        Message.warning(message)
      }
      if(statusCode === 401 || statusCode === 403){
        Message.warning(message)
        redirect('/user/login')
      }
    })
}