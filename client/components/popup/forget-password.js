import React, { useState } from 'react'
import { useUserContext } from '@/context/UserContext'
import axios from 'axios'
import { useRouter } from 'next/router'
import logo from '@/assets/lazyforest.png'
import styles from './login.module.scss'
import { FaRegCircleXmark, FaCircleExclamation } from 'react-icons/fa6'
import Image from 'next/image'

function SendOTP({ onCloseClick, ShowRegisterForm }) {
  // const [show, setShow] = useState(true)

  const router = useRouter()

  const userctx = useUserContext()

  const [email, setEmail] = useState(null)
  const [pwd, setPwd] = useState(null)
  const [loginFailed, setLoginFailed] = useState(false)

  const handleClose = () => onCloseClick()
  // const handleShow = () => setShow(true)

  const handleOpenRegister = () => {
    ShowRegisterForm()
  }

  const handleEmailChange = (e) => {
    console.log(e.target.value)
    setEmail(e.target.value)
  }

  const handlePwdChange = (e) => {
    console.log(e.target.value)
    setPwd(e.target.value)
  }

  const handleSubmit = async (e) => {
    console.log({ email, pwd })
    e.preventDefault()

    try {
      const res = await axios.post(
        'http://localhost:3005/api/auth/login',
        { account: email, password: pwd },
        {
          withCredentials: true, // 注意: 必要的，儲存 cookie 在瀏覽器中
        }
      )

      console.log(res.data)
      if (res.data.message === 'fail') {
        setLoginFailed(true)
      } else {
        userctx.setUser(res.data.user)

        handleClose()
        router.push('/member-dashboard')
      }
    } catch (ex) {
      console.log({ ex })
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={styles.modal}>
          <div className={styles.modal_content}>
            <span className={styles.close} onClick={handleClose}>
              <FaRegCircleXmark size="36" />
            </span>
            <div>
              <Image src={logo} alt="logo" width={146} height={148} />
            </div>
            <div className={styles.inputbox}>
              <div className={styles.form_title}>信箱</div>
              <input
                type="email"
                className={`form-control ${styles.form_input}`}
                placeholder="請輸入註冊電子信箱"
                onChange={handleEmailChange}
              />
            </div>
            <button className={styles.btn} type="submit">
              發送驗證碼
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default SendOTP
