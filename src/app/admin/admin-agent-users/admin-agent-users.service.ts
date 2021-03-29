import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminAgentUrlConstant } from 'src/app/Constants/Url.Constants';
import { HttpService } from 'src/app/Services/HttpService.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAgentService {

constructor(private httpService: HttpService) { }

  // add admin agent user
  AddAdminAgentUser(AdminAgentUser): Observable<any> {
    const url = AdminAgentUrlConstant.AddAdminAgentUser;
    return this.httpService.postDataText(url, AdminAgentUser);
  }

  // update admin agent user
  UpdateAdminAgentUser(AdminAgentUser): Observable<any> {
    const url = AdminAgentUrlConstant.UpdateAdminAgentUser;
    return this.httpService.postDataText(url, AdminAgentUser);
  }

  // delete admin agent user
  DeleteAdminAgentUser(UserId): Observable<any> {
    const url = AdminAgentUrlConstant.DeleteAdminAgentUser + '?userId=';
    return this.httpService.deleteDataText(url, UserId);
  }

  // Get admin agent
  GetAdminAgentOperatorUsers(): Observable<any> {
    const url = AdminAgentUrlConstant.GetAdminAgentOperatorUsers;
    return this.httpService.getData(url);
  }
}


