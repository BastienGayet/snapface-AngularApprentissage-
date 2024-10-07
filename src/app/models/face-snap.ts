/*export class FaceSnap {

    title: string;
    description: string;
    createdDate: Date;
    snaps: number;
    imageUrl: string;
        
    constructor(title: string, description: string, imageUrl: string, createdDate: Date, snaps: number) {
      this.title = title;
      this.description = description;
      this.imageUrl = imageUrl;
      this.createdDate = createdDate;
      this.snaps = snaps;
   }    
}
*/
/* 
Le mot-clé export en TypeScript (et en JavaScript) est utilisé pour rendre une classe, une fonction, une variable ou une constante accessible à partir d'autres fichiers. 
Cela signifie que tu peux importer cette classe FaceSnap dans d'autres composants ou services de ton application Angular.
*/ 
/*  Plus rapide*/
import { SnapType } from "./snap-type.type";

 

export class FaceSnap {

    location?: string;
    id: string;

    constructor(public title: string,
              public description: string,
              public imageUrl: string,
              public createdAt: Date,
              public snaps: number) {
                this.id = crypto.randomUUID().substring(0,8);
              }



    addSnap(): void {  // on crée une méthode directement dans la classe 
        this.snaps++;
    }

    removeSnap(): void {
        this.snaps--;
    }

    setLocation(location:string): void{
        this.location = location;
    }

    withLocation(location:string): FaceSnap{
        this.setLocation(location);
        return this;
    }
    
    snap(snapType:SnapType){

        if(snapType ==='snap'){
            this.addSnap();
        }else if(snapType ==='unsap') {
            this.removeSnap();

        }
    }
}





