import React from 'react'
import Layout from '@layouts/layout'
import { Containers } from '@modules/containers'
import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from '@common/session'
import { LoginSuccessPayload } from 'types'

interface Props {
  payload: LoginSuccessPayload
}

export default function Container(props: Props) {
  const { payload } = props
  return (
    <Layout>
      <Containers payload={payload} />
    </Layout>
  )
}

export const getServerSideProps = withIronSessionSsr(async ({ req }) => {
  const { payload } = req.session
  console.log('containers-getServerSideProps', { payload })

  if (payload) {
    return {
      props: { payload },
    }
  }

  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  }
}, sessionOptions)
