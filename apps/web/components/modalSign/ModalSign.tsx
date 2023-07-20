import React from 'react'
import NiceModal, { useModal } from '@common/nice-modal'
import { Button, Modal } from 'antd'
// import { useSignStatus } from '@components/modalSign/hooks'
import { googleAuthUrl } from '@common/constants'

export const ModalSign = NiceModal.create(({}) => {
  // const { status } = useSignStatus()
  const { visible, hide } = useModal()

  const onGoogleLogin = async () => {
    console.log('onGoogleLogin')
  }

  return (
    <Modal open={visible} onCancel={hide}>
      <div>
        <a href={googleAuthUrl}>登录</a>
        <Button onClick={onGoogleLogin}>登录</Button>
      </div>
    </Modal>
  )
})
