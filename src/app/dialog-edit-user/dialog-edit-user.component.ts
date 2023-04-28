import { Component, OnInit, inject } from '@angular/core';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  user!: User;
  birthDate!: Date;
  loading = false;
  userId!: string;

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>) {

  }

  ngOnInit(): void {
    
  }

  updateUser() {
    const userDoc = doc(this.firestore, 'users', this.userId);
    console.log('Updating doc data:', userDoc);
    this.loading = true;
    updateDoc(userDoc, this.user.toJson())
      .then(() => {
        this.loading = false;
        this.dialogRef.close();
        console.log('User document updated', userDoc);
      });
  }
}
