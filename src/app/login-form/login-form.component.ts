import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/models/user.class';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  user = new User();
  loading = false;
  show: boolean = false;

  constructor() {

  }

  ngOnInit(): void {
  }

  submit() {
    this.clear();
    const userRef = collection(this.firestore, 'users');
    const addUserRef = addDoc(userRef, this.user.toJson());
    if (!addUserRef) {
      this.loading = false;
      this.show = true;
    }
  }
  
  clear() {
    this.user.firstName = "";
    this.user.lastName = "";
    this.user.email = "";
  }

}
