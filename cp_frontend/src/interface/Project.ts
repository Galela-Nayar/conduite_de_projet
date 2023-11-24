export interface Project {
  id: string;
  nom: string;
  dateCreation: Date;
  description: string;
  sections: any[];
  taches: any[];
  dateButtoire: Date;
  modeAffichage: string;
  [key: string]: any;
  createur: string;
}

export default Project;
