import { Injectable } from "@angular/core";
import { FaceSnap } from "../models/face-snap";
import { HttpClient } from "@angular/common/http";
import { map, Observable, switchMap } from "rxjs";

@Injectable({ // permet de déclarer une classe comme service 
    providedIn: 'root'
})
/*L'objet de configuration qui spécifie  providedIn: 'root'  
dit à Angular d'enregistrer ce service à la racine de l'application.
 Ce sera très souvent le cas pour vos services, 
 car ça permet de s'assurer de n'avoir qu'une seule instance du service, 
 partagée par tous les partis intéressés.*/ 
export class FaceSnapService { // les services n'ont pas besoin de OnInit

  constructor(private http: HttpClient) { }
 
  private faceSnaps: FaceSnap[] = [] ;  //Ancienne version avant requette HTTP

   /* new FaceSnap(1,'Archibald','Mon meilleur ami depuis toujours !','https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg',new Date(),10).withLocation('à la montagne'),
    new FaceSnap(2,'Three Rock Mountain','Un endroit magnifique pour les randonnées.','https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Three_Rock_Mountain_Southern_Tor.jpg/2880px-Three_Rock_Mountain_Southern_Tor.jpg',new Date(),6),
    new FaceSnap(3,'Un bon repas','Mmmh que c\'est bon !','https://wtop.com/wp-content/uploads/2020/06/HEALTHYFRESH.jpg',new Date(),156)];*/

    getAllFaceSnaps(): Observable<FaceSnap[]> {
      return this.http.get<FaceSnap[]>('http://localhost:3000/facesnaps');
      
    }
    getFaceSnapById(faceSnapId: number): Observable<FaceSnap> {
      return this.http.get<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`)
     }

    /* Le ...  créer une copie superficielle du tableau , cela permet de modifier les données du nouveau tableau sans impacter l'ancien */
    
    snapFaceSnapById(faceSnapId: number, snapType: 'snap' | 'unsnap'): Observable<FaceSnap> {
      return this.getFaceSnapById(faceSnapId).pipe(
        map(faceSnap => ({
          ...faceSnap,
          snaps: faceSnap.snaps + (snapType === 'snap' ? 1 : -1)
        })),
        switchMap(updatedFaceSnap => this.http.put<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`,updatedFaceSnap))
      );
    }
  
    addFaceSnap(formValue: {title: string, description: string, imageUrl: string, location?: string}):Observable<FaceSnap>{
      
      return this.getAllFaceSnaps().pipe(
        map(facesnaps => [...facesnaps].sort((a: FaceSnap,b: FaceSnap)=> a.id - b.id)),
        map(sortedFaceSnap => sortedFaceSnap[sortedFaceSnap.length-1]),
        map(previousFaceSnap => ({
          ...formValue,
          snaps:0,
          createdDate : new Date(),
          id: previousFaceSnap.id+1
        })),
        switchMap(newFacesnap => this.http.post<FaceSnap>('http://localhost:3000/facesnaps', newFacesnap))
       );
      
    }
 
}



/*private faceSnaps: FaceSnap[] = [   Ancienne version avant requette HTTP

        new FaceSnap(
            'Archibald',
            'Mon meilleur ami depuis toujours !',
            'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg',
            new Date(),
            10
          ).withLocation('à la montagne'),
          new FaceSnap(
            'Three Rock Mountain',
            'Un endroit magnifique pour les randonnées.',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Three_Rock_Mountain_Southern_Tor.jpg/2880px-Three_Rock_Mountain_Southern_Tor.jpg',
            new Date(),
            6
          ),
          new FaceSnap(
            'Un bon repas',
            'Mmmh que c\'est bon !',
            'https://wtop.com/wp-content/uploads/2020/06/HEALTHYFRESH.jpg',
            new Date(),
            156
          )
        ];
    
        getFaceSnaps(): FaceSnap[] {
          return [...this.faceSnaps];
        }

        /* Le ...  créer une copie superficielle du tableau , cela permet de modifier les données du nouveau tableau sans impacter l'ancien 
        
        getFaceSnapById(faceSnapId:string) : FaceSnap {
          const foundFaceSnap = this.faceSnaps.find(faceSnap => faceSnap.id === faceSnapId);
          //  l'objet foundFaceSnap est une instance d ela classe face-snap
          if(!foundFaceSnap){
            throw new Error('FaceSnap not found');
          }
          return foundFaceSnap;
        }
        snapFaceSnapById(faceSnapId:string , snapType: SnapType): void {
          
          const faceSnap = this.getFaceSnapById(faceSnapId);
          faceSnap.snap(snapType);
        }
        

        addFaceSnap(formValue: { title: string, description: string, imageUrl: string, location?: string }): void {
          const newId = this.faceSnaps[this.faceSnaps.length - 1].id + 1; // Logique pour générer un nouvel ID
          const faceSnap = new FaceSnap(
              formValue.title,
              formValue.description,
              formValue.imageUrl,
              new Date(),
              0 // initialisation des snaps à 0
          );

          this.faceSnaps.push(faceSnap);
        } */