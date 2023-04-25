import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  //@ of user service
  userUrl: string = "http://localhost:3001/allUsers";

  //imporations for Login methode
  public token: string
  private authStatusListener = new Subject<boolean>();
  private isUserAuthenticated = false;
  private name: string;

  private errormsg: string;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) { }

  getErrorMsg() {
    return this.errormsg;
  };

  getToken() {
    return this.token;
  };
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  };
  isUserAuth() {
    return this.isUserAuthenticated;
  };
  getName() {
    return this.name;
  };
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    this.isUserAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
  };

  signupUser(user, img: File) {
    //FormData is a standard browser API, it's not Angular-specific.
    let formData = new FormData();
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("email", user.email);
    formData.append("adress", user.adress);
    formData.append("password", user.password);
    formData.append("tel", user.tel);
    formData.append("img", img);
    formData.append("role", user.role);

    return this.httpClient.post<{ message: string }>(this.userUrl + "/userSubscription", formData);

  };

  signupAssistance(assistance, cv: File) {

    let assistData = new FormData();
    assistData.append("firstName", assistance.firstName);
    assistData.append("lastName", assistance.lastName);
    assistData.append("email", assistance.email);
    assistData.append("adress", assistance.adress);
    assistData.append("password", assistance.password);
    assistData.append("gender", assistance.gender);
    assistData.append("birthday", assistance.birthday);
    assistData.append("cv", cv);
    assistData.append("role", assistance.role);
    assistData.append("status", assistance.status);

    return this.httpClient.post<{ message: string }>(this.userUrl + "/assistSubscription", assistData);


  };
  signupAdmin(admin){
  return this.httpClient.post<{message : string}>(this.userUrl + "/adminSubscription" , admin);
  }

  login(user) {
    //in this login function we have an exceptional case the responce from app.js will be send here not to the component.ts
    return this.httpClient.post<{ user: any, message: string }>(this.userUrl + "/login", user).subscribe(
      (res) => {
        // console.log("here is response from BE", res.message);
        this.errormsg = res.message;

        const token = res.user.jwt;
        this.token = token;

        if (res.user) {
          this.isUserAuthenticated = true;

          this.name = res.user.firstName;

          this.authStatusListener.next(true);
          localStorage.setItem('token', token);
          localStorage.setItem('name', res.user.firstName);
          localStorage.setItem('UserId', res.user.id);

          (res.user.role == "admin") ?
            this.router.navigate(['dashboardAdmin']) : this.router.navigate([""])
        };
      }
    )
  };
  getAssistances(){
    return this.httpClient.get<{assistances:any , message:string}>(this.userUrl + "/assistant");
  }
  getUsers(){
    return this.httpClient.get<{user:any , message:string}>(this.userUrl+ "/users");
  }
  // getAssitById(id){
  //   return this.httpClient.get<{assist: any , message: string}>((`${this.userUrl}/${id}`))
  // }

  searchAssistant(obj){
    //search by name
    console.log("here obj from FE",obj);
    return this.httpClient.post<{assistant:any,message:string}>(this.userUrl+ "/search",obj)
  };

  updateStatus(id){
    return this.httpClient.put<{newAssistant:any,message:string}>((`${this.userUrl}/${id}`) , null);
  }

  getAllUsers(){
    return this.httpClient.get<{foundedUser: any , message: string}>(this.userUrl);
  }
  getUserByID(id){
    return this.httpClient.get<{user: any , error: string}>((`${this.userUrl}/${id}`))
  }

  // editProfile(newInfo : any){
  //   return this.httpClient.put<{savedUser:any, error: string , message:string}>(this.userUrl + "/edituser", newInfo);
  // }
  




}
