import React from 'react'
import Layout from '@layouts/layout'
import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from '@common/session'
import { FutureOrders } from '@modules/crypto/future-orders'

export default function FutureOrdersPage() {
  return (
    <Layout>
      <FutureOrders />
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
