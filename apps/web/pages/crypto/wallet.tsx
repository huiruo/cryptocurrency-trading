import React from 'react'
import Layout from '@layouts/layout'
import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from '@common/session'
import { WalletData } from '@modules/crypto/wallet'

export default function Wallet() {
  return (
    <Layout>
      <WalletData />
    </Layout>
  )
}

export const getServerSideProps = withIronSessionSsr(async ({ req }) => {
  const { payload } = req.session
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
