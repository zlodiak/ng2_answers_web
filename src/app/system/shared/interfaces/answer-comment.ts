export interface AnswerComment {
  id?: number;
  createdDateUnix: string;
  author: string;
  body: string;
  isDeleted: boolean;
  ratingPlus: string[];
  answerId: number;
}
