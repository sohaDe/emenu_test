import {Component, OnInit} from '@angular/core';
// import {User} from "./model/users";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {Userd1, UserData, UserService} from "./services/user.service";
import {Event,Router, NavigationEnd, NavigationStart} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent implements OnInit{
  title = 'project1';
  // allUsers: User[]=[];
  filterValue:number=null;
  dataSource : UserData =null;
  showLoadingBar=true



  constructor(private userService:UserService ,private router:Router) {
    this.router.events.subscribe((routerEvent:Event)=>{
      if(routerEvent instanceof NavigationStart){
        this.showLoadingBar=true;
      }
      if(routerEvent instanceof NavigationEnd){
        this.showLoadingBar=false;
      }
    })
  }

ngOnInit() {

}

  findById(id:number){
    let wd = this.userService.search(id).pipe(
      map((user: UserData) =>  {
        console.log(user)
        return user;
      })
    ).subscribe()
  }


}
