import { useRef } from 'react';
import './SigninSignupForm.css'
import { useAuth } from '../../app';
import { useLocation, useNavigate } from 'react-router-dom';


export default function Signin() {
  const navigate = useNavigate()
  const auth = useAuth()
  const formRef = useRef(null)
  const location = useLocation()
  const from = location.state?.from || '/'
  
  const handleSubmit = (event) => {
    event.preventDefault()
    const formDate = new FormData(event.currentTarget)
    const username = formDate.get('username')
    auth.signin(username, () => {
      navigate(from, { replace: true })
    })
    formRef.current.reset()
  }
  const handleSignout = () => {
    auth.signout(() => {
      navigate('/login')
    })
  }
  if (auth.user) {
    return (
      <div className='user-panel-div__first'>
        <div className='user-panel-div__second'>
          <h3>Добро пожаловать, {auth.user}!</h3>
          <p>Вы успешно авторизованы</p>
          <button onClick={handleSignout}>Выйти</button>
        </div>
      </div>
    )
  }
  return(
    <div className='login-first-div'>
      <form className='login-second-div'
        ref={formRef}
        onSubmit={handleSubmit}
      > 
        <h3>Вход</h3>
        <p>Имя</p>
        <input
          autoFocus
          required
          type="text"
          name='username'
        />
        <p>Пароль</p>
        <input
          required
          type="password"
          name='password'
        />
        <button>Войти</button>
      </form>
    </div>
  )
}