import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUrlConstant } from '../Constants/Url.Constants';
import { HttpService } from '../Services/HttpService.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

constructor(private httpService: HttpService) { }

   // Check user details
   GetUserDetails(loginDetails): Observable<any> {
    const url = LoginUrlConstant.GetUserDetailsUrl;
    return this.httpService.postData(url, loginDetails);
  }
}
