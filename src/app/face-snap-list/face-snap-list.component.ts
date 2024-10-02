import { Component, OnDestroy, OnInit } from '@angular/core';
import { FaceSnap } from '../models/face-snap';
import { FaceSnapComponent } from "../face-snap/face-snap.component";
import { FaceSnapService } from '../services/face-snaps.service';
import { interval, Subject, take, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-face-snap-list',
  standalone: true,
  imports: [FaceSnapComponent],
  templateUrl: './face-snap-list.component.html',
  styleUrl: './face-snap-list.component.scss'
})
export class FaceSnapListComponent implements OnInit, OnDestroy {

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
  }


}
