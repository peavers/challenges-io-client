import { User } from 'firebase';

export interface Feedback {
  level: string;
  nextStage: string;
  comments: string;
  firebaseUser: FirestoreUser;
}

export interface Comment {
  firebaseUser: FirestoreUser;
  body: string;
  codeLineId: string;
  created?: number;
}

export interface Reviewer {
  id?: string;
  photoUrl?: string;
  displayName?: string;
  email?: string;
  role?: string;
}

export interface CodeFile {
  id?: string;
  location?: string;
  projectId?: string;
  size?: number;
  codeLines?: CodeLine[];
}

export interface CodeLine {
  id?: string;
  body?: string;
  comments?: Comment[];
}

export interface Challenge {
  id?: string;
  source?: string;
  created?: string;
  level?: string;
  position?: string;
  applicant?: string;
  downloadUrl?: string;
  underReview?: boolean;
  feedback?: Feedback[];
  reviewers?: Reviewer[];
  reviewGroups?: string[];
}

export interface FirestoreUser extends User {
  reviewGroup?: string;
}
