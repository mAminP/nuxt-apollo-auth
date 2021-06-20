
declare module '*/userGQL.ts' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const users: DocumentNode;
export const me: DocumentNode;
export const login: DocumentNode;

  export default defaultDocument;
}
    