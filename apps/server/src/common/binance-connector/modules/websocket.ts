import { validateRequiredParameters } from '../helpers/validation'
import { isEmptyValue } from '../helpers/utils'

const WebSocketClient = require('ws')

/**
 * API websocket endpoints
 * @module Websocket
 * @param {*} superclass
 */
export const Websocket = superclass => class extends superclass {
  constructor(options) {
    super(options)
    this.wsURL = options.wsURL || 'wss://stream.binance.com:9443'
    this.reconnectDelay = 5000
  }

  /**
   * Aggregate Trade Streams<br>
   *
   * The Aggregate Trade Streams push trade information that is aggregated for a single taker order.<br>
   *
   * Stream Name: &lt;symbol&gt;@aggTrade <br>
   * Update Speed: Real-time<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#aggregate-trade-streams}
   *
   * @param {string} symbol
   */
  aggTradeWS(symbol, callbacks) {
    validateRequiredParameters({ symbol })
    const url = `${this.wsURL}/ws/${symbol.toLowerCase()}@aggTrade`
    return this.subscribe(url, callbacks)
  }

  /**
   * Trade Streams<br>
   *
   * The Trade Streams push raw trade information; each trade has a unique buyer and seller.<br>
   *
   * Stream Name: &lt;symbol&gt;@trade <br>
   * Update Speed: Real-time<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#trade-streams}
   *
   * @param {string} symbol
   */
  tradeWS(symbol, callbacks) {
    validateRequiredParameters({ symbol })
    const url = `${this.wsURL}/ws/${symbol.toLowerCase()}@trade`
    return this.subscribe(url, callbacks)
  }

  /**
   * Kline/Candlestick Streams<br>
   *
   * The Kline/Candlestick Stream push updates to the current klines/candlestick every second.<br>
   *
   * Stream Name: &lt;symbol&gt;@kline_&lt;interval&gt; <br>
   * Update Speed: 2000ms <br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#kline-candlestick-streams}
   *
   * @param {string} symbol
   * @param {string} interval - m -> minutes; h -> hours; d -> days; w -> weeks; M -> months:<br>
   *     1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 8h, 12h, 1d, 3d, 1w, 1M
   */
  klineWS(symbol, interval, callbacks) {
    validateRequiredParameters({ symbol, interval })

    const url = `${this.wsURL}/ws/${symbol.toLowerCase()}@kline_${interval}`
    return this.subscribe(url, callbacks)
  }

  /**
   * Individual symbol or all symbols mini ticker<br>
   *
   * 24hr rolling window mini-ticker statistics.<br>
   * These are NOT the statistics of the UTC day, but a 24hr rolling window for the previous 24hrs<br>
   *
   * Stream Name: &lt;symbol&gt;@miniTicker or !miniTicker@arr <br>
   * Update Speed: 1000ms <br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#individual-symbol-mini-ticker-stream}
   * <br>
   * {@link https://binance-docs.github.io/apidocs/spot/en/#all-market-mini-tickers-stream}
   *
   * @param {string} [symbol]
   */
  miniTickerWS(symbol = null, callbacks) {
    let path = '!miniTicker@arr'
    if (!isEmptyValue(symbol)) {
      path = `${symbol.toLowerCase()}@miniTicker`
    }
    const url = `${this.wsURL}/ws/${path}`
    return this.subscribe(url, callbacks)
  }

  /**
   * Individual symbol or all symbols ticker<br>
   *
   * 24hr rollwing window ticker statistics for a single symbol.<br>
   * These are NOT the statistics of the UTC day, but a 24hr rolling window for the previous 24hrs.<br>
   *
   * Stream Name: &lt;symbol&gt;@ticker or !ticker@arr <br>
   * Update Speed: 1000ms<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#individual-symbol-ticker-streams}
   * <br>
   * {@link https://binance-docs.github.io/apidocs/spot/en/#all-market-tickers-stream}
   *
   * @param {string} [symbol]
   *
   */
  tickerWS(symbol = null, callbacks) {
    let path = '!ticker@arr'
    if (!isEmptyValue(symbol)) {
      path = `${symbol.toLowerCase()}@ticker`
    }
    const url = `${this.wsURL}/ws/${path}`
    return this.subscribe(url, callbacks)
  }

  /**
   * Individual symbol or all rolling window statistics ticker<br>
   *
   * Rolling window ticker statistics, computed over multiple windows.<br>
   *
   * Stream Name: &lt;symbol&gt;@ticker_&lt;window_size&gt; or !ticker_&lt;window_size&gt;@arr <br>
   * Window Sizes: 1h,4h <br>
   * Update Speed: 1000ms <br>
   *
   * Note: This stream is different from the &lt;symbol&gt;@ticker stream. The open time O always starts on a minute, while the closing time C is the current time of the update.
   *
   * As such, the effective window might be up to 59999ms wider that &lt;window_size&gt;.
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#individual-symbol-rolling-window-statistics-streams}
   * <br>
   * {@link https://binance-docs.github.io/apidocs/spot/en/#all-market-rolling-window-statistics-streams}
   *
   * @param {string} [windowSize]
   * @param {string} [symbol]
   *
   */
  rollingWindowTickerWS(windowSize, symbol = null, callbacks) {
    let path = `!ticker_${windowSize.toLowerCase()}@arr`
    if (!isEmptyValue(symbol)) {
      path = `${symbol.toLowerCase()}@ticker_${windowSize.toLowerCase()}`
    }
    const url = `${this.wsURL}/ws/${path}`
    return this.subscribe(url, callbacks)
  }

  /**
   * Individual symbol or all symbols book ticker<br>
   *
   * Pushes any update to the best bid or ask's price or quantity in real-time.<br>
   *
   * Stream Name: &lt;symbol&gt;@bookTicker or !bookTicker <br>
   * Update Speed: Real-time<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#individual-symbol-book-ticker-streams}
   * <br>
   * {@link https://binance-docs.github.io/apidocs/spot/en/#all-book-tickers-stream}
   *
   * @param {string} [symbol]
   */
  bookTickerWS(symbol = null, callbacks) {
    let path = '!bookTicker'
    if (!isEmptyValue(symbol)) {
      path = `${symbol.toLowerCase()}@bookTicker`
    }
    const url = `${this.wsURL}/ws/${path}`
    return this.subscribe(url, callbacks)
  }

  /**
   * Partial Book Depth Streams<br>
   *
   * Top bids and asks, Valid are 5, 10, or 20.<br>
   *
   * Stream Names: &lt;symbol&gt;@depth&lt;levels&gt; or &lt;symbol&gt;@depth&lt;levels&gt;@100ms. <br>
   * Update Speed: 1000ms or 100ms<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#partial-book-depth-streams}
   *
   * @param {string} symbol
   * @param {string} levels - 5, 10, or 20
   * @param {string} speed - 1000ms or 100ms
   *
   */
  partialBookDepth(symbol, levels, speed, callbacks) {
    validateRequiredParameters({ symbol, levels, speed })

    const url = `${this.wsURL}/ws/${symbol.toLowerCase()}@depth${levels}@${speed}`
    return this.subscribe(url, callbacks)
  }

  /**
   * Diff. Depth Stream<br>
   *
   * Order book price and quantity depth updates used to locally manage an order book.<br>
   *
   * Stream Names: &lt;symbol&gt;@depth or &lt;symbol&gt;@depth@100ms <br>
   * Update Speed: 1000ms or 100ms<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#diff-depth-stream}
   *
   * @param {string} symbol
   * @param {string} speed - 1000ms or 100ms
   *
   */
  diffBookDepth(symbol, speed, callbacks) {
    validateRequiredParameters({ symbol, speed })

    const url = `${this.wsURL}/ws/${symbol.toLowerCase()}@depth@${speed}`
    return this.subscribe(url, callbacks)
  }

  /**
   * Listen to User data stream<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#user-data-streams}
   *
   * @param {string} listenKey
   */
  userData(listenKey, callbacks) {
    validateRequiredParameters({ listenKey })

    const url = `${this.wsURL}/ws/${listenKey}`
    return this.subscribe(url, callbacks)
  }

  /**
   * Listen to market streams<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#websocket-market-streams}
   *
   * @param {array} streams
   *
   * e.g. client.combinedStreams(['btcusdt@miniTicker', 'ethusdt@ticker'], callbacks)
   */
  combinedStreams(streams, callbacks) {
    if (!Array.isArray(streams)) {
      streams = [streams]
    }

    const url = `${this.wsURL}/stream?streams=${streams.join('/')}`
    return this.subscribe(url, callbacks)
  }

  subscribe(url, callbacks) {
    const wsRef = {} as any
    wsRef.closeInitiated = false
    const initConnect = () => {
      const ws = new WebSocketClient(url)
      wsRef.ws = ws

      ws.on('open', () => {
        this.logger.info(`Connected to the Websocket Server: ${url}`)
        callbacks.open && callbacks.open()
      })

      // handle data message. Pass the data to the call back method from user
      // It could be useful to store the original messages from server for debug
      ws.on('message', data => {
        callbacks.message && callbacks.message(data.toString())
      })

      ws.on('ping', () => {
        // As ping pong is very important for maintaining the connection, log them as INFO level
        this.logger.info('Received PING from server')
        callbacks.ping && callbacks.ping()
        ws.pong()
        this.logger.info('Responded PONG to server\'s PING message')
      })

      ws.on('pong', () => {
        this.logger.info('Received PONG from server')
        callbacks.pong && callbacks.pong()
      })

      ws.on('error', err => {
        this.logger.error('Received error from server')
        callbacks.error && callbacks.error()
        this.logger.error(err)
      })

      ws.on('close', (closeEventCode, reason) => {
        if (!wsRef.closeInitiated) {
          this.logger.error(`Connection close due to ${closeEventCode}: ${reason}.`)
          setTimeout(() => {
            this.logger.debug('Reconnect to the server.')
            initConnect()
          }, this.reconnectDelay)
        } else {
          wsRef.closeInitiated = false
        }
      })
    }
    this.logger.debug(`Connecting to: ${url}`)
    initConnect()
    return wsRef
  }

  /**
   * Unsubscribe the stream <br>
   *
   * @param {WebSocketClient} wsRef - websocket client instance created by ws package
   */
  unsubscribe(wsRef) {
    if (!wsRef || !wsRef.ws) this.logger.warn('No connection to close.')
    else {
      wsRef.closeInitiated = true
      wsRef.ws.close()
      this.logger.info('Disconnected with the Websocket Server')
    }
  }

  /**
   * Send Ping message to the Websocket Server <br>
   *
   * @param {WebSocketClient} wsRef - websocket client instance created by ws package
   */
  pingServer(wsRef) {
    if (!wsRef || !wsRef.ws || wsRef.ws.readyState !== WebSocketClient.OPEN) this.logger.warn('Ping only can be sent when connection is ready.')
    else {
      this.logger.info('Send PING to the Websocket Server')
      wsRef.ws.ping()
    }
  }
}
