export interface Answer {
  id: number;
  createdDateUnix: string;
  author: string;
  body: string;
  ratingPlus: string[];
  ratingMinus: string[];
  isSolution: boolean;
}


