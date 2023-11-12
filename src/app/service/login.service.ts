import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserService} from "./user.service";
import {IUser, IUserData} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  static userService: UserService
  static router: Router
  constructor(private http: HttpClient, router: Router, userService: UserService) {
    LoginService.userService = userService
    LoginService.router = router
  }

  public signIn(userData: IUser) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json'
    })
    const data = JSON.stringify({email: userData.email, password: userData.password})

    return this.http.post('api/login', data, {headers: headers})
  }

  public register(userData: IUserData) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json'
    })
    const data = JSON.stringify({
      email: userData.email,
      password: userData.password,
      name: userData.name,
      surname: userData.surname,
      birthDate: new Date(userData.birthDate)
    })
    return this.http.post('api/createAccount', data, {headers: headers})
  }

  static async logout() {
    this.userService.removeToken()
    this.userService.removeUserDate()
    await LoginService.router.navigateByUrl('')
  }
}
