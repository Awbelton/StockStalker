export interface Stock {
    request: string;
    symbol: string;
    frequency: string;
    price?: number;
    stocks?: object[]
  }