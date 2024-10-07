import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { FaceSnap } from '../models/face-snap';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FaceSnapService } from '../services/face-snaps.service';

@Component({
  selector: 'app-new-face-snap',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    UpperCasePipe,
    CommonModule,
  ],
  templateUrl: './new-face-snap.component.html',
  styleUrl: './new-face-snap.component.scss'
})
export class NewFaceSnapComponent implements OnInit {

  snapForm!: FormGroup;
  faceSnapPreview$!: Observable<FaceSnap>;
  urlRegex!: RegExp;

  constructor(private formbuilder: FormBuilder,
              private facesnapservice: FaceSnapService,
              private router: Router) { }

  ngOnInit(): void {
    this.snapForm = this.formbuilder.group({
      title: [null, Validators.required], // null = valeur par defaut
      description: [null, Validators.required],
      imageUrl: [null, Validators.required , Validators.pattern(this.urlRegex)],
      location: [null]
    }, { 
      updateOn: 'blur'   // permet de mettre à jour le formulaire lorsqu'on quitte le champ
    });

    this.faceSnapPreview$ = this.snapForm.valueChanges.pipe(   // je rajoute les champs qu'il manque
      map(formValue => ({    // je reoturne l'objet en () de l'objet qu'on veut reoturné 
        ...formValue,  // le ... permet de copier les valeurs de formValue dans le nouvel objet
        createdDate: new Date(),
        snaps: 0,
        id:0

      }))
    );

    this.urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;

  }

  onSubmitForm() {
    this.facesnapservice.addFaceSnap(this.snapForm.value);
    this.router.navigate(['/facesnaps']);
  }

}
