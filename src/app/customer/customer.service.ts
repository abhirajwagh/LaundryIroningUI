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

  // Get customer profile
  GetCustomerProfile(customerId): Observable<any> {
    const url = CustomerUrlConstant.GetCustomerProfile + '?customerId=' + customerId;
    return this.httpService.getData(url);
  }

  // update customer profile
  UpdateCustomerProfile(users): Observable<any> {
    const url = CustomerUrlConstant.UpdateCustomerProfile;
    return this.httpService.postDataText(url, users);
  }
}


