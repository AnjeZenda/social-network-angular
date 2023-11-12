import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../service/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerForm: FormGroup | undefined
  isSubmitted = false

  constructor(
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', Validators.required],
      surname: ['', [Validators.required]],
      birthDate: ['', [Validators.required]]
    })
  }

  public onSubmit() {
    this.isSubmitted = true
    if (this.registerForm?.invalid) {
      // TODO add alert
      return
    }
    console.log(this.registerForm?.value)
    this.loginService.register(this.registerForm?.value).subscribe({
      complete: async () => {
        await this.router.navigateByUrl("/")
      },
      error: console.error
    })
  }
}
