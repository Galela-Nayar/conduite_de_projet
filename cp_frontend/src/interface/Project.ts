interface Project {
    id: string;
    nom: string;
    date: Date;
    description: string;
    sections: any[];
    taches: any[];
    dateButtoire: Date;
  }

export default Project