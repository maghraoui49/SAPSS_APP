import {DatePipe} from "@angular/common";

export class Application {

  id!: string ;
  nom! : string;
  gestionPatrimoine! : string;
  socle! : string;
  etat! : string;
  exploitation! : string;
  appartenance! : string;
  deco!: string;
  applicatif! : string;
  responsable!: string;
  domaine! : string;
  categorie!: string;
  dateCreation!:string;
  dateDecommission!:DatePipe;
  dateMiseEnService!:string;
    dateDerniereModif!:string;


}
