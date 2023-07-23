import {Component, OnInit} from '@angular/core';
import {User1, Userd1, UserData, UserService} from "../services/user.service";
import {map, tap} from "rxjs";
import {PageEvent} from "@angular/material/paginator";
import {Event,NavigationStart,NavigationEnd,ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  filterValue:number=null;
dataSource : UserData =null;
pageEvent:PageEvent;

// displayedColumns :string[]= ['id','email','first_name','last_name','avatar'];

  constructor(private userService:UserService,private router:Router,private activatedRoute:ActivatedRoute) {

}


  ngOnInit() :void{
    this.initDAtaSource();
}
initDAtaSource(){
  this.userService.findAll(1,6).pipe(
     map((userData:UserData)=>this.dataSource=userData)
  ).subscribe();
}

  onPaginated(event:PageEvent){
    // this.router.navigate();
    let page=event.pageIndex;
    let size=event.pageSize;

    page=page +1;

    this.userService.findAll(page,size).pipe(
      map((userData:UserData)=>this.dataSource=userData)
    ).subscribe();
  }

  navigateToDetails(id){
    this.router.navigate(['./' + id],{relativeTo:this.activatedRoute});
}
  //
  // findById(id:number){
  //   console.log('ffd')
  //   let wd = this.userService.search(id).pipe(
  //     map((user: UserData) =>  {
  //       console.log(user)
  //       this.dataSource = user;
  //       return user;
  //     })
  //   ).subscribe()
  // }


}
