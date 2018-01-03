export interface QuestionComment {
  id?: number;
  createdDateUnix: string;
  author: string;
  body: string;
  isDeleted: boolean;
  ratingPlus: string[];
  questionId: number;
}


