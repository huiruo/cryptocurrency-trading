import React from 'react'
import Layout from '@layouts/layout'
import { Containers } from '@modules/containers'
import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from '@common/session'
import { LoginSuccessPayload } from 'types'

interface Props {
  payload: LoginSuccessPayload
  token: string
}

export default function Container({ payload }: Props) {
  return (
    <Layout>
      <Containers payload={payload} />
    </Layout>
  )
}

export const getServerSideProps = withIronSessionSsr(async ({ req }) => {
  const { payload } = req.session

  console.log('containers-getServerSideProps', payload)
  console.log('====>B')

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
