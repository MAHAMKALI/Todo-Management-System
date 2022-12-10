import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestapiService, Todo } from '../restapi.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  id:any='';
  todo:any

  constructor(private router:Router, private route:ActivatedRoute,private service:RestapiService) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.todo = new Todo(this.id,'Please enter description','enter name','progress')
    if(this.id!=-1){
      this.retriveTodo();
    }
  }

  retriveTodo(){
    this.service.getTodo(this.id).subscribe(
      data => this.todo= data
   )
  }

  saveTodo(){
    if(this.id===-1){
      this.service.modifyTodo(this.id,this.todo).subscribe(
        data =>{
          this.router.navigate(['todos']);
        }
      )
    }else{
      this.service.modifyTodo(this.id,this.todo).subscribe(
        data =>{
          this.router.navigate(['todos']);
        }
      )
    }
  }
}
