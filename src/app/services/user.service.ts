import {Injectable, } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
export interface User1{
  id:number,email:string,first_name:string,last_name:string,avatar:string
}
export interface Userd1{
  data:User1, support:{
    url:string;
    text:string
  }
}
export interface UserData{
  page: number,
  per_page: number,
  total:number,
  total_pages: number,
  data:User1[],
  support:{
    url:string;
    text:string
  }

};




@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  findOne(id:number):Observable<Userd1>{
    return this.http.get('https://reqres.in/api/users/' +id).pipe(
      map((user:Userd1)=>user),

    )

  }

  findAll(page:number,size:number):Observable<UserData>{
    let params = new HttpParams();

    params=params.append('page',String(page));
    params=params.append('limit',String(size));

    return this.http.get('https://reqres.in/api/users',{params}).pipe(
      map((userData:UserData)=>userData),
      catchError(err=>throwError(err))
    )
  }
// search(page:number,size:number,id:number):Observable<UserData>{
//   let params = new HttpParams();
//
//   params=params.append('page',String(page));
//   params=params.append('limit',String(size));
//   params=params.append('id',id);
//
//   return this.http.get('https://reqres.in/api/users',{params}).pipe(
//     map((userData:UserData)=>userData),
//     catchError(err=>throwError(err))
//   )
// }
  search(id:number):Observable<UserData>{
    return this.http.get('https://reqres.in/api/users/' +id).pipe(
      map((user:Userd1)=>{
        console.log(user.data)
        let result: UserData = {
          page: 1,
          per_page: 1,
          total:1,
          total_pages: 1,
          data:[],
          support:{
            url:'',
            text:''
          }
        };
        result.data.push(user.data);
        return result;
      }),

    )
}


}
