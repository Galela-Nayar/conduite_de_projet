export interface Project {
    id: string;
    nom: string;
    dateCreation: Date;
    description: string;
    sections: any[];
    taches: any[];
    dateButtoire: Date;
    createur: string;
    [key:string]:any;
  }


export default Project