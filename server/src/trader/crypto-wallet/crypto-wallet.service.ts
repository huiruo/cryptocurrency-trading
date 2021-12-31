import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WalletInfo } from './crypto-info.entity'
import { CryptoWallet } from './crypto_wallet.entity'
import { TradingStrategy } from './trading_strategy.entity'
import { MyTrades } from './crypto-myTrades.entity'
import { cryptoWalletType } from '../../common/types'
import { balancesType } from '../../common/types'
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CryptoWalletService {
  constructor(
    @InjectRepository(WalletInfo) private readonly walletInfoRepo: Repository<WalletInfo>,  
    @InjectRepository(CryptoWallet) private readonly cryptoWallet: Repository<CryptoWallet>,  
    @InjectRepository(MyTrades) private readonly myTradesRepo: Repository<MyTrades>,  
    @InjectRepository(TradingStrategy) private readonly tradingStrategyRepo: Repository<TradingStrategy>,  
  ) { }

  /*
  Export API: Binance wallet write into Databasce
  api接口：同步钱包数据
  */
  async updateCryptoWallet(cryptoWallet:cryptoWalletType) {
    const { 
      makerCommission,
      takerCommission,buyerCommission,
      sellerCommission,
      canTrade,
      canWithdraw,
      canDeposit,
      updateTime,
      accountType,
      balances 
    } = cryptoWallet

    const walletInfoRow = {
      makerCommission,
      takerCommission,
      buyerCommission,
      sellerCommission,
      canTrade,
      canWithdraw,
      canDeposit,
      updateTime,
      accountType
    }

    const theWalletInfo = await this.findWalletInfo()

    if (theWalletInfo) {
      const result = await this.walletInfoRepo.update({ id: theWalletInfo.id }, theWalletInfo);

      balances.forEach((item:balancesType)=>{
        const { asset,free,locked } = item
        if(Number(free) !==0 || (Number(locked) !==0) ){
          const cryptoWalletRow = {
            id:uuidv4(),
            asset,
            free,
            locked,
            updateTime
          }
          this.updateCryptoWalletRow(cryptoWalletRow)
        }
      })

    }else{
      this.walletInfoRepo.save(walletInfoRow)
    }
  }

  /*
  util method:
  */
  private async updateCryptoWalletRow(cryptoWalletRow:balancesType) {

    const { asset,free,locked,updateTime } = cryptoWalletRow

    const assetWallet = await this.findCryptoWalletByAsset(asset)

    if (assetWallet) {
      //update
      let sql = `update crypto_wallet set asset = "${asset}",free = "${free}",locked = "${locked}", updateTime = ${updateTime}
      WHERE id = "${assetWallet.id}"`;
      const result = await this.cryptoWallet.query(sql);
      console.log("update----->",cryptoWalletRow.asset,'-',result)
    }else{
      //insert
      const result = await this.cryptoWallet.save(cryptoWalletRow) 
      console.log("insert----->",result)
    }
  }
  /*
  util method: 返回单一钱包余额
  */
  private async findCryptoWalletByAsset(asset:string): Promise<CryptoWallet> {
    const sql = `select * from crypto_wallet where asset='${asset}'`
    const cryptoWalletByAsset = await this.cryptoWallet.query(sql);
    return cryptoWalletByAsset[0];
  }

  private async findWalletInfo(): Promise<WalletInfo> {
    const theWalletInfo = await this.walletInfoRepo.findOne();
    return theWalletInfo;
  }

  /*
  Export API: Query wallet from local database
  */
  async getCryptoWallet():Promise<CryptoWallet>{
    const sql = `select * from crypto_wallet;`
    const cryptoWalletByAsset = await this.cryptoWallet.query(sql);
    return cryptoWalletByAsset;
  }

  /*
  Util method: Query orders from local database
  */
  async getMyTradesBySymbol(symbol: string):Promise<MyTrades[]> {
    //time最新排序
    const sql = `select * from mytrades where symbol='${symbol}' order by time desc`
    const myTrade:MyTrades[] = await this.myTradesRepo.query(sql);
    return myTrade;
  }

  /*
  util method: 返回单一策略
  */
  private async findTradingStrategyByAsset(asset:string): Promise<TradingStrategy> {
    const sql = `select * from trading_strategy where asset='${asset}' limit 0,1`
    const tradingStrategy = await this.tradingStrategyRepo.query(sql);
    return tradingStrategy[0];
  }

  /*
  Export API: 更新策略:计算盈亏
  */
  async updateTradingStrategyProfit(price:any,asset: string){
    const tradingStrategy:TradingStrategy = await this.findTradingStrategyByAsset(asset)
    const { cost_price,quantity } = tradingStrategy

    const priceInt= Number(price)
    const priceDifference:number = parseFloat((priceInt - cost_price).toFixed(8))

    const profit_ratio:string = ((priceDifference / priceInt)*100).toFixed(2)

    const profitAmount:number = parseFloat((priceDifference * quantity).toFixed(8))

    //update
    console.log("更新",asset,"盈亏")
    let sql = `update trading_strategy set price = "${priceInt}",profit_ratio = "${profit_ratio}",profit_amount = "${profitAmount}" WHERE asset = "${asset}"`;
    const result = await this.tradingStrategyRepo.query(sql);
    return result
  }

  /*
  Export API: 更新策略:计算出起始订单，并创建/更新策略
  */
  async updateTradingStrategy(symbol: string,asset: string){
    const assetWallet = await this.findCryptoWalletByAsset(asset)
    const { free:quantity } = assetWallet

    //计算出起始订单 start
    const symbolTrades:MyTrades[] = await this.getMyTradesBySymbol(symbol)

    let calculatingQuantity:number =0
    let calculatingTargetIndex:number = 0

    for (let index = 0; index < symbolTrades.length; index++) {
      const item:MyTrades = symbolTrades[index];
      const isBuyer = item.isBuyer
      const qty = parseFloat(Number(item.qty).toFixed(8))
      if(isBuyer){
        calculatingQuantity = Number((calculatingQuantity + qty).toFixed(8))
        if(calculatingQuantity <=0){
          calculatingTargetIndex=index
          break;
        }
      }else{
        calculatingQuantity = Number((calculatingQuantity - qty).toFixed(8))
        if(calculatingQuantity <=0){
          calculatingTargetIndex=index
          break;
        }
      } 
    }
    //计算出起始订单 end

    //获得起始订单 start
    const findFirstOredrsql = `select * from mytrades where id='${symbolTrades[calculatingTargetIndex-1].id}'`
    const firstStrategyOredr:MyTrades[] = await this.myTradesRepo.query(findFirstOredrsql);
    //获得起始订单 end

    if(firstStrategyOredr){
      //根据起始订单---->查询到策略订单区间--->得出操作订单信息
      const { id:first_order_id, price:first_order_price, time} = firstStrategyOredr[0]
      const findFirstOredrsql = `select * from mytrades where symbol='${symbol}' and time >= ${time} order by time desc`
      const targetTrade:MyTrades[] = await this.myTradesRepo.query(findFirstOredrsql);
      const { id:last_order_id, price:last_order_price} = targetTrade[0]
      //end

      const strategyRow = {
        asset,
        quantity:Number(quantity),
        first_order_id,
        first_order_price,
        last_order_id,
        last_order_price,
        is_running:1
      }

      let result:any = null

      const tradingStrategy = await this.findTradingStrategyByAsset(asset)

      if(tradingStrategy){
        //update
        console.log("计算出起始订单，并创建/更新策略-update")
        let sql = `update trading_strategy set quantity = "${strategyRow.quantity}",first_order_id = "${first_order_id}", first_order_price = ${first_order_price},
        last_order_id = "${last_order_id}", last_order_price = ${last_order_price} WHERE asset = "${asset}"`;
        result = await this.tradingStrategyRepo.query(sql);
      }else{
        //insert
        console.log("计算出起始订单，并创建/更新策略-insert")
        result = await this.tradingStrategyRepo.save(strategyRow) 
      }

      return result;
    }
    return null;
  }

  /*
  Export API: Calculate the hold symbol cost price 
  计算出成本价，并写入策略表
  */
  async CALC_holdCostprice(symbol:string,asset: string){
    const tradingStrategy:TradingStrategy = await this.findTradingStrategyByAsset(asset)

    if(tradingStrategy){
      const { first_order_id } = tradingStrategy
      const findFirstOredrsql = `select * from mytrades where symbol='${symbol}' and time >= (select time from mytrades where id ='${first_order_id}') order by time desc`
      const targetTrade:MyTrades[] = await this.myTradesRepo.query(findFirstOredrsql);
      let totalCost:number = 0
      let totalQty:number = 0

      targetTrade.forEach(item=>{
        const isBuyer = item.isBuyer
        const price = parseFloat(Number(item.price).toFixed(8))
        const qty = parseFloat(Number(item.qty).toFixed(8))

        if(isBuyer===1){
          let cost:number = parseFloat((price* qty).toFixed(8))
          totalQty = parseFloat((qty + totalQty).toFixed(8))
          totalCost = parseFloat((cost + totalCost).toFixed(8))
        }else{
          let cost:number = parseFloat((price* qty).toFixed(8))
          totalQty = parseFloat((qty - totalQty).toFixed(8))
          totalCost = parseFloat((cost - totalCost).toFixed(8))
        }
      })

      const theCostPrice:number = Number((totalCost/totalQty).toFixed(8))

      //update
      let sql = `update trading_strategy set cost_price = "${theCostPrice}" WHERE asset = "${asset}"`;
      let result = await this.tradingStrategyRepo.query(sql);
      return result
    }else{
      return null
    }
  }
}
