import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IroningLaundryUrlConstant } from '../Constants/Url.Constants';
import { HttpService } from '../Services/HttpService.service';

@Injectable({
  providedIn: 'root'
})
export class IroningLaundryService {

constructor(private httpService: HttpService) { }

  // add ironing laundry order details
  AddIroningLaundryOrder(ironingLaundryOrder): Observable<any> {
    const url = IroningLaundryUrlConstant.AddIroningLaundryOrder;
    return this.httpService.postDataText(url, ironingLaundryOrder);
  }

  // Get order details
  GetOrderDetailsById(OrderId): Observable<any> {
    const url = IroningLaundryUrlConstant.GetIroningLaundryOrderById + '?orderId=' + OrderId;
    return this.httpService.getData(url);
  }
}


