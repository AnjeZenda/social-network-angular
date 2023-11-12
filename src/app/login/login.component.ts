import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {LoginService} from "../service/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit{
  loginForm: FormGroup | undefined;
  isSubmitted = false;

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', {validators: [Validators.required, Validators.email]}],
      password: ['', {validators: [Validators.required, Validators.minLength(6)]}]
    })
  }

  async signIn() {
    this.isSubmitted = true
    if (this.loginForm?.invalid) {
      // TODO sweetalert service

      return
    }
    this.loginService.signIn(this.loginForm?.value).subscribe(
      (res: any) => {
        if(res.error) {
          console.log(res.error)
          // TODO sweetalert

        } else {
          this.userService.user = res.user
          this.userService.token = res.token
          this.router.navigate(['user', this.userService.user.id])
        }
      }
    )
  }
}
