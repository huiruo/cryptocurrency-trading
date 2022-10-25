import React from 'react';
import { Box } from '@fower/react';
import { Button } from '@/common/button';
import traderApi from '@/services/traderApi';
import { toast } from '@/common/toast';

interface Props {
  // test: React.ReactNode
}

/**
 * 注释
 */
function TradeCount(props: Props) {

  const onSyncAmount = async () => {
    const toaster = toast.loading('Sync amount...', { showLayer: true })
    const res = await traderApi.syncAmountApi({})
    if (res.code === 200) {
      toaster.dismiss()
    } else {
      toaster.update("Failed to Sync price", {
        type: 'error',
      })
    }
  }

  return (
    <Box>
      <Button onClick={onSyncAmount}>Sync Amount</Button>
    </Box>
  );
}

export default TradeCount;
