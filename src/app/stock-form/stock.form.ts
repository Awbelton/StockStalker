import { Component, OnInit } from '@angular/core';
import { ErrorHandler } from "@angular/core";
import { ErrorResponse } from "../../models/error";
import { ApiComponent } from '../../components/api.component';
import { NgForm, Validators, FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-stock-form',
  templateUrl: 'stock.form.html',
  styleUrls: ['stock.form.scss']
})

export class StockForm implements OnInit {
    public stockForm;
    public submitted = false;
    private errorHandler: ErrorHandler;
    public request = "TIME_SERIES_INTRADAY"; // hard coded for now
    public price;
    public symbol;
    public frequency;
    public frequencies = [ 1, 5, 10, 30, 60, 120, 240 ];
    public symbols: {
        name: string;
        price: number;
      }[];

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.stockForm = this.formBuilder.group({
            //symbols: new FormArray([]),
            symbol: new FormControl(this.symbol, [
                Validators.required,
                Validators.maxLength(4)
              ]),
            frequency: new FormControl(this.frequency, Validators.required)
        });

        this.symbols = [];
    }

    get f() { return this.stockForm.controls; }
    get t() { return this.f.symbols as FormArray; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.stockForm.invalid) {
            return;
        }

        // push into symbols array
        this.symbols.push(this.stockForm.value.symbol.toUpperCase());
        this.symbol = this.stockForm.value.symbol;
        this.frequency = this.stockForm.value.frequency;

        // display form values on success
        console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.stockForm.value, null, 4));
        console.log(this.symbols);

        // call api
        var res = this.apiCall(this.symbol, this.frequency);

        setTimeout(function(){ console.log(res); }, 1000);     
    }

    onReset() {
        // reset whole form back to initial state
        this.submitted = false;
        this.stockForm.reset();
        this.t.clear();
    }

    onClear() {
        // clear errors and reset ticket fields
        this.submitted = false;
        this.t.reset();
    }

    submittedForm(form: NgForm) {
        console.log('form');
        console.log(form.value);
    }

    onChangeFrequency(e) {
        console.log(e);
    }

    apiCall(sym: string, freq: string) {
        return new ApiComponent(sym, freq).getApiData();
    }

/*     getStockInfo(symbol, frequency) {
        console.log("getting stock info!");
        if (!symbol) {
            return(Promise.reject(this.normalizeError("Symbol is required.")));
        }
        
        if (!frequency) {
            return(Promise.reject(this.normalizeError("Frequency is required.")));
        }

        if (symbol && frequency) {
            const api = new ApiComponent(symbol, this.request, frequency);
            this.price = api.getApiData();
            this.symbol = symbol;
        }
    };

    private normalizeError(error: any) : ErrorResponse {
        this.errorHandler.handleError(error);
        return({
            id: "-1",
            code: "Form Input Error.",
            message: error
        });
    } */
}