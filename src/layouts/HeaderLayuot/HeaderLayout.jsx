import { Link, Outlet } from 'react-router-dom'
import { Suspense } from 'react'
import { Logo } from '../../assets'
import { AuthStatus } from '../../features/index'


export const HeaderLayout = () => {
  return(
    <>
      <header>
        <Link className='link-logo' to='/'><img src={Logo} alt='logo' /></Link>
        <ul>
            <Link to='/heroes'>
              <button>
                Герои
              </button>
            </Link>
            <Link to='/episodes'><button>
                Эпизоды
              </button>
            </Link>
            <Link to='/locations'><button>
                Локации
              </button>
            </Link>
            <Link to='/login'><button>
              Войти
              </button>
            </Link>
        </ul>
      </header>
      <Suspense fallback={<h4 style={{
        display:'flex',
        justifyContent:'center'
      }}>
        Loading...</h4>
      }>
        <AuthStatus />
        <Outlet/>
      </Suspense>
    </>
  )
}