import React from 'react'
import NiceModal from '@common/nice-modal'
import { Button } from 'antd'
import { ModalSign } from '@components/modalSign/ModalSign'
import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from '@common/session'
import { verifyAuth } from '@services/nextApi'

// interface IndexType {
//  loginStatus: boolean
// }

export default function Index() {
  const onLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('onLogin')
    e.preventDefault()
    NiceModal.show(ModalSign)
  }

  const onRegister = () => {
    console.log('onRegister')
  }

  return (
    <div>
      <Button onClick={(e) => onLogin(e)}>登录-test</Button>
      <Button onClick={onRegister}>注册</Button>
    </div>
  )
}

export const getServerSideProps = withIronSessionSsr(async ({ req }) => {
  const { payload } = req.session
  const loginStatus = req.session?.loginStatus
  console.log('index getServerSideProps', req.session)
  console.log('loginStatus', loginStatus)

  if (payload?.token) {
    const res = await verifyAuth(payload.token)
    if (res.data?.username) {
      console.log('通过验证==》1:', res)
      return {
        redirect: {
          destination: '/containers',
          permanent: false,
        },
        props: {
          ...res.data,
        },
      }
    } else {
      console.log('不通过验证==》2:', loginStatus)
      return {
        props: {
          loginStatus: loginStatus || 3,
        },
      }
    }
  }

  return {
    props: {},
  }
}, sessionOptions)
