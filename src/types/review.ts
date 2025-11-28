import { UserData } from './user-data';

export type ReviewType = {
  id: string;
  date: string;
  user: UserData;
  rating: number;
  comment: string;
};
