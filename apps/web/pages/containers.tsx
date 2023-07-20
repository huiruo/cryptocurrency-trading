import React from 'react'
import { Containers } from '../modules'
import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from '@common/session'
import { LoginSuccessPayload } from 'types'

interface Props {
  payload: LoginSuccessPayload
  token: string
}

export default function Container({ payload }: Props) {
  return (
    <>
      <Containers payload={payload} />
    </>
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
