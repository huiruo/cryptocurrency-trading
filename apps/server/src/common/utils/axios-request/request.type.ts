export interface ApiConfig {
  tickerPrice: string
}
export interface Options {
  [key: string]: string | boolean | object
}

export interface Result<T> {
  resultCode: string
  resultMsg: string
  data: T
}

export interface Api {
  // getSymbolsPrice: (symbols: string[]) => Promise<Result<SymbolsPrice[]>>
  getSymbolsPrice: (symbols: string[]) => Promise<SymbolsPrice[]>
}

export interface SymbolsPrice {
  symbol: string
  price: string
}
