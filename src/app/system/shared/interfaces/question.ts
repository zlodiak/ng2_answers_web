export interface Question {
  id?: number;
  author: string;
  isDecided: boolean;
  isDeleted: boolean;
  tags: number[];
  title: string;
  body: string;
  ratingPlus: string[];
  ratingMinus: string[];
  createdDateUnix: string;
}


