import { Component, Input } from '@angular/core';
import { FaceSnap } from '../models/face-snap';
import { DatePipe, NgClass, NgStyle, UpperCasePipe } from '@angular/common';
import { FaceSnapService } from '../services/face-snaps.service';
import { Router } from '@angular/router';

/*
Le tableau imports te permet de déclarer directement toutes les directives,
 pipes, modules externes, ou composants autonomes dont ton composant a besoin.
  Cela rend ton composant autonome et réduit la dépendance à un module Angular global
*/
@Component({
  selector: 'app-face-snap',
  standalone: true,
  imports: [
    UpperCasePipe,
    
  ],
  templateUrl: './face-snap.component.html',
  styleUrl: './face-snap.component.scss'
})
export class FaceSnapComponent {

  @Input() faceSnap!: FaceSnap; // permet à un composant enfant de recevoir des données d'un composant parent.  
           // enfant   : objet passé depuis parent  

 /* ngOnInit(): void {  // permet d'initialisé 
    this.title = 'Archibald';
    this.description = 'Mon meilleur ami depuis toujours !';
    this.createdAt = new Date();
    this.snaps = 5;
    this.imageUrl = 'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg';
    this.snapButtonText = 'Oh Snap!';
    this.userHasSnapped = false;

     onSnap(): void {  // Le nom de méthode qui commence par on signale que cette méthode répond à un événement.
    if (this.userHasSnapped) {
      this.unSnap();
    } else {
      this.snap();
    }
  }

  unSnap() {
    this.faceSnapService.snapFaceSnapById(this.faceSnap.id, 'unsap');    
    this.snapButtonText = 'Oh Snap!';
    this.userHasSnapped = false;
  }

  snap() {
    this.faceSnapService.snapFaceSnapById(this.faceSnap.id, 'snap');
    this.snapButtonText = 'Oops, unSnap!';
    this.userHasSnapped = true;
  }


  snapButtonText!: string;
  userHasSnapped!: boolean;
  }*/


  //constructor(private faceSnapService:FaceSnapService){}


  constructor(private router:Router) {}

  onViewFaceSnap() {
    this.router.navigateByUrl(`facesnaps/${this.faceSnap.id}`);
  }
  
 
  
}

