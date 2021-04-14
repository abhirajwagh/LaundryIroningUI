import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LaundryUrlConstant } from 'src/app/Constants/Url.Constants';
import { HttpService } from 'src/app/Services/HttpService.service';

@Injectable({
  providedIn: 'root'
})
export class LaundryService {

constructor(private httpService: HttpService) { }

  // add laundry order details
  AddLaundryOrder(laundryOrder): Observable<any> {
    const url = LaundryUrlConstant.AddLaundryOrder;
    return this.httpService.postDataText(url, laundryOrder);
  }

  // Get order details
  GetOrderDetailsById(OrderId): Observable<any> {
    const url = LaundryUrlConstant.GetLaundryOrderById + '?orderId=' + OrderId;
    return this.httpService.getData(url);
  }
}


