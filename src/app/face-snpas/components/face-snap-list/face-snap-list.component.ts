import { Component, OnInit } from '@angular/core';
import { FaceSnap } from '../../../core/models/face-snap';
import { FaceSnapService } from '../../../core/services/face-snaps.service';
import { interval, Observable} from 'rxjs';

@Component({
  selector: 'app-face-snap-list',
  templateUrl: './face-snap-list.component.html',
  standalone: false,
  styleUrl: './face-snap-list.component.scss'
})
export class FaceSnapListComponent implements OnInit {
  
  faceSnaps$!: Observable<FaceSnap[]>;

  constructor(private faceSnapService: FaceSnapService) { }

  ngOnInit(): void {
    this.faceSnaps$ = this.faceSnapService.getAllFaceSnaps();
  }

}

/* Ancienne version avant requette HTTP 
faceSnaps!: FaceSnap[];
  private destroy$!: Subject<boolean>;

  ngOnInit(): void { // permet de faire des actions en lancant directement la page 
    
    this.faceSnaps = this.faceSnapsService.getFaceSnaps()
    this.faceSnaps[1].setLocation('à la montagne'); 
    this.destroy$ = new Subject<boolean>();

    interval(1000).pipe(
      tap(console.log),
      takeUntil(this.destroy$)
    ).subscribe();
  }
  
  constructor(private faceSnapsService: FaceSnapService) {} // injection de dépendances
  ngOnDestroy(): void {
    this.destroy$.next(true); // une fois que l'obeservable a fini on le detruit 
  } */
