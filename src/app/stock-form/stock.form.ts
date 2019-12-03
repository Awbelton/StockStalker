import { Component, OnInit } from '@angular/core';
import { ErrorHandler } from "@angular/core";
import { ErrorResponse } from "../../models/error";
import { ApiComponent } from '../../components/api.component';
import { NgForm, Validators, FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { StockTable } from '../stock-table/stock.table';

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
    public stockTable = new StockTable();
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

    async onSubmit() {
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
        console.log('SUCCESS!!\n\n' + JSON.stringify(this.stockForm.value, null, 4));
        console.log(this.symbols);

        // call api
        this.price = await this.apiCall(this.symbol, this.frequency);

        console.log('returned price is', this.price);

        // something went wrong
        if (this.price <= 0) {
            // throw error
        }

        // send to stock-table
        await this.addToTable(this.symbol, this.price);    
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

    async apiCall(sym: string, freq: string) {
        return new ApiComponent(sym, freq).getApiData();
    }

    async addToTable(sym: string, price: number) {
        await this.stockTable.addStockData(sym, price);
    }
}