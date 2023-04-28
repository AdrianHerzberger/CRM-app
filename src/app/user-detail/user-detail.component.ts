import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})

export class UserDetailComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  userId = '';
  user: User = new User(); 

  constructor(
    public dialog: MatDialog, 
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramsMap => {
      this.userId = paramsMap.get('id')!;
      console.log('get id', this.userId);
      this.getUser();
    });
  }

  async getUser() {
    const userDoc = doc(this.firestore, 'users', this.userId);
    const userDocSnap = await getDoc(userDoc);
    if (userDocSnap.exists()) {
      this.user = new User(userDocSnap.data());
      console.log('Retrieved user', this.user);
    } else {
      console.log('User does not exist');
    }
  }

  editMenu(){
    const dialog = this.dialog.open(DialogEditAddressComponent)
    dialog.componentInstance.user = new User(this.user.toJson());
    dialog.componentInstance.userId = this.userId;
  }

  editUserDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user.toJson());
    dialog.componentInstance.userId = this.userId;
  }
  
}
