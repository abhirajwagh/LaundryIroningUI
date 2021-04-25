import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerUrlConstant, IroningUrlConstant } from 'src/app/Constants/Url.Constants';
import { HttpService } from 'src/app/Services/HttpService.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

constructor(private httpService: HttpService) { }

  // add ironing order details
  AddIroningOrder(Ironingorder): Observable<any> {
    const url = IroningUrlConstant.AddIroningOrder;
    return this.httpService.postDataText(url, Ironingorder);
  }

  // Get order details
  GetCustomerOrderHistory(customerId, noOfDays): Observable<any> {
    const url = CustomerUrlConstant.GetAllOrdersForCustomer + '?customerId=' + customerId + '&noOfDays=' + noOfDays;
    return this.httpService.getData(url);
  }
}


