import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminAgentUrlConstant } from 'src/app/Constants/Url.Constants';
import { HttpService } from 'src/app/Services/HttpService.service';

@Injectable({
  providedIn: 'root'
})
export class AgentOrdersService {

constructor(private httpService: HttpService) { }

  // Get new orders agent
  GetNewOrdersForAgent(agentId): Observable<any> {
    const url = AdminAgentUrlConstant.GetAllNewOrdersForAgent + '?agentId=' + agentId;
    return this.httpService.getData(url);
  }
  
  // Get delivery orders
  GetDeliveryOrdersForAgent(agentId): Observable<any> {
    const url = AdminAgentUrlConstant.GetAllProcessedOrdersForAgent + '?agentId=' + agentId;
    return this.httpService.getData(url);
  }

  // Get picked orders
  GetPickedOrdersForOperator(operatorId): Observable<any> {
    const url = AdminAgentUrlConstant.GetAllPickedOrdersForoperator + '?operatorId=' + operatorId;
    return this.httpService.getData(url);
  }

  // update order status
  UpdateOrderStatus(inputModel): Observable<any> {
    const url = AdminAgentUrlConstant.UpdateOrderStatus;
    return this.httpService.postDataText(url, inputModel);
  }
}


