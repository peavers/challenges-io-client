export interface Owner {
  login?: string;
}

export interface Repository {
  htmlUrl?: string;
  language?: string;
  name?: string;
  sshUrl?: string;
  updatedAt?: string;
  owner: Owner;
}

export interface Comment {
  id?: string; // Line number
  author?: Author;
  body?: string;
  created?: number;
  lineNumber: number;
}

export interface Author {
  avatarUrl?: string;
  name?: string;
  email?: string;
}

export interface Sum {
  blank?: number;
  comment?: number;
  code?: number;
  nFiles?: number;
}

export interface CLOC {
  SUM?: Sum;
}

export interface CodeFile {
  id?: string;
  location?: string;
  projectId?: string;
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
  workingDirectory?: string;
  created?: string;
  score?: string;
  notes?: string;
  codeFileIds?: string[];
  cloc?: CLOC;
  author?: Author;
  repository?: Repository;
  level?: string;
  position?: string;
  lever?: string;
}
