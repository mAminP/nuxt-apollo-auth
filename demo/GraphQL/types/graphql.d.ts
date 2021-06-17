
declare module '*/userGQL.ts' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const users: DocumentNode;

  export default defaultDocument;
}
    