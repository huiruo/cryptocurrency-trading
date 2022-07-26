const { validateRequiredParameters } = require('../helpers/validation')

/**
 * API sub account endpoints
 * @module SubAccount
 * @param {*} superclass
 */
const SubAccount = superclass => class extends superclass {
  /**
    * Query Sub-account List(For Master Account)<br>
    *
    * GET /sapi/v1/sub-account/list<br>
    *
    * {@link https://binance-docs.github.io/apidocs/spot/en/#query-sub-account-list-sapi-for-master-account}
    *
    * @param {object} [options]
    * @param {string} [options.email]
    * @param {string} [options.isFreeze] - true or false
    * @param {number} [options.page]
    * @param {number} [options.limit]
    * @param {number} [options.recvWindow] - The value cannot be greater than 60000
    */
  subAccountList (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/sub-account/list',
      options
    )
  }

  /**
   * Query Sub-account Transfer History(For Master Account)<br>
   *
   * GET /sapi/v1/sub-account/sub/transfer/history<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#query-sub-account-spot-asset-transfer-history-sapi-for-master-account}
   *
   * @param {object} [options]
   * @param {string} [options.fromEmail]
   * @param {string} [options.toEmail]
   * @param {number} [options.startTime]
   * @param {number} [options.endTime]
   * @param {number} [options.page]
   * @param {number} [options.limit]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  subAccountTransferHistory (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/sub-account/sub/transfer/history',
      options
    )
  }

  /**
    * Query Sub-account Assets(For Master Account)<br>
    *
    * GET /sapi/v3/sub-account/assets<br>
    *
    * {@link https://binance-docs.github.io/apidocs/spot/en/#query-sub-account-assets-for-master-account}
    *
    * @param {string} email
    * @param {object} [options]
    * @param {number} [options.recvWindow] - The value cannot be greater than 60000
    */
  subAccountAssets (email, options = {}) {
    validateRequiredParameters({ email })

    return this.signRequest(
      'GET',
      '/sapi/v3/sub-account/assets',
      Object.assign(options, { email })
    )
  }

  /**
   * Get Sub-account Deposit Address (For Master Account)<br>
   *
   * GET /sapi/v1/capital/deposit/subAddress<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-sub-account-deposit-address-for-master-account}
   *
   * @param {string} email
   * @param {string} coin
   * @param {object} [options]
   * @param {string} [options.network]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  subAccountDepositAddress (email, coin, options = {}) {
    validateRequiredParameters({ email, coin })

    return this.signRequest(
      'GET',
      '/sapi/v1/capital/deposit/subAddress',
      Object.assign(options, {
        email,
        coin
      })
    )
  }

  /**
   * Get Sub-account Deposit History (For Master Account)<br>
   *
   * GET /sapi/v1/capital/deposit/subHisrec<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-sub-account-deposit-address-for-master-account}
   *
   * @param {string} email
   * @param {object} [options]
   * @param {string} [options.coin]
   * @param {number} [options.status]
   * @param {number} [options.startTime]
   * @param {number} [options.endTime]
   * @param {number} [options.limit]
   * @param {number} [options.offset]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  subAccountDepositHistory (email, options = {}) {
    validateRequiredParameters({ email })

    return this.signRequest(
      'GET',
      '/sapi/v1/capital/deposit/subHisrec',
      Object.assign(options, { email })
    )
  }

  /**
   * Get Sub-account's Status on Margin/Futures(For Master Account)<br>
   *
   * GET /sapi/v1/sub-account/status<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-sub-account-39-s-status-on-margin-futures-for-master-account}
   *
   * @param {object} [options]
   * @param {string} [options.email]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  subAccountStatus (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/sub-account/status',
      options
    )
  }

  /**
   * Enable Margin for Sub-account (For Master Account)<br>
   *
   * POST /sapi/v1/sub-account/margin/enable<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#enable-margin-for-sub-account-for-master-account}
   *
   * @param {string} email - Sub-account email
   * @param {object} [options]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  subAccountEnableMargin (email, options = {}) {
    validateRequiredParameters({ email })

    return this.signRequest(
      'POST',
      '/sapi/v1/sub-account/margin/enable',
      Object.assign(options, {
        email
      })
    )
  }

  /**
   * Get Detail on Sub-account's Margin Account (For Master Account)<br>
   *
   * GET /sapi/v1/sub-account/margin/account<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-detail-on-sub-account-39-s-margin-account-for-master-account}
   *
   * @param {string} email
   * @param {object} [options]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  subAccountMarginAccount (email, options = {}) {
    validateRequiredParameters({ email })

    return this.signRequest(
      'GET',
      '/sapi/v1/sub-account/margin/account',
      Object.assign(options, {
        email
      })
    )
  }

  /**
   * Get Summary of Sub-account's Margin Account (For Master Account)<br>
   *
   * GET /sapi/v1/sub-account/margin/accountSummary<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-detail-on-sub-account-39-s-margin-account-for-master-account}
   *
   * @param {object} [options]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  subAccountMarginAccountSummary (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/sub-account/margin/accountSummary',
      options
    )
  }

  /**
   * Enable Futures for Sub-account (For Master Account)<br>
   *
   * GET /sapi/v1/sub-account/futures/enable<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#enable-futures-for-sub-account-for-master-account}
   *
   * @param {string} email
   * @param {object} [options]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  subAccountEnableFutures (email, options = {}) {
    validateRequiredParameters({ email })

    return this.signRequest(
      'POST',
      '/sapi/v1/sub-account/futures/enable',
      Object.assign(options, {
        email
      })
    )
  }

  /**
   * Get Detail on Sub-account's Futures Account (For Master Account)<br>
   *
   * GET /sapi/v1/sub-account/futures/account<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-detail-on-sub-account-39-s-futures-account-for-master-account}
   *
   * @param {string} email
   * @param {object} [options]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  subAccountFuturesAccount (email, options = {}) {
    validateRequiredParameters({ email })

    return this.signRequest(
      'GET',
      '/sapi/v1/sub-account/futures/account',
      Object.assign(options, {
        email
      })
    )
  }

  /**
   * Get Summary of Sub-account's Futures Account (For Master Account)<br>
   *
   * GET /sapi/v1/sub-account/futures/accountSummary<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-summary-of-sub-account-39-s-futures-account-for-master-account}
   *
   * @param {object} [options]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  subAccountFuturesAccountSummary (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/sub-account/futures/accountSummary',
      options
    )
  }

  /**
   * Get Futures Postion-Risk of Sub-account (For Master Account)<br>
   *
   * GET /sapi/v1/sub-account/futures/positionRisk<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-futures-postion-risk-of-sub-account-for-master-account}
   *
   * @param {string} email
   * @param {object} [options]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  subAccountFuturesPositionRisk (email, options = {}) {
    validateRequiredParameters({ email })

    return this.signRequest(
      'GET',
      '/sapi/v1/sub-account/futures/positionRisk',
      Object.assign(options, {
        email
      })
    )
  }

  /**
   * Futures Transfer for Sub-account(For Master Account)<br>
   *
   * POST /sapi/v1/sub-account/futures/transfer<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#futures-transfer-for-sub-account-for-master-account}
   *
   * @param {string} email
   * @param {string} asset
   * @param {number} amount
   * @param {number} type - 1: transfer from subaccount's spot account to its USDT-margined futures account
   * <br>2: transfer from subaccount's USDT-margined futures account to its spot account
   * <br>3: transfer from subaccount's spot account to its COIN-margined futures account
   * <br>4: transfer from subaccount's COIN-margined futures account to its spot account
   * @param {object} [options]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  subAccountFuturesTransfer (email, asset, amount, type, options = {}) {
    validateRequiredParameters({ email, asset, amount, type })

    return this.signRequest(
      'POST',
      '/sapi/v1/sub-account/futures/transfer',
      Object.assign(options, {
        email,
        asset,
        amount,
        type
      })
    )
  }

  /**
   * Margin Transfer for Sub-account(For Master Account)<br>
   *
   * POST /sapi/v1/sub-account/margin/transfer<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#margin-transfer-for-sub-account-for-master-account}
   *
   * @param {string} email
   * @param {string} asset
   * @param {number} amount
   * @param {number} type - 1: transfer from subaccount's spot account to margin account
   * <br>2: transfer from subaccount's margin account to its spot account
   * @param {object} [options]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000

   */
  subAccountMarginTransfer (email, asset, amount, type, options = {}) {
    validateRequiredParameters({ email, asset, amount, type })

    return this.signRequest(
      'POST',
      '/sapi/v1/sub-account/margin/transfer',
      Object.assign(options, {
        email,
        asset,
        amount,
        type
      })
    )
  }

  /**
   * Transfer to Sub-account of Same Master（For Sub-account）<br>
   *
   * POST /sapi/v1/sub-account/transfer/subToSub<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#transfer-to-sub-account-of-same-master-for-sub-account}
   *
   * @param {string} toEmail
   * @param {string} asset
   * @param {number} amount
   * @param {object} [options]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  subAccountTransferToSub (toEmail, asset, amount, options = {}) {
    validateRequiredParameters({ toEmail, asset, amount })

    return this.signRequest(
      'POST',
      '/sapi/v1/sub-account/transfer/subToSub',
      Object.assign(options, {
        toEmail,
        asset,
        amount
      })
    )
  }

  /**
   * Transfer to Master（For Sub-account）<br>
   *
   * POST /sapi/v1/sub-account/transfer/subToMaster<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#transfer-to-master-for-sub-account}
   *
   * @param {string} asset
   * @param {number} amount
   * @param {object} [options]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  subAccountTransferToMaster (asset, amount, options = {}) {
    validateRequiredParameters({ asset, amount })

    return this.signRequest(
      'POST',
      '/sapi/v1/sub-account/transfer/subToMaster',
      Object.assign(options, {
        asset,
        amount
      })
    )
  }

  /**
   * Sub-account Transfer History (For Sub-account)<br>
   *
   * GET /sapi/v1/sub-account/transfer/subUserHistory<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#sub-account-transfer-history-for-sub-account}
   *
   * @param {object} [options]
   * @param {string} [options.asset] - If not sent, result of all assets will be returned
   * @param {number} [options.type] - 1: transfer in, 2: transfer out
   * @param {number} [options.startTime]
   * @param {number} [options.endTime]
   * @param {number} [options.limit] - Default 500
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000

   */
  subAccountTransferSubAccountHistory (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/sub-account/transfer/subUserHistory',
      options
    )
  }

  /**
   * Query Sub-account Futures Asset Transfer History(For Master Account)<br>
   *
   * GET /sapi/v1/sub-account/futures/internalTransfer<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#query-sub-account-futures-asset-transfer-history-for-master-account}
   *
   * @param {string} email - Sub-account email
   * @param {number} futuresType - 1: USDT-margined Futures，2: Coin-margined Futures
   * @param {object} [options]
   * @param {number} [options.startTime] - Default return the history with in 100 days
   * @param {number} [options.endTime] - Default return the history with in 100 days
   * @param {number} [options.page] - Default value: 1
   * @param {number} [options.limit] - Default value: 50, Max value: 500
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  subAccountFuturesAssetTransferHistory (email, futuresType, options = {}) {
    validateRequiredParameters({ email, futuresType })
    return this.signRequest(
      'GET',
      '/sapi/v1/sub-account/futures/internalTransfer',
      Object.assign(options, {
        email,
        futuresType
      })
    )
  }

  /**
   * Sub-account Futures Asset Transfer(For Master Account)<br>
   *
   * POST /sapi/v1/sub-account/futures/internalTransfer<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#sub-account-futures-asset-transfer-for-master-account}
   *
   * @param {string} fromEmail - Sender email
   * @param {string} toEmail - Recipient email
   * @param {number} futuresType - 1: USDT-margined Futures，2: Coin-margined Futures
   * @param {string} asset
   * @param {number} amount
   * @param {object} [options]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000

   */
  subAccountFuturesAssetTransfer (fromEmail, toEmail, futuresType, asset, amount, options = {}) {
    validateRequiredParameters({ fromEmail, toEmail, futuresType, asset, amount })

    return this.signRequest(
      'POST',
      '/sapi/v1/sub-account/futures/internalTransfer',
      Object.assign(options, {
        fromEmail,
        toEmail,
        futuresType,
        asset,
        amount
      })
    )
  }

  /**
   * Query Sub-account Spot Assets Summary (For Master Account)<br>
   *
   * GET /sapi/v1/sub-account/spotSummary<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#query-sub-account-spot-assets-summary-for-master-account}
   *
   * @param {object} [options]
   * @param {string} [options.email] - Sub account email
   * @param {number} [options.page] - default 1
   * @param {number} [options.size] - default 10, max 20
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  subAccountSpotSummary (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/sub-account/spotSummary',
      options
    )
  }

  /**
   * Create a Virtual Sub-account(For Master Account)<br>
   *
   * POST /sapi/v1/sub-account/virtualSubAccount<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#create-a-virtual-sub-account-for-master-account}
   *
   * @param {string} subAccountString
   * @param {object} [options]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  subAccountCreation (subAccountString, options = {}) {
    validateRequiredParameters({ subAccountString })
    return this.signRequest(
      'POST',
      '/sapi/v1/sub-account/virtualSubAccount',
      Object.assign(options, { subAccountString })
    )
  }

  /**
   * Enable Leverage Token for Sub-account (For Master Account)<br>
   *
   * POST /sapi/v1/sub-account/blvt/enable<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#enable-leverage-token-for-sub-account-for-master-account}
   *
   * @param {string} email
   * @param {boolean} enableBlvt
   * @param {object} [options]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  subAccountLeverageToken (email, enableBlvt, options = {}) {
    validateRequiredParameters({ email, enableBlvt })
    return this.signRequest(
      'POST',
      '/sapi/v1/sub-account/blvt/enable',
      Object.assign(options, { email, enableBlvt })
    )
  }

  /**
   * Deposit assets into the managed sub-account（For Investor Master Account)<br>
   *
   * POST /sapi/v1/managed-subaccount/deposit<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#deposit-assets-into-the-managed-sub-account-for-investor-master-account}
   *
   * @param {string} toEmail
   * @param {string} asset
   * @param {number} amount
   * @param {object} [options]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  managedSubAccountDeposit (toEmail, asset, amount, options = {}) {
    validateRequiredParameters({ toEmail, asset, amount })
    return this.signRequest(
      'POST',
      '/sapi/v1/managed-subaccount/deposit',
      Object.assign(options, { toEmail, asset, amount })
    )
  }

  /**
   * Query managed sub-account asset details（For Investor Master Account)<br>
   *
   * GET /sapi/v1/managed-subaccount/asset<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#query-managed-sub-account-asset-details-for-investor-master-account}
   *
   * @param {string} email
   * @param {object} [options]
   * @param {number} [options.recvWindow]
   */
  managedSubAccountAssets (email, options = {}) {
    validateRequiredParameters({ email })
    return this.signRequest(
      'GET',
      '/sapi/v1/managed-subaccount/asset',
      Object.assign(options, { email })
    )
  }

  /**
   * Withdrawl assets from the managed sub-account（For Investor Master Account)<br>
   *
   * POST /sapi/v1/managed-subaccount/withdraw<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#withdrawl-assets-from-the-managed-sub-account-for-investor-master-account}
   *
   * @param {string} fromEmail
   * @param {string} asset
   * @param {number} amount
   * @param {object} [options]
   * @param {number} [options.transferDate] - Withdrawals is automatically occur on the transfer date(UTC0).
   * <br>If a date is not selected, the withdrawal occurs right now
   * @param {number} [options.recvWindow]
   */
  managedSubAccountWithdraw (fromEmail, asset, amount, options = {}) {
    validateRequiredParameters({ fromEmail, asset, amount })
    return this.signRequest(
      'POST',
      '/sapi/v1/managed-subaccount/withdraw',
      Object.assign(options, { fromEmail, asset, amount })
    )
  }
}

module.exports = SubAccount
export {}