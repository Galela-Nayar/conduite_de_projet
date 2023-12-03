export interface Tache {
    id: string;
    nom: string;
    priorite: Int16Array;
    ponderation: Int16Array;
    statutTerminer: boolean;
    dateLimite: Date;
    limite: Date;
    membreAttribue: string[];
    dateCreation: Date;
    [key:string]:any;
    etiquettes: any[];
  }

export default Tache;
