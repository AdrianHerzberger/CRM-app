import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/models/user.class';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  user = new User();
  birthDate!: Date;
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) {

  }

  ngOnInit(): void {
  }

  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log('Current user', this.user);
    this.loading = true;
    const userRef = collection(this.firestore, 'users');
    const addUserRef = addDoc(userRef, this.user.toJson());
    if (!addUserRef) {
      this.loading = false;
      this.dialogRef.close();
    }
    console.log('User added with ID: ', addUserRef);
  }
}
