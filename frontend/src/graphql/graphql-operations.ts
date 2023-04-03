import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from 'vue';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateGameInput = {
  userIds: Array<Scalars['String']>;
};

export type FindUserInput = {
  id: Scalars['String'];
};

export type GameData = {
  __typename?: 'GameData';
  gameMembers: Array<GameMember>;
  id: Scalars['String'];
};

export type GameMember = {
  __typename?: 'GameMember';
  id: Scalars['String'];
};

export type JoinGameInput = {
  id: Scalars['String'];
};

export type LeaveGameInput = {
  id: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createGame: GameData;
  deleteMyUser: Scalars['Boolean'];
  joinGame: GameData;
  leaveGame: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  signIn42: Scalars['Boolean'];
  signInDiscord: Scalars['Boolean'];
  signInGithub: Scalars['Boolean'];
  signInGoogle: Scalars['Boolean'];
  signInLocal: UserToken;
  signUpLocal: UserToken;
  updateGame: GameData;
  updateMyUser: Scalars['Boolean'];
};


export type MutationCreateGameArgs = {
  args: CreateGameInput;
};


export type MutationJoinGameArgs = {
  args: JoinGameInput;
};


export type MutationLeaveGameArgs = {
  args: LeaveGameInput;
};


export type MutationSignInLocalArgs = {
  args: SignInLocalInput;
};


export type MutationSignUpLocalArgs = {
  args: SignUpLocalInput;
};


export type MutationUpdateGameArgs = {
  args: UpdateGameInput;
};


export type MutationUpdateMyUserArgs = {
  args: UpdateMyUserInput;
};

export type Query = {
  __typename?: 'Query';
  findMyUser: User;
  findUser: UserPublic;
};


export type QueryFindUserArgs = {
  args: FindUserInput;
};

export type SignInLocalInput = {
  emailOrUsername: Scalars['String'];
  password: Scalars['String'];
};

export type SignUpLocalInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UpdateGameInput = {
  id: Scalars['String'];
};

export type UpdateMyUserInput = {
  id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']>;
  doubleAuth: Scalars['Boolean'];
  id: Scalars['String'];
  username: Scalars['String'];
};

export type UserPublic = {
  __typename?: 'UserPublic';
  avatarUrl?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  username: Scalars['String'];
};

export type UserToken = {
  __typename?: 'UserToken';
  token: Scalars['String'];
  user: User;
};

export type SignInLocalMutationVariables = Exact<{
  args: SignInLocalInput;
}>;


export type SignInLocalMutation = { __typename?: 'Mutation', signInLocal: { __typename?: 'UserToken', token: string, user: { __typename?: 'User', doubleAuth: boolean, avatarUrl?: string | null, id: string, username: string } } };

export type SignUpLocalMutationVariables = Exact<{
  args: SignUpLocalInput;
}>;


export type SignUpLocalMutation = { __typename?: 'Mutation', signUpLocal: { __typename?: 'UserToken', token: string, user: { __typename?: 'User', id: string, username: string, avatarUrl?: string | null, doubleAuth: boolean } } };

export type FindMyUserQueryVariables = Exact<{ [key: string]: never; }>;


export type FindMyUserQuery = { __typename?: 'Query', findMyUser: { __typename?: 'User', doubleAuth: boolean, avatarUrl?: string | null, id: string, username: string } };


export const SignInLocalDocument = gql`
    mutation SignInLocal($args: SignInLocalInput!) {
  signInLocal(args: $args) {
    token
    user {
      doubleAuth
      avatarUrl
      id
      username
    }
  }
}
    `;

/**
 * __useSignInLocalMutation__
 *
 * To run a mutation, you first call `useSignInLocalMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSignInLocalMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSignInLocalMutation({
 *   variables: {
 *     args: // value for 'args'
 *   },
 * });
 */
export function useSignInLocalMutation(options: VueApolloComposable.UseMutationOptions<SignInLocalMutation, SignInLocalMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<SignInLocalMutation, SignInLocalMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<SignInLocalMutation, SignInLocalMutationVariables>(SignInLocalDocument, options);
}
export type SignInLocalMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<SignInLocalMutation, SignInLocalMutationVariables>;
export const SignUpLocalDocument = gql`
    mutation SignUpLocal($args: SignUpLocalInput!) {
  signUpLocal(args: $args) {
    token
    user {
      id
      username
      avatarUrl
      doubleAuth
    }
  }
}
    `;

/**
 * __useSignUpLocalMutation__
 *
 * To run a mutation, you first call `useSignUpLocalMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSignUpLocalMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSignUpLocalMutation({
 *   variables: {
 *     args: // value for 'args'
 *   },
 * });
 */
export function useSignUpLocalMutation(options: VueApolloComposable.UseMutationOptions<SignUpLocalMutation, SignUpLocalMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<SignUpLocalMutation, SignUpLocalMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<SignUpLocalMutation, SignUpLocalMutationVariables>(SignUpLocalDocument, options);
}
export type SignUpLocalMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<SignUpLocalMutation, SignUpLocalMutationVariables>;
export const FindMyUserDocument = gql`
    query FindMyUser {
  findMyUser {
    doubleAuth
    avatarUrl
    id
    username
  }
}
    `;

/**
 * __useFindMyUserQuery__
 *
 * To run a query within a Vue component, call `useFindMyUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindMyUserQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useFindMyUserQuery();
 */
export function useFindMyUserQuery(options: VueApolloComposable.UseQueryOptions<FindMyUserQuery, FindMyUserQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<FindMyUserQuery, FindMyUserQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<FindMyUserQuery, FindMyUserQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<FindMyUserQuery, FindMyUserQueryVariables>(FindMyUserDocument, {}, options);
}
export function useFindMyUserLazyQuery(options: VueApolloComposable.UseQueryOptions<FindMyUserQuery, FindMyUserQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<FindMyUserQuery, FindMyUserQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<FindMyUserQuery, FindMyUserQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<FindMyUserQuery, FindMyUserQueryVariables>(FindMyUserDocument, {}, options);
}
export type FindMyUserQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<FindMyUserQuery, FindMyUserQueryVariables>;