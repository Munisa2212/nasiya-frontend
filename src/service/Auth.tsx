import { instance } from '../hooks/instance'

const Login = (data:{login: string, password: string}, setCookies: any) => {
  instance.post('/seller/login', data).then(res => {
        console
      setCookies('token', res.data.token)
      location.pathname = "/"
  })
}

export default Login