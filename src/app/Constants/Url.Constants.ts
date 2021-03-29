import { environment } from 'src/environments/environment';

export class RegisterUrlConstant {
  public static RegisterUserUrl: string = environment.LaundryIroningAPIUrl + 'User/AddUsers';
  public static CheckUsernameExists: string = environment.LaundryIroningAPIUrl + 'User/CheckUserName';
}

export class LoginUrlConstant {
  public static GetUserDetailsUrl: string = environment.LaundryIroningAPIUrl + 'User/GetUserDetails';
}

export class IroningUrlConstant {
  public static AddIroningOrder: string = environment.LaundryIroningAPIUrl + 'Ironing/AddIroningOrder';
  public static GetIroningOrderById: string = environment.LaundryIroningAPIUrl + 'Ironing/GetOrderById';
}

export class LaundryUrlConstant {
  public static AddLaundryOrder: string = environment.LaundryIroningAPIUrl + 'Laundry/AddLaundryOrder';
  public static GetLaundryOrderById: string = environment.LaundryIroningAPIUrl + 'Laundry/GetOrderById';
}

export class IroningLaundryUrlConstant {
  public static AddIroningLaundryOrder: string = environment.LaundryIroningAPIUrl + 'IroningLaundry/AddIroningLaundryOrder';
  public static GetIroningLaundryOrderById: string = environment.LaundryIroningAPIUrl + 'IroningLaundry/GetOrderById';
}

export class AdminAgentUrlConstant {
  public static AddAdminAgentUser: string = environment.LaundryIroningAPIUrl + 'User/AddAdminAgentUsers';
  public static UpdateAdminAgentUser: string = environment.LaundryIroningAPIUrl + 'User/UpdateAdminAgentUsers';
  public static DeleteAdminAgentUser: string = environment.LaundryIroningAPIUrl + 'User/DeleteAdminAgentUsers';
  public static GetAdminAgentOperatorUsers: string = environment.LaundryIroningAPIUrl + 'User/GetAdminAgentOperatorUsers';
}
