import React, { useEffect, useState } from 'react';
import { Box } from '@fower/react';
import { Button } from '@/common/button';
import traderApi from '@/services/traderApi';
import { toast } from '@/common/toast';
import { ProfitStatisticsType } from '@/utils/types';
import { formatUnixTime } from '@/utils';

interface Props { }

/**
 * 注释
 */
function TradeCount(props: Props) {
  const [profitStatistics, setProfitStatistics] = useState<ProfitStatisticsType>()

  const onSyncAmount = async () => {
    const toaster = toast.loading('Sync amount...', { showLayer: true })
    const res = await traderApi.syncAmountApi({})
    if (res.code === 200) {
      toaster.update('Sync amount succeeded', {
        type: 'success',
        duration: 1000,
      })
    } else {
      toaster.update("Failed to sync amount", {
        type: 'error',
      })
    }
  }

  const onProfitStatistics = async () => {
    const toaster = toast.loading('Sync profit statistics...', { showLayer: true })
    const res = await traderApi.profitStatistics({})
    if (res.code === 200) {
      await getProfitStatistics()
      toaster.update('Sync profit statistics succeeded', {
        type: 'success',
        duration: 1000,
      })
    } else {
      toaster.update("Failed to sync profit statistics", {
        type: 'error',
      })
    }
  }

  const getProfitStatistics = async () => {
    const res = await traderApi.getProfitStatistics({})
    if (res.code === 200) {
      setProfitStatistics(res.data)
    } else {
      toast.error("Failed to get profit statistics", {
        type: 'error',
      })
    }
  }

  useEffect(() => {
    getProfitStatistics()
  }, [])

  return (
    <Box>
      <Box mt='8px'>
        <Button onClick={onSyncAmount}>Sync Amount</Button>
        <Button onClick={onProfitStatistics} ml='8px'>Profit Statistics</Button>
      </Box>
      <Box mt='10px'>
        <Box as='span' mr='8px'>Total profit: {profitStatistics?.profit || '-'}</Box>
        <Box as='span'>Update: {profitStatistics?.time ? formatUnixTime(profitStatistics.time) : '-'}</Box>
      </Box>
    </Box>
  );
}

export default TradeCount;
