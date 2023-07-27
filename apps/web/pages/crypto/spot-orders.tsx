import React from 'react'
import Layout from '@layouts/layout'
import SpotOrders from '@modules/crypto/spot-orders'
import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from '@common/session'

export default function SpotOrdersPage() {
  return (
    <Layout>
      <SpotOrders />
    </Layout>
  )
}

export const getServerSideProps = withIronSessionSsr(async ({ req }) => {
  const { payload } = req.session

  console.log('SpotOrdersPage-getServerSideProps', payload)

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
