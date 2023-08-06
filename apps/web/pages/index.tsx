import React from 'react'
import NiceModal from '@common/nice-modal'
import { Button } from 'antd'
import { ModalSign } from '@components/modalSign/ModalSign'
import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from '@common/session'
import { verifyAuth } from '@services/next.api'
import { GetServerSideProps } from 'next'

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

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async ({ req }) => {
    const payload = req.session.payload
    const loginStatus = req.session?.loginStatus
    console.log('index getServerSideProps', payload)

    if (payload && payload?.token) {
      const result = await verifyAuth(payload.token)
      if (result.data?.username) {
        console.log('The home page verified==》1:', { result, payload })
        return {
          redirect: {
            destination: '/crypto/strategies',
            permanent: false,
          },
        }
      } else {
        console.log('The home page not verified==>:', loginStatus)
        return {
          props: {
            loginStatus: loginStatus || 3,
          },
        }
      }
    }

    return {
      props: {
        payload: payload || {},
      },
    }
  },
  sessionOptions,
)
