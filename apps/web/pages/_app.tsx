import React from 'react'
import App, { AppProps } from 'next/app'
import NiceModal from '@common/nice-modal'
import { Provider } from 'react-redux'
import store from '../stores/index'
import 'antd/dist/reset.css'
import '../styles/index.scss'
import '../styles/header.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <NiceModal.Provider>
        <App Component={Component} pageProps={pageProps} />
      </NiceModal.Provider>
    </Provider>
  )
}

export default MyApp
