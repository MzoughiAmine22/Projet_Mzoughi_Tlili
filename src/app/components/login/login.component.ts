import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder,private http:HttpClient,private router:Router ) { }
  loginForm:FormGroup;

  @Output() notify= new EventEmitter<boolean>();
  @Input() noShow : boolean; 
  ngOnInit(): void {
    this.loginForm=this.fb.group({
      email: [''],
      password:['']
    });
  }
  login()
  {
    this.http.get<any>("http://localhost:3500/signupUsers")
    .subscribe(res =>{
      var user = res.find((a:any)=>{
        return(a.email === this.loginForm.value.email && a.password === this.loginForm.value.password )
      });
      if(user)
      {
        alert("Login Success");
        
        localStorage.setItem('token',"dd");
        this.loginForm.value.email!="nice@gmail.com" ? localStorage.setItem('userType','user') : localStorage.setItem('userType','admin');
        this.loginForm.reset(); 
        this.router.navigate(['landing']);
      }
      else
      {
        alert("Login Invalid");
        this.loginForm.reset();
        this.router.navigate(['login']);
      }
    },err=>{
      alert("Something went wrong");
    })
  }

}
