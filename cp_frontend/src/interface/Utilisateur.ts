export interface Utilisateur {
    id: string;
    nom: string;
    prenom: string;
    bio: string;
    userName: string;
    email: string;
    listProjet: any[];
    [key:string]:any;
  }


export default Utilisateur