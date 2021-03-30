import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminAgentUrlConstant } from 'src/app/Constants/Url.Constants';
import { HttpService } from 'src/app/Services/HttpService.service';

@Injectable({
  providedIn: 'root'
})
export class AdminOrdersService {

constructor(private httpService: HttpService) { }

  // Get admin agent
  GetIroningOrdersForAdmin(): Observable<any> {
    const url = AdminAgentUrlConstant.GetIroningOrdersForAdmin;
    return this.httpService.getData(url);
  }

  // Get agent user
  GetAgentUsers(): Observable<any> {
    const url = AdminAgentUrlConstant.GetAgentUsers;
    return this.httpService.getData(url);
  }

  // assign selected orders to agents
  AssignSelectedOrdersToAgent(agentId, orderIds): Observable<any> {
    const url = AdminAgentUrlConstant.AssignSelectedOrdersToAgent + '?agentId=' + agentId;
    return this.httpService.postDataText(url, orderIds);
  }
  
  // Get laundry orders
  GetLaundryOrdersForAdmin(): Observable<any> {
    const url = AdminAgentUrlConstant.GetLaundryOrdersForAdmin;
    return this.httpService.getData(url);
  }

  // Get ironing laundry orders
  GetIroningLaundryOrdersForAdmin(): Observable<any> {
    const url = AdminAgentUrlConstant.GetIroningLaundryOrdersForAdmin;
    return this.httpService.getData(url);
  }
}


