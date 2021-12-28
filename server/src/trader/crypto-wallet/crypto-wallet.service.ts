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
      // console.log("updateCryptoWallet---->update2",result)

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
  Export API: Query wallet from local Databasce
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
    console.log("tradingStrategy",tradingStrategy)
    return tradingStrategy[0];
  }

  /*
  Export API/Util method: 更新策略 
  */
  async updateTradingStrategy(symbol: string,asset: string){
    const assetWallet = await this.findCryptoWalletByAsset(asset)
    const { free:quantity } = assetWallet

    //and qty = 0.00295000 这里只是写死测试，后面具体得改
    const findFirstOredrsql = `select * from mytrades where symbol='${symbol}' and qty = 0.00295000`
    const myTrade:MyTrades[] = await this.myTradesRepo.query(findFirstOredrsql);
    //end

    if(myTrade){
      //根据起始订单---->查询到策略订单区间--->得出操作订单信息
      const { id:first_order_id, price:first_order_price, time} = myTrade[0]
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
        let sql = `update trading_strategy set quantity = "${strategyRow.quantity}",first_order_id = "${first_order_id}", first_order_price = ${first_order_price},
        last_order_id = "${last_order_id}", last_order_price = ${last_order_price} WHERE asset = "${asset}"`;
        result = await this.tradingStrategyRepo.query(sql);
      }else{
        //insert
        result = await this.tradingStrategyRepo.save(strategyRow) 
        console.log("insert result",result)
      }

      return result;
    }
    return null;
  }

  /*
  Export API: Calculate the hold symbol cost price 
  */
  async CALC_holdCostprice(symbol:string,asset: string){
    /*
    return cryptoWalletByAsset:
    {
        "id": "45e75574-918f-4d9c-abcb-7cbac4d2d44b",
        "asset": "BTC",
        "free": "0.02723005",
        "locked": "0.00000000",
        "updateTime": "1639897104628"
    }
    */
    const assetWallet = await this.findCryptoWalletByAsset(asset)
    const symbolTrades:MyTrades[] = await this.getMyTradesBySymbol(symbol)

    const tradesQty2= symbolTrades.filter(item=>{
      return !item.isBuyer
    })
    const tradesQty3= symbolTrades.filter(item=>{
      return item.isBuyer
    })

    const tradesQty= symbolTrades.map(item=>{
      return {
        isBuyer:item.isBuyer,
        qty:item.qty,
        qtyC:Number(item.qty)*1000,
        qtyF:parseFloat(Number(item.qty).toFixed(8))
      }
    })

    //计算订单 start
    const { free } = assetWallet
    const targetOrder :MyTrades[]= []
    // const targetFree:bigint =BigInt(free)
    // const targetFree:number =Number(free)*1000
    const targetFree:number =Number(free);
    let calculatingFree:number =0
    /*
    symbolTrades.forEach(item=>{

      if(item.isBuyer){
        calculatingFree = calculatingFree + Number(item.qty)*1000
        console.log("买入A----》计算后",calculatingFree)
        console.log("=============分割线")
      }else{
        calculatingFree = calculatingFree - Number(item.qty)*1000
        console.log("买出B----》计算后",calculatingFree)
        console.log("=============分割线")
      }
    })
    */
    //计算订单 end
    const test1 = 0.0091
    const test2 = 0.00028
    console.log("结果a",test1+test2)
    console.log("结果b",test1.toFixed(8)+test2.toFixed(8))
    console.log("结果c",(test1+test2).toFixed(8))
    console.log("结果d",Number((test1+test2).toFixed(8)))
    console.log("结果e",parseFloat((test1+test2).toFixed(8)))
    const v1 = 0.00145217
    const v2 = 0.00054576
    const testInint = Number((v1+v2).toFixed(8))
    calculatingFree = calculatingFree + testInint
    console.log("结果f",testInint)
    console.log("结果g",calculatingFree)

    tradesQty.forEach(item=>{
      if(item.isBuyer){
        console.log("计算前:",calculatingFree,)
        calculatingFree = Number((calculatingFree + item.qtyF).toFixed(8))
        console.log(item.qtyF+"买入A----》计算后:",calculatingFree)
        console.log("=============分割线")
      }else{
        console.log("计算前:",calculatingFree,)
        calculatingFree = Number((calculatingFree - item.qtyF).toFixed(8))
        console.log(item.qtyF+"买出B----》计算后:",calculatingFree)
        console.log("=============分割线")
      }
    })

    // return {free,symbolTrades,tradesQty,tradesQty2};
    // return {free,tradesQty,tradesQty2,tradesQty3};
    return {free,targetFree,tradesQty};
  }
}
