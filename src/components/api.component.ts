import { Component, Injectable } from '@angular/core';
import axios from "axios";
import { AxiosInstance } from "axios";
import { ErrorHandler } from "@angular/core";
import { ErrorResponse } from "../models/error";

@Component({
    selector: 'app-api'
})

@Injectable({
    providedIn: "root"
})

export class ApiComponent {
    private errorHandler: ErrorHandler;

    constructor (
      private symbol: string,
      //private request: string,
      private frequency: string
    ) {}

    apiKey = "W4A7ACAND9TT2UTS";
    request = "TIME_SERIES_INTRADAY";

    public async getApiData() {
        var price = 0;
        await axios.get(`https://www.alphavantage.co/query?function=${this.request}&symbol=${this.symbol}&interval=1min&apikey=${this.apiKey}`)
        .then(async response => response.data)
        .then(async (data) => {
            price = await data[this.frequency][Object.keys(data[this.frequency])[0]]["4. close"];
            console.log('price:', price);
        }).catch((err) => {
            console.log(`${err}`);
            return(Promise.reject(this.normalizeError(err)));
        });

        return price;
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