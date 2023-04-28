import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  user: User = new User();
  allUsers: any[] = [];
  
  constructor(public dialog: MatDialog) {

  }

  ngOnInit(): void {
    const userRef = collection(this.firestore, 'users');
    getDocs(userRef).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.allUsers.push({ id: doc.id, ...doc.data() });
        console.log("users", this.allUsers);
      });
    });
  }

  openDialog(): void {
    this.dialog.open(DialogAddUserComponent);
  }

}
