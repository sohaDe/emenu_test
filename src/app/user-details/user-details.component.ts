import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {User1, Userd1, UserService} from "../services/user.service";
import {map, Subscription} from "rxjs";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit,OnDestroy {
  userId: number = null;
  private sub: Subscription;
  user: Userd1 = null;


  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.userId = parseInt(params['id']);
      this.userService.findOne(this.userId).pipe(
        map((user: Userd1) => this.user = user)
      ).subscribe()
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}



