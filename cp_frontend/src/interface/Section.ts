export interface Section {
    id: string;
    nom: string;
    taches: string[];
    [key:string]:any;
    
    estEtat: boolean;
  }

export default Section