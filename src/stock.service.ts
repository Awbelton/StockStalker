import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Stock } from './models/stock';
import { FormService } from './form.service';

@Injectable({ providedIn: 'root' })
export class StockService {
    private stocksUrl = 'api/stocks';  // URL to web api

    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  
    constructor(
      private http: HttpClient,
      private formService: FormService) { }
  
    /** GET stocks from the server */
    getStocks(): Observable<Stock[]> {
      return this.http.get<Stock[]>(this.stocksUrl)
        .pipe(
          tap(_ => this.log('fetched stocks')),
          catchError(this.handleError<Stock[]>('getStocks', []))
        );
    }

    /** GET stock by id. Return `undefined` when id not found */
    getStockNo404<Data>(id: number): Observable<Stock> {
        const url = `${this.stocksUrl}/?id=${id}`;
        return this.http.get<Stock[]>(url)
        .pipe(
            map(stocks => stocks[0]), // returns a {0|1} element array
            tap(h => {
            const outcome = h ? `fetched` : `did not find`;
            this.log(`${outcome} stock id=${id}`);
            }),
            catchError(this.handleError<Stock>(`getStock id=${id}`))
        );
    }

    /** GET stock by id. Will 404 if id not found */
    getStock(id: number): Observable<Stock> {
        const url = `${this.stocksUrl}/${id}`;
        return this.http.get<Stock>(url).pipe(
            tap(_ => this.log(`fetched stock id=${id}`)),
            catchError(this.handleError<Stock>(`getStock id=${id}`))
        );
    }

    /* GET stocks whose name contains search symbol */
    searchStocks(sym: string): Observable<Stock[]> {
        if (!sym.trim()) {
            // if not search term, return empty stocks array.
            return of([]);
        }
        return this.http.get<Stock[]>(`${this.stocksUrl}/?name=${sym}`).pipe(
            tap(_ => this.log(`found stocks matching "${sym}"`)),
            catchError(this.handleError<Stock[]>('searchStocks', []))
        );
    }

  //////// Save methods //////////

  /** POST: add a new stock to the server */
  addStock (stock: Stock): Observable<Stock> {
    return this.http.post<Stock>(this.stocksUrl, stock, this.httpOptions).pipe(
      tap((newStock: Stock) => this.log(`added stock w/ id=${newStock.id}`)),
      catchError(this.handleError<Stock>('addStock'))
    );
  }

  /** DELETE: delete the stock from the server */
  deleteStock (stock: Stock | number): Observable<Stock> {
    const id = typeof stock === 'number' ? stock : stock.id;
    const url = `${this.stocksUrl}/${id}`;

    return this.http.delete<Stock>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted stock id=${id}`)),
      catchError(this.handleError<Stock>('deleteStock'))
    );
  }

  /** PUT: update the stock on the server */
  updateStock (stock: Stock): Observable<any> {
    return this.http.put(this.stocksUrl, stock, this.httpOptions).pipe(
      tap(_ => this.log(`updated stock id=${stock.id}`)),
      catchError(this.handleError<any>('updateStock'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a StockService field with the FormService */
  private log(field: string) {
    this.formService.add(`StockService: ${field}`);
  }
}