export interface Project {
    id: string;
    nom: string;
    dateCreation: Date;
    description: string;
    sections: any[];
    taches: any[];
    dateButtoire: Date;
    modeAffichage: string;
    [key:string]:any;
    createur: string;
    droitUtilisateur: any[]; //Admin(Peut tout faire), Collaborateur(Peut pas modifier), ou juste visiteur(Pas rien faire)
  }


export default Project