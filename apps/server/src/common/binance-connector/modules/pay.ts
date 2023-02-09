/**
 * API Pay endpoints
 * @module Pay
 * @param {*} superclass
 */
export const Pay = superclass => class extends superclass {
  /**
   * Get Pay Trade History (USER_DATA)<br>
   *
   * GET /sapi/v1/pay/transactions<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-pay-trade-history-user_data}
   *
   * @param {object} [options]
   * @param {number} [options.startTime]
   * @param {number} [options.endTime]
   * @param {number} [options.limit] - default 100, max 100
   * @param {number} [options.recvWindow]
   *
   */
  payHistory(options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/pay/transactions',
      options
    )
  }
}
