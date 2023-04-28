import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/models/user.class';
import { MatDialogRef } from '@angular/material/dialog';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  user!: User;
  userId!: string; 
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>) {

  }

  ngOnInit(): void {
    
  }

  updateAddress() {
    const userDoc = doc(this.firestore, 'users', this.userId);
    this.loading = true;
    console.log('Updating doc data:', userDoc);
    updateDoc(userDoc, this.user.toJson())
      .then(() => {
        this.loading = false;
        this.dialogRef.close();
        console.log('User document updated', userDoc);
      });
  }
}
