import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WalletInfo } from './crypto-info.entity'
import { CryptoWallet } from './crypto_wallet.entity'
import { cryptoWalletType } from '../../common/types'
import { balancesType } from '../../common/types'
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CryptoWalletService {
  constructor(
    @InjectRepository(WalletInfo) private readonly walletInfoRepo: Repository<WalletInfo>,  
    @InjectRepository(CryptoWallet) private readonly cryptoWallet: Repository<CryptoWallet>,  
  ) { }

  /*
  Binance wallet write into Databasce
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

  private async updateCryptoWalletRow(cryptoWalletRow:balancesType) {

    const { asset,free,locked,updateTime } = cryptoWalletRow

    const cryptoWalletByAsset = await this.findCryptoWallet(asset)

    if (cryptoWalletByAsset) {
      //update
      let sql = `update crypto_wallet set asset = "${asset}",free = "${free}",locked = "${locked}", updateTime = ${updateTime}
      WHERE id = "${cryptoWalletByAsset.id}"`;
      const result = await this.cryptoWallet.query(sql);
      console.log("update----->",cryptoWalletRow.asset,'-',result)
    }else{
      //insert
      const result = await this.cryptoWallet.save(cryptoWalletRow) 
      console.log("insert----->",result)
    }
  }

  private async findCryptoWallet(asset:string): Promise<CryptoWallet> {
    const sql = `select * from crypto_wallet where asset='${asset}'`
    const cryptoWalletByAsset = await this.cryptoWallet.query(sql);
    return cryptoWalletByAsset[0];
  }

  private async findWalletInfo(): Promise<WalletInfo> {
    const theWalletInfo = await this.walletInfoRepo.findOne();
    return theWalletInfo;
  }

  /*
  Binance wallet write into Databasce
  */
  async getCryptoWallet():Promise<CryptoWallet>{
    const sql = `select * from crypto_wallet;`
    const cryptoWalletByAsset = await this.cryptoWallet.query(sql);
    return cryptoWalletByAsset;
  }
}
