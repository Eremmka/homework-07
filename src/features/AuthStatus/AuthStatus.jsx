import './AuthStatus.css'
import { useAuth } from '../../app'

export const AuthStatus = () => {
  const auth = useAuth()
  
  if(auth.user === null){
    return( 
      <div className='status-div-second'>
        <p>Вы не вошли в аккаунт</p>
      </div>
    )
  }
  return(
    <div className='status-div-first'>
      <p>
        Приветствуем, {auth.user}
      </p>
    </div>
  )
}