import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { User } from './models/user';
import { UserSignup } from './signup/signup.component';

@Injectable({
  providedIn: 'root'
})
export class RestapiService {

  constructor(private http: HttpClient) { }


  //login(username: string, password: string) {
  login(user: User): Observable<any> {
    // let heaserstring = 'Basic ' + btoa(username + ':' + password)
    // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    // return this.http.get("http://localhost:8081/auth", { headers })
       return this.http.post('http://localhost:8081/login',user,{ responseType: 'text' })
      .pipe(
        map(
          data => {
            sessionStorage.setItem('authenticateUser', user.username);
           //sessionStorage.setItem('token', heaserstring);
            sessionStorage.setItem('token', data);
            return data;
          }
        )
      );
  }

  signup(user: UserSignup): Observable<any> {
    // let heaserstring = 'Basic ' + btoa(username + ':' + password)
    // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    // return this.http.get("http://localhost:8081/auth", { headers })
       return this.http.post('http://localhost:8081/users',user,{ responseType: 'text' });
      
  }


  getAuthenticatedUser(){
    return sessionStorage.getItem('authenticateUser')
  }

  getAuthenticatedToken(){
    if(this.getAuthenticatedUser()){
      return sessionStorage.getItem('token')
    }
    return null;
  }
  // getToken() {
  //   return localStorage.getItem("token");
  // }

  isUserLoggedIn(){
    let user = sessionStorage.getItem('authenticateUser');
    return !(user===null)
    //return this.getToken() != null
  }
  
  // setSession(token: string) {
  //   localStorage.setItem('token', token);
  // }

  logout(){
    sessionStorage.removeItem('authenticateUser');
    //localStorage.removeItem('token');
    
  }

  getalltodos(){
    return this.http.get<Todo[]>('http://localhost:8081/todos');
  }

  createTodo(todo:Todo){
    return this.http.post<Todo>('http://localhost:8081/createtodo',todo);
  }
  
  deleteTodo(id:any){
    return this.http.delete(`http://localhost:8081/todos/delete/${id}`);
  }

  getTodo(id:any){
    return this.http.get<Todo>(`http://localhost:8081/todos/${id}`);
  }

  modifyTodo(id:any,todo:Todo){
    return this.http.put(`http://localhost:8081/todos/update/${id}`,todo);
  }
}

export class Todo{
  constructor(
    public id:number,
    public description:string,
    public worker:string,
    public status:string
  ){}
}
