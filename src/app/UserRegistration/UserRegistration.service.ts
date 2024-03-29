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

   // check username exists
   CheckUserNameExists(username): Observable<any> {
    const url = RegisterUrlConstant.CheckUsernameExists + '?userName=' + username;
    return this.httpService.getData(url);
   }

   // check security answer
   CheckSecurityAnswer(answerModel): Observable<any> {
     const url = RegisterUrlConstant.CheckSecurityAnswer;
     return this.httpService.postData(url, answerModel);
   }

   // Update user password
  UpdateUserPassword(newPass, conPass, mob): Observable<any> {
    const url = RegisterUrlConstant.UpdateUserPassword + '?newPass=' + newPass + '&conPass=' + conPass + '&mob=' + mob;
    return this.httpService.postDataText(url, null);
  }

   // check promocode valid
   IsPromoCodeValid(promoCode): Observable<any> {
    const url = RegisterUrlConstant.CheckValidPromoCode + '?promoCode=' + promoCode;
    return this.httpService.getData(url);
   }
}


