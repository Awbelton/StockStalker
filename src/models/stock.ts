export interface Stock {
    id: number;
    request?: string;
    symbol: string;
    frequency?: string;
    price?: number;
    stocks?: object[]
  }