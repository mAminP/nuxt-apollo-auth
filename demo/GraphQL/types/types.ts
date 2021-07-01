/* eslint-disable */
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Account = {
  __typename?: 'Account';
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  roles: Array<Maybe<Scalars['String']>>;
  permissions: Array<Maybe<Scalars['String']>>;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LogoutInput = {
  time: Scalars['DateTime'];
};

export type LogoutPayload = {
  __typename?: 'LogoutPayload';
  time: Scalars['DateTime'];
};

export type MePayload = {
  __typename?: 'MePayload';
  user: Account;
};

export type Mutation = {
  __typename?: 'Mutation';
  register: Account;
  login: AuthPayload;
  logout: LogoutPayload;
};

export type MutationRegisterArgs = {
  data: RegisterInput;
};

export type MutationLoginArgs = {
  data: LoginInput;
};

export type MutationLogoutArgs = {
  data: LogoutInput;
};

export type Query = {
  __typename?: 'Query';
  accounts: Array<Maybe<Account>>;
  me: MePayload;
};

export type RegisterInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;

export type UsersQuery = (
  { __typename?: 'Query' }
  & { accounts: Array<Maybe<(
    { __typename?: 'Account' }
    & Pick<Account, 'id' | 'name' | 'email' | 'password'>
  )>> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;

export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'MePayload' }
    & { user: (
      { __typename?: 'Account' }
      & Pick<Account, 'id' | 'name' | 'roles'>
    ) }
  ) }
);

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;

export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'token'>
  ) }
);

export type LogoutMutationVariables = Exact<{
  data: LogoutInput;
}>;

export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & { logout: (
    { __typename?: 'LogoutPayload' }
    & Pick<LogoutPayload, 'time'>
  ) }
);
/* eslint-enable */
