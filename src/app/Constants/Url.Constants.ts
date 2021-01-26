import { environment } from 'src/environments/environment';

export class RegisterUrlConstant {
  public static RegisterUserUrl: string = environment.LaundryIroningAPIUrl + 'User/AddUsers';
}

export class LoginUrlConstant {
  public static GetUserDetailsUrl: string = environment.LaundryIroningAPIUrl + 'User/GetUserDetails';
}
