import { Injectable } from "@angular/core";
import { FaceSnap } from "../models/face-snap";
import { SnapType } from "../models/snap-type.type";

@Injectable({ // permet de déclarer une classe comme service 
    providedIn: 'root'
})
/*L'objet de configuration qui spécifie  providedIn: 'root'  
dit à Angular d'enregistrer ce service à la racine de l'application.
 Ce sera très souvent le cas pour vos services, 
 car ça permet de s'assurer de n'avoir qu'une seule instance du service, 
 partagée par tous les partis intéressés.*/ 
export class FaceSnapService { // les services n'ont pas besoin de OnInit

    private faceSnaps: FaceSnap[] = [

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

        /* Le ...  créer une copie superficielle du tableau , cela permet de modifier les données du nouveau tableau sans impacter l'ancien */
        
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
        
}