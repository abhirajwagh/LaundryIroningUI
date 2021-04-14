import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IroningUrlConstant } from 'src/app/Constants/Url.Constants';
import { HttpService } from 'src/app/Services/HttpService.service';

@Injectable({
  providedIn: 'root'
})
export class IroningService {

constructor(private httpService: HttpService) { }

  // add ironing order details
  AddIroningOrder(Ironingorder): Observable<any> {
    const url = IroningUrlConstant.AddIroningOrder;
    return this.httpService.postDataText(url, Ironingorder);
  }

  // Get order details
  GetOrderDetailsById(OrderId): Observable<any> {
    const url = IroningUrlConstant.GetIroningOrderById + '?orderId=' + OrderId;
    return this.httpService.getData(url);
  }
}


