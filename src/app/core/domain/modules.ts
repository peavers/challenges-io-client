export interface Feedback {
  level: string;
  nextStage: string;
  comments: string;
  reviewer: Reviewer;
}

export interface Comment {
  id?: string;
  reviewer?: Reviewer;
  body?: string;
  created?: number;
  lineNumber: number;
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
  id?: number;
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
  underReview?: boolean;
  feedback?: Feedback[];
  reviewers?: Reviewer[];
}
