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
  public static GetIroningOrdersForAdmin: string = environment.LaundryIroningAPIUrl + 'Ironing/GetIroningOrdersForAdmin';
  public static GetAgentUsers: string = environment.LaundryIroningAPIUrl + 'User/GetAgentUsers';
  public static AssignSelectedOrdersToAgent: string = environment.LaundryIroningAPIUrl + 'Ironing/UpdateOrderAssignment';
  public static GetLaundryOrdersForAdmin: string = environment.LaundryIroningAPIUrl + 'Laundry/GetLaundryOrdersForAdmin';
  public static GetIroningLaundryOrdersForAdmin: string = environment.LaundryIroningAPIUrl + 'IroningLaundry/GetIroningLaundryOrdersForAdmin';
  public static GetAllNewOrdersForAgent: string = environment.LaundryIroningAPIUrl + 'Ironing/GetAllNewOrdersForAgent';
  public static GetAllProcessedOrdersForAgent: string = environment.LaundryIroningAPIUrl + 'Ironing/GetAllProcessedOrdersForAgent';
  public static UpdateOrderStatus: string = environment.LaundryIroningAPIUrl + 'Ironing/UpdateOrderStatus';
  public static GetAllPickedOrdersForoperator: string = environment.LaundryIroningAPIUrl + 'Ironing/GetAllPickedOrdersForOperator';
  
}
