import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'angular2-notifications';
import * as moment from 'moment';
import { CommonService } from 'src/app/Services/Common.service';
import { UserRegistrationService } from 'src/app/UserRegistration/UserRegistration.service';
import { environment } from 'src/environments/environment';
import { AdminAgentUserModel } from './admin-agent-users.model';
import { AdminAgentService } from './admin-agent-users.service';

@Component({
  selector: 'app-admin-agent-users',
  templateUrl: './admin-agent-users.component.html',
  styleUrls: ['./admin-agent-users.component.css']
})
export class AdminAgentUsersComponent implements OnInit {

  isLoader: boolean;
  adminAgentUserForm: FormGroup;
  adminAgentUserModel: AdminAgentUserModel;
  columnHeader: any;
  tableData: [];
  totalItems: number;
  isUpdateDelete: boolean;
  constructor(private translateService: TranslateService, private fb: FormBuilder,
              private notificationService: NotificationsService,
              private userRegisterService: UserRegistrationService,
              private commonService: CommonService,
              private adminAgentService: AdminAgentService,
              private renderer: Renderer2) {
  }

  ngOnInit() {
    this.renderer.removeClass(document.body, 'menu-open');
    this.setUserLanguage(environment.DefaultLanguage);
    this.CreateAdminAgentUserForm();
    this.CostructGridColumnHeaders();
    this.isUpdateDelete = false;
    this.adminAgentUserModel = new AdminAgentUserModel();
    this.GetUsers();
  }
  setUserLanguage(userLanguage) {
    this.translateService.setDefaultLang(userLanguage);
    this.translateService.use(userLanguage);
    this.translateService.currentLang = userLanguage;
    moment.locale(userLanguage);
  }

  // create ironing form
  CreateAdminAgentUserForm() {
    this.adminAgentUserForm = this.fb.group({
      Username: ['', [Validators.required]],
      Password: ['', [Validators.required]],
      Name: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      MobileNo: ['', [Validators.required]],
      EmailId: ['', [Validators.required]],
      Birthdate: ['', [Validators.required]],
      AadharNo: ['', [Validators.required]],
      DrivingLicenceNo: ['', [Validators.required]],
      IsAdmin: ['', []],
      IsAgent: ['', []],
      IsOperator: ['', []],
    });
    return 'form created';
  }

  keyPressAlphaNumeric(event) {
    const inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  GetUsers() {
      this.isLoader = true;
      this.adminAgentService.GetAdminAgentOperatorUsers().subscribe(result => {
      if (result !== null && result.length > 0)
      {
        this.tableData = result;
        this.totalItems = result.length;
      } else {
        this.totalItems = 0;
      }
      this.isLoader = false;
      }, error => {
        this.notificationService.error(this.translateService.instant('CommonText.FailedToFetchData'));
        this.isLoader = false;
      });
  }

  // check user name exists
  CheckUserNameExists() {
    if (this.adminAgentUserModel.UserName !== null && this.adminAgentUserModel.UserName !== '') {
      this.isLoader = true;
      this.userRegisterService.CheckUserNameExists(this.adminAgentUserModel.UserName).subscribe(result => {
        if (result !== null && result === true) {
          this.notificationService.warn('Record already exists');
        }
        this.isLoader = false;
      }, error => {
        this.notificationService.error(this.translateService.instant('Notifications.Filter.FailedToADD'));
        this.isLoader = false;
      });
    }
  }

  SetUserType(userType) {
    if (userType === 'Admin') {
      this.adminAgentUserModel.IsAdmin = true;
      this.adminAgentUserModel.IsAgent = false;
      this.adminAgentUserModel.IsOperator = false;
    } else if (userType === 'Agent') {
      this.adminAgentUserModel.IsAdmin = false;
      this.adminAgentUserModel.IsAgent = true;
      this.adminAgentUserModel.IsOperator = false;
    } else {
      this.adminAgentUserModel.IsAdmin = false;
      this.adminAgentUserModel.IsAgent = false;
      this.adminAgentUserModel.IsOperator = true;
    }
  }
  AddAdminAgentUser() {
    if (this.CheckFormValid()) {
     this.isLoader = true;
     this.adminAgentService.AddAdminAgentUser(this.adminAgentUserModel).subscribe(result => {
       if (result !== null && result !== undefined) {
         if (result === 'Record already exists') {
           this.notificationService.warn(result);
         } else {
           this.notificationService.success(this.translateService.instant('CommonText.SuccessMsg'));
           this.GetUsers();
           this.ResetForm();
         }
         this.isLoader = false;
       }
     }, error => {
       this.notificationService.error(this.translateService.instant('CommonText.FailedToAdd'));
       this.isLoader = false;
     });
   }
  }

  UpdateAdminAgentUser() {
    if (this.CheckFormValid()) {
      this.isLoader = true;
      this.adminAgentService.UpdateAdminAgentUser(this.adminAgentUserModel).subscribe(result => {
        if (result !== null && result !== undefined) {
          if (result === 'Record already exists') {
            this.notificationService.warn(result);
          } else {
            this.notificationService.success(this.translateService.instant('CommonText.UpdateMsg'));
            this.GetUsers();
            this.ResetForm();
          }
          this.isLoader = false;
        }
      }, error => {
        this.notificationService.error(this.translateService.instant('CommonText.FailedToUpdate'));
        this.isLoader = false;
      });
    }
  }

  DeleteAdminAgentUser() {
    this.isLoader = true;
    this.adminAgentService.DeleteAdminAgentUser(this.adminAgentUserModel.UserId).subscribe(result => {
      if (result !== null && result !== undefined) {
        this.notificationService.success(this.translateService.instant('CommonText.DeleteMsg'));
        this.GetUsers();
        this.ResetForm();
        this.isLoader = false;
      }
    }, error => {
      this.notificationService.error(this.translateService.instant('CommonText.FailedToDelete'));
      this.isLoader = false;
    });

  }

  ResetForm() {
    this.isUpdateDelete = false;
    this.adminAgentUserModel.UserId = null;
    this.adminAgentUserModel.UserName = null;
    this.adminAgentUserModel.Password = null;
    this.adminAgentUserModel.Name = null;
    this.adminAgentUserModel.Email = null;
    this.adminAgentUserModel.Address = null;
    this.adminAgentUserModel.MobileNo = null;
    this.adminAgentUserModel.AadharNo = null;
    this.adminAgentUserModel.DrivingLicenceNo = null;
    this.adminAgentUserModel.DateOfBirth = null;
    this.adminAgentUserModel.IsAdmin = false;
    this.adminAgentUserModel.IsAgent = false;
    this.adminAgentUserModel.IsOperator = false;
    this.adminAgentUserModel.UserTypeId = null;
    this.adminAgentUserModel.UserType = null;
  }

  MaxDate() {
    return this.commonService.SetMinDateForDatePicker();
  }

  CheckFormValid(): boolean {
    let isvalid = false;
    if (this.adminAgentUserModel.UserName !== null && this.adminAgentUserModel.Password !== null
      && this.adminAgentUserModel.Name !== null && this.adminAgentUserModel.MobileNo !== null
      && this.adminAgentUserModel.Email !== null && this.adminAgentUserModel.Address !== null
      && this.adminAgentUserModel.AadharNo !== null && this.adminAgentUserModel.DrivingLicenceNo !== null
      && this.adminAgentUserModel.DateOfBirth !== null && this.adminAgentUserModel.IsAdmin !== undefined
      && this.adminAgentUserModel.IsAgent !== undefined && this.adminAgentUserModel.IsOperator !== undefined
   ) {
      isvalid = true;
    }
    return isvalid;
  }

  CostructGridColumnHeaders() {
    this.columnHeader = [
      {
        name: this.translateService.instant('Login.UserName'), navigation: '',
        fieldName: 'UserName', headercss: 'text-left', dataType: '', icon: ''
      },
      {
        name: this.translateService.instant('Register.Name'), navigation: '',
        fieldName: 'Name', headercss: 'text-left', dataType: '', icon: ''
      },
      {
        name: this.translateService.instant('Register.UserType'), navigation: '',
        fieldName: 'UserType', headercss: 'text-left', dataType: '', icon: ''
      },
    ];
  }

  selectedGridData(rowData) {
    if (rowData) {
      this.adminAgentUserModel.UserId = rowData.UserId;
      this.adminAgentUserModel.UserName = rowData.UserName;
      this.adminAgentUserModel.Password = rowData.Password;
      this.adminAgentUserModel.Name = rowData.Name;
      this.adminAgentUserModel.Address = rowData.Address;
      this.adminAgentUserModel.MobileNo = rowData.MobileNo;
      this.adminAgentUserModel.Email = rowData.Email;
      this.adminAgentUserModel.AadharNo = rowData.AadharNo;
      this.adminAgentUserModel.DrivingLicenceNo = rowData.DrivingLicenceNo;
      this.adminAgentUserModel.DateOfBirth = moment(rowData.DateOfBirth).format('YYYY-MM-DD');
      this.isUpdateDelete = true;
      this.SetUserType(rowData.UserType);
    }
  }
}
