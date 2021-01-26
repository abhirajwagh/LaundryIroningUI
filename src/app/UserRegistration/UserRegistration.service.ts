import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterUrlConstant } from '../Constants/Url.Constants';
import { HttpService } from '../Services/HttpService.service';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {

constructor(private httpService: HttpService) { }

  // add user details
  RegisterUser(UserRegistration): Observable<any> {
    const url = RegisterUrlConstant.RegisterUserUrl;
    return this.httpService.postDataText(url, UserRegistration);
  }
}


