// import { Component, Input, OnInit } from '@angular/core';
// import { FaceSnap } from '../core/models/face-snap';
// import { FaceSnapService } from '../core/services/face-snaps.service';
// import { DatePipe, NgClass, NgStyle, UpperCasePipe } from '@angular/common';
// import { ActivatedRoute, RouterLink } from '@angular/router';


// @Component({
//   selector: 'app-single-face-snap',
//   standalone: true,
//   imports: [
//     NgStyle,
//     NgClass,
//     UpperCasePipe,
//     DatePipe,
//     RouterLink,
//   ],
//   templateUrl: './single-face-snap.component.html',
//   styleUrl: './single-face-snap.component.scss'
// })
// export class SingleFaceSnapComponent implements OnInit {

//   snapButtonText!: string;
//   userHasSnapped!: boolean;
//   faceSnap!: FaceSnap;
  
//  /* @Input() faceSnap!: FaceSnap; // permet à un composant enfant de recevoir des données d'un composant parent.  
//            // enfant   : objet passé depuis parent  

//   ngOnInit(): void {  // permet d'initialisé 
//     this.title = 'Archibald';
//     this.description = 'Mon meilleur ami depuis toujours !';
//     this.createdAt = new Date();
//     this.snaps = 5;
//     this.imageUrl = 'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg';
//     this.snapButtonText = 'Oh Snap!';
//     this.userHasSnapped = false;

    
//   }*/


//   ngOnInit(): void {

//     this.snapButtonText= 'Oh Snap';
//     this.userHasSnapped = false;
//     this.getFaceSnap();
  
//   }

 
//   constructor(private faceSnapService:FaceSnapService, 
//     private route: ActivatedRoute){}

  
//   onSnap(): void {  // Le nom de méthode qui commence par on signale que cette méthode répond à un événement.
//     if (this.userHasSnapped) {
//       this.unSnap();
//     } else {
//       this.snap();
//     }
//   }

//   unSnap() {
//     this.faceSnapService.snapFaceSnapById(this.faceSnap.id, 'unsap');    
//     this.snapButtonText = 'Oh Snap!';
//     this.userHasSnapped = false;
//   }

//   snap() {
//     this.faceSnapService.snapFaceSnapById(this.faceSnap.id, 'snap');
//     this.snapButtonText = 'Oops, unSnap!';
//     this.userHasSnapped = true;
//   }

//   private getFaceSnap() {
    
//     const faceSnapId = this.route.snapshot.params['id'];
//     /*snapshot est une propriété de ActivatedRoute qui contient un instantané de la route au moment où elle a été activée. Cela signifie que snapshot te donne les informations sur la route à un moment précis.*/
    
//     this.faceSnap = this.faceSnapService.getFaceSnapById(faceSnapId);
//   }
  
// }
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { FaceSnap } from '../../../core/models/face-snap';
import { FaceSnapService } from '../../../core/services/face-snaps.service';

@Component({
  selector: 'app-single-face-snap',
  standalone: false,
  templateUrl: './single-face-snap.component.html',
  styleUrls: ['./single-face-snap.component.scss']
})
export class SingleFaceSnapComponent implements OnInit {
  faceSnap$!:Observable<FaceSnap>;
  buttonText!: string;

  constructor(private faceSnapsService: FaceSnapService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.buttonText = 'Oh Snap!';
    const faceSnapId = +this.route.snapshot.params['id'];
    this.faceSnap$ = this.faceSnapsService.getFaceSnapById(faceSnapId);
  }

  onSnap(faceSnapId: number) {
    if (this.buttonText === 'Oh Snap!') {
      this.faceSnap$ = this.faceSnapsService.snapFaceSnapById(faceSnapId, 'snap').pipe(
        tap(()=> this.buttonText = 'Oops, unSnap!')
      );

    } else {
      this.faceSnap$ = this.faceSnapsService.snapFaceSnapById(faceSnapId, 'unsnap').pipe(
        tap(()=>this.buttonText = 'Oh Snap!')
     );
    }
  }
}