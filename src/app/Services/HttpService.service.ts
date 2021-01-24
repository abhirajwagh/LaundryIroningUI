import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) { }

  getData(uri: string): Observable<any> {
    return this.http.get(uri);
  }

  getDataWithOption(uri: string, option?: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const options = {
      headers: headers
    };
    return this.http.get(uri, option);
  }

  getDataText(uri: string): Observable<any> {
    return this.http.get(uri, { responseType: 'text' });
  }

  putData(uri: string, inputData: any): Observable<any> {
    return this.http.put(uri, inputData)
      .pipe(
        catchError(this.handleError)
      );
  }
  putDataText(uri: string, inputData: any): Observable<any> {
    return this.http.put(uri, inputData, { responseType: 'text' })
      .pipe(
        catchError(this.handleError)
      );
  }

  patchData(uri: string, inputData: any): Observable<any> {
    return this.http.patch(uri, inputData)
      .pipe(
        catchError(this.handleError)
      );
  }
  postData(uri: string, inputData: any): Observable<any> {
    return this.http.post(uri, inputData).pipe(
      catchError(this.handleError)
    );
  }

  postDataText(uri: string, inputData: any): Observable<any> {
    return this.http.post(uri, inputData, { responseType: 'text'}).pipe(
      catchError(this.handleError)
    );
  }

  postDataTextAndBlob(uri: string, inputData: any): Observable<any> {
    return this.http.post(uri, inputData,{ responseType: 'blob'}).pipe(
      catchError(this.handleError)
    );
  }

  postDataWithContentType(uri: string, inputData: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const options = {
      headers: headers
    };
    return this.http.post(uri, inputData, options).pipe(
      catchError(this.handleError)
    );
  }

  postDataWithOptions(uri: string, inputData: any, option?: any): Observable<any> {
    return this.http.post(uri, inputData, option).pipe(
      catchError(this.handleError)
    );
  }

  deleteData(uri: string, id: string): Observable<{}> {
    const url = `${uri}${id}`; // DELETE api/heroes/42
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError)
      );
  }
  deleteDataWithInputObj(uri: string, id: any): Observable<{}> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }),
      body: id,
    };
    const url = `${uri}`;
    return this.http.delete(url, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteDataText(uri: string, id: string): Observable<{}> {
    const url = `${uri}${id}`; // DELETE api/heroes/42
    return this.http.delete(url, { responseType: 'text' })
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteDataUsingQueryParameter(uri: string): Observable<{}> {
    return this.http.delete(uri, { responseType: 'text' })
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteDataUsingKey(uri: string, key: string, id: string): Observable<{}> {
    // const url = `${uri}/${id}`; // DELETE api/heroes/42
    const url = `${uri}` + key + `${id}`;
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  getFile(uri: string): Observable<any> {
    return this.http.get(uri, { responseType: 'blob' });

  }

  getFileWithInputData(uri: string, inputData: any): Observable<any> {
    return this.http.post(uri, inputData, { responseType: 'blob' });
  }

  async  postFile(url: string, formData: FormData): Promise<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return await this.http.post(url, formData, { headers: headers }).toPromise();
  }

  async postFileAndGetFile(url: string, formData: FormData): Promise<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return await this.http.post(url, formData, { headers: headers, responseType: 'blob' }).toPromise();
  }

  private handleError(error: HttpErrorResponse) {
    if (error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      // this.logger.error(error.message);
    } else if(typeof(error)=='object')
    {
      return throwError(error || 'Server Error');
    }
    else
    {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      // this.logger.error(`Backend returned code ${error.status}, ` +
      //   `body was: ${error.message}`);
    }
    // return an ErrorObservable with a user-facing error message
    return throwError(error || 'Server Error')
  }
}
