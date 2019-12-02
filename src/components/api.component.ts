import { Component, Injectable } from '@angular/core';
import axios from "axios";
import { AxiosInstance } from "axios";
import { ErrorHandler } from "@angular/core";
import { Stock } from "../models/stock";
import { ErrorResponse } from "../models/error";

@Component({
    selector: 'app-api'
})

@Injectable({
    providedIn: "root"
})

export class ApiComponent {
    private axiosClient: AxiosInstance;
    private errorHandler: ErrorHandler;

    constructor (
      private symbol: string,
      //private request: string,
      private frequency: string
    ) {}

    apiKey = "W4A7ACAND9TT2UTS";
    price = "0";
    request = "TIME_SERIES_INTRADAY";

    public getApiData() {
        axios.get(`https://www.alphavantage.co/query?function=${this.request}&symbol=${this.symbol}&interval=1min&apikey=${this.apiKey}`)
        .then(response => response.data)
        .then((data) => {
            this.price = data[this.frequency][Object.keys(data[this.frequency])[0]]["4. close"];
            console.log('price:', this.price);
            return this.price;
        }).catch((err) => {
            console.log(`${err}`);
            return(Promise.reject(this.normalizeError(err)));
        });

        return 0;
    }

    private normalizeError(error: any) : ErrorResponse {
        this.errorHandler.handleError(error);
        return({
            id: "-1",
            code: "UnknownError",
            message: "An unexpected error occurred."
        });
    }
}