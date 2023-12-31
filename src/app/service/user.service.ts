import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _token: any
  private _user: any

  constructor(private http: HttpClient) {
  }

  get token() {
    return sessionStorage.getItem("ACCESS_TOKEN")
  }

  set token(value){
    sessionStorage.setItem("ACCESS_TOKEN", value!)
  }

  get user() {
    const user = sessionStorage.getItem("USER_DATA")
    return user ? JSON.parse(user) : null
  }

  set user(value) {
    sessionStorage.setItem("USER_DATA", JSON.stringify(value))
  }

  public getUserById(id: number){
    return this.http.get(`api/user/${id}`)
  }

  public getUserNews(id: number) {
    return this.http.get(`api/news/${id}`)
  }

  public removeUserDate() {
    sessionStorage.removeItem('USER_DATA')
  }

  public removeToken() {
    sessionStorage.removeItem('ACCESS_TOKEN')
  }
}
