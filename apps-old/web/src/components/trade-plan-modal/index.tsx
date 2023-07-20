import React from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Box } from '@fower/react';
import { TradeModal } from '../modal';

interface Props {
  // test: React.ReactNode
}

/**
 * Code annotation
 */
export const TradePlanModal = NiceModal.create((props: Props) => {

  const { visible, hide } = useModal()

  return (
    <TradeModal
      showMask={true}
      showCloseButton={true}
      maskClosable={true}
      header="trader plan"
      width='70%'
      height='600px'
      isVisible={visible}
      onClose={hide}
      onOpen={() => console.log('TradeModal open')}
      afterClose={() => console.log('TradeModal afterClose')}
    >
      <Box>
        trader plan
      </Box>
    </TradeModal>
  );
})
