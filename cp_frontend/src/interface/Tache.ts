export interface Tache {
  id: string;
  nom?: string;
  priorite: Int16Array;
  ponderation: Int16Array;
  statutTerminer: boolean;
  dateLimite: Date;
  membreAttribue: string[];
  [key: string]: any;
}

export default Tache;
