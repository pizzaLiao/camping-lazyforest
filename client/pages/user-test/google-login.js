import useFirebase from '@/hooks/use-firebase'
import axios from 'axios'
import { useAuth } from '@/hooks/use-auth'
import GoogleLogo from '@/components/icons/google-logo'
import Link from 'next/link'

export default function GoogleLogin() {
  const { loginGoogle, logoutFirebase } = useFirebase()
  const { auth, setAuth } = useAuth()

  const callbackGoogleLogin = async (providerData) => {
    console.log(providerData)

    const res = await axios.post(
      'http://localhost:3005/api/google-login/session',
      providerData,
      {
        withCredentials: true, // 注意: 必要的，儲存 cookie 在瀏覽器中
      }
    )

    console.log(res.data)

    if (res.data.message === 'success') {
      setAuth({
        isAuth: true,
        userData: res.data.user,
      })
    } else {
      alert('有錯誤')
    }
  }

  const checkLogin = async () => {
    const res = await axios.get('http://localhost:3005/api/auth/check-login', {
      withCredentials: true, // 從瀏覽器獲取cookie
    })

    console.log(res.data)
  }

  const logout = async () => {
    // firebase logout(注意，並不會登出google帳號)
    logoutFirebase()

    // 伺服器logout
    const res = await axios.post(
      'http://localhost:3005/api/auth/logout',
      {},
      {
        withCredentials: true, // save cookie in browser
      }
    )

    if (res.data.message === 'success') {
      setAuth({
        isAuth: false,
        userData: {
          id: 0,
          name: '',
          username: '',
          r_date: '',
        },
      })
    }
  }

  return (
    <>
      <h1>google-login測試頁(session-cookie)</h1>
      <p>會員狀態:{auth.isAuth ? '已登入' : '未登入'}</p>
      <button onClick={() => loginGoogle(callbackGoogleLogin)}>
        <GoogleLogo /> 用google登入
      </button>
      <br />
      <button onClick={logout}>登出</button>
      <br />
      <button
        onClick={async () => {
          const res = await axios.get(
            'http://localhost:3005/api/auth/check-login',
            {
              withCredentials: true, // save cookie in browser
            }
          )

          console.log(res.data)
        }}
      >
        向伺服器檢查登入狀態
      </button>
      <hr />
      <Link href="/user-test/">會員測試頁(session-cookie)</Link>
      <br />
      <Link href="/user-test/login-status">登入狀態頁(未登入無法觀看)</Link>
    </>
  )
}
