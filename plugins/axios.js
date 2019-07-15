import {Message} from 'element-ui'
export default function ({ $axios, redirect }) {
    $axios.onError(error => {
      const {message,statusCode} = error.response.data
      if(statusCode === 400){
        Message.warning(message)
      }
    })
}