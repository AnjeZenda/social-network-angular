import {Component, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";
import {ActivatedRoute} from "@angular/router";
import {IImage} from "../model/image";
import {LoginService} from "../service/login.service";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit{
  protected readonly LoginService = LoginService;
  private id: number | undefined
  user: any
  news: any
  image: IImage | undefined

  constructor(
    public userService: UserService,
    private router: ActivatedRoute,
  ) {}
  ngOnInit() {
    this.router.paramMap.subscribe(params => {
      this.id = parseInt(params.get('id')!)
      this.userService.getUserById(this.id!).subscribe(user => {
        this.user = user
        console.log(user)
      })
      this.userService.getUserNews(this.id!).subscribe(news => this.news = news)
    })
  }
}
