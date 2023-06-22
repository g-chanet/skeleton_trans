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
  DateTime: any;
};

export type Channel = {
  __typename?: 'Channel';
  avatarUrl?: Maybe<Scalars['String']>;
  channelType: EChannelType;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  name: Scalars['String'];
  password?: Maybe<Scalars['String']>;
};

export type ChannelMember = {
  __typename?: 'ChannelMember';
  channelId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  muted: Scalars['DateTime'];
  type: EChannelMemberType;
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type ChannelMessage = {
  __typename?: 'ChannelMessage';
  channelId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  message: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type CreateChannelInput = {
  avatarUrl?: InputMaybe<Scalars['String']>;
  channelType: EChannelType;
  name: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
};

export type CreateGameInput = {
  userIds: Array<Scalars['String']>;
};

export type CreateMemberForChannelInput = {
  channelId: Scalars['String'];
};

export type CreateMessageForChannelInput = {
  channelId: Scalars['String'];
  message: Scalars['String'];
};

export type CreateRequestFriendInput = {
  userTargetId: Scalars['String'];
};

export type DeleteChannelInput = {
  id: Scalars['String'];
};

export type DeleteMyMemberForChannelInput = {
  channelId: Scalars['String'];
};

export type DeleteMyMessageForChannelInput = {
  channelId: Scalars['String'];
  id: Scalars['String'];
  message: Scalars['String'];
};

export enum EChannelMemberType {
  Admin = 'Admin',
  Banned = 'Banned',
  Default = 'Default',
  Invited = 'Invited',
  Owner = 'Owner'
}

export enum EChannelType {
  Private = 'Private',
  Protected = 'Protected',
  Public = 'Public'
}

export enum EUserRealtionType {
  Blocked = 'Blocked',
  Friend = 'Friend',
  PendingAccept = 'PendingAccept',
  WaitingAccept = 'WaitingAccept'
}

export type FindAllMessagesForChannelInput = {
  channelId: Scalars['String'];
};

export type FindChannelInput = {
  id: Scalars['String'];
};

export type FindUserInput = {
  id: Scalars['String'];
};

export type GameData = {
  __typename?: 'GameData';
  gameMembers: Array<GameMember>;
  id: Scalars['String'];
};

export type GameMatchmakingMember = {
  __typename?: 'GameMatchmakingMember';
  userId: Scalars['String'];
};

export type GameMember = {
  __typename?: 'GameMember';
  gameId: Scalars['String'];
  userId: Scalars['String'];
};

export type JoinGameInput = {
  id: Scalars['String'];
};

export type LeaveGameInput = {
  id: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptFriendRequest: UserRelation;
  blockRelation: UserRelation;
  commentAdded: Scalars['Boolean'];
  createChannel: Channel;
  createGame: GameData;
  createMemberForChannel: ChannelMember;
  createMessageForChannel: ChannelMessage;
  createRequestFriend: UserRelation;
  deleteChannel: Channel;
  deleteMyMemberForChannel: ChannelMember;
  deleteMyMessageForChannel: ChannelMessage;
  deleteMyUser: Scalars['Boolean'];
  joinGame: GameData;
  joinGameMatchmakingMember: GameMatchmakingMember;
  leaveGame: Scalars['Boolean'];
  leaveGameMatchmakingMember: GameMatchmakingMember;
  logout: Scalars['Boolean'];
  refuseFriendRequest: UserRelation;
  removeFriend: UserRelation;
  signIn42: Scalars['Boolean'];
  signInDiscord: Scalars['Boolean'];
  signInGithub: Scalars['Boolean'];
  signInGoogle: Scalars['Boolean'];
  signInLocal: User;
  signUpLocal: User;
  updateChannel: Channel;
  updateGame: GameData;
  updateGameMemberForGame: GameMember;
  updateMyMemberForChannel: ChannelMember;
  updateMyMessageForChannel: ChannelMessage;
  updateMyUser: Scalars['Boolean'];
};


export type MutationAcceptFriendRequestArgs = {
  args: UpdateUserRelationInput;
};


export type MutationBlockRelationArgs = {
  args: UpdateUserRelationInput;
};


export type MutationCommentAddedArgs = {
  newComment: Scalars['String'];
};


export type MutationCreateChannelArgs = {
  args: CreateChannelInput;
};


export type MutationCreateGameArgs = {
  args: CreateGameInput;
};


export type MutationCreateMemberForChannelArgs = {
  args: CreateMemberForChannelInput;
};


export type MutationCreateMessageForChannelArgs = {
  args: CreateMessageForChannelInput;
};


export type MutationCreateRequestFriendArgs = {
  args: CreateRequestFriendInput;
};


export type MutationDeleteChannelArgs = {
  args: DeleteChannelInput;
};


export type MutationDeleteMyMemberForChannelArgs = {
  args: DeleteMyMemberForChannelInput;
};


export type MutationDeleteMyMessageForChannelArgs = {
  args: DeleteMyMessageForChannelInput;
};


export type MutationJoinGameArgs = {
  args: JoinGameInput;
};


export type MutationLeaveGameArgs = {
  args: LeaveGameInput;
};


export type MutationRefuseFriendRequestArgs = {
  args: UpdateUserRelationInput;
};


export type MutationRemoveFriendArgs = {
  args: UpdateUserRelationInput;
};


export type MutationSignInLocalArgs = {
  args: SignInLocalInput;
};


export type MutationSignUpLocalArgs = {
  args: SignUpLocalInput;
};


export type MutationUpdateChannelArgs = {
  args: UpdateChannelInput;
};


export type MutationUpdateGameArgs = {
  args: UpdateGameInput;
};


export type MutationUpdateGameMemberForGameArgs = {
  args: UpdateGameMemberInput;
};


export type MutationUpdateMyMemberForChannelArgs = {
  args: UpdateMyMemberForChannelInput;
};


export type MutationUpdateMyMessageForChannelArgs = {
  args: UpdateMyMessageForChannelInput;
};


export type MutationUpdateMyUserArgs = {
  args: UpdateMyUserInput;
};

export type OnChannelInput = {
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  findAllChannelMembersForChannel: Array<GameMatchmakingMember>;
  findAllChannelMessagesForChannel: Array<ChannelMessage>;
  findAllChannels: Array<Channel>;
  findChannel: Channel;
  findMyUser: User;
  findUser: UserPublic;
};


export type QueryFindAllChannelMessagesForChannelArgs = {
  args: FindAllMessagesForChannelInput;
};


export type QueryFindChannelArgs = {
  args: FindChannelInput;
};


export type QueryFindUserArgs = {
  args: FindUserInput;
};

export type SignInLocalInput = {
  doubleAuthCode?: InputMaybe<Scalars['String']>;
  emailOrUsername: Scalars['String'];
  password: Scalars['String'];
};

export type SignUpLocalInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  onDeleteChannel: Channel;
  onUpdateChannel: Channel;
};


export type SubscriptionOnDeleteChannelArgs = {
  args: OnChannelInput;
};


export type SubscriptionOnUpdateChannelArgs = {
  args: OnChannelInput;
};

export type UpdateChannelInput = {
  avatarUrl?: InputMaybe<Scalars['String']>;
  channelType?: InputMaybe<EChannelType>;
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type UpdateGameInput = {
  id: Scalars['String'];
};

export type UpdateGameMemberInput = {
  gameId: Scalars['String'];
};

export type UpdateMyMemberForChannelInput = {
  channelId: Scalars['String'];
};

export type UpdateMyMessageForChannelInput = {
  channelId: Scalars['String'];
  id: Scalars['String'];
  message: Scalars['String'];
};

export type UpdateMyUserInput = {
  id: Scalars['String'];
};

export type UpdateUserRelationInput = {
  userTargetid: Scalars['String'];
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

export type UserRelation = {
  __typename?: 'UserRelation';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  type: EUserRealtionType;
  updatedAt: Scalars['DateTime'];
  userOwnerId: Scalars['String'];
  userTargetId: Scalars['String'];
};

export type SignInLocalMutationVariables = Exact<{
  args: SignInLocalInput;
}>;


export type SignInLocalMutation = { __typename?: 'Mutation', signInLocal: { __typename?: 'User', avatarUrl?: string | null, doubleAuth: boolean, id: string, username: string } };

export type SignUpLocalMutationVariables = Exact<{
  args: SignUpLocalInput;
}>;


export type SignUpLocalMutation = { __typename?: 'Mutation', signUpLocal: { __typename?: 'User', id: string, username: string, avatarUrl?: string | null, doubleAuth: boolean } };

export type FindMyUserQueryVariables = Exact<{ [key: string]: never; }>;


export type FindMyUserQuery = { __typename?: 'Query', findMyUser: { __typename?: 'User', doubleAuth: boolean, avatarUrl?: string | null, id: string, username: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type CreateChannelMutationVariables = Exact<{
  args: CreateChannelInput;
}>;


export type CreateChannelMutation = { __typename?: 'Mutation', createChannel: { __typename?: 'Channel', id: string } };

export type FindAllChannelsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllChannelsQuery = { __typename?: 'Query', findAllChannels: Array<{ __typename?: 'Channel', id: string, name: string, avatarUrl?: string | null, password?: string | null, channelType: EChannelType, createdAt: any }> };

export type CreateMessageForChannelMutationVariables = Exact<{
  args: CreateMessageForChannelInput;
}>;


export type CreateMessageForChannelMutation = { __typename?: 'Mutation', createMessageForChannel: { __typename?: 'ChannelMessage', id: string } };

export type FindAllChannelMessagesForChannelQueryVariables = Exact<{
  args: FindAllMessagesForChannelInput;
}>;


export type FindAllChannelMessagesForChannelQuery = { __typename?: 'Query', findAllChannelMessagesForChannel: Array<{ __typename?: 'ChannelMessage', id: string, message: string, channelId: string, userId: string, createdAt: any, updatedAt: any }> };


export const SignInLocalDocument = gql`
    mutation SignInLocal($args: SignInLocalInput!) {
  signInLocal(args: $args) {
    avatarUrl
    doubleAuth
    id
    username
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
    id
    username
    avatarUrl
    doubleAuth
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
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLogoutMutation();
 */
export function useLogoutMutation(options: VueApolloComposable.UseMutationOptions<LogoutMutation, LogoutMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<LogoutMutation, LogoutMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
}
export type LogoutMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<LogoutMutation, LogoutMutationVariables>;
export const CreateChannelDocument = gql`
    mutation CreateChannel($args: CreateChannelInput!) {
  createChannel(args: $args) {
    id
  }
}
    `;

/**
 * __useCreateChannelMutation__
 *
 * To run a mutation, you first call `useCreateChannelMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateChannelMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateChannelMutation({
 *   variables: {
 *     args: // value for 'args'
 *   },
 * });
 */
export function useCreateChannelMutation(options: VueApolloComposable.UseMutationOptions<CreateChannelMutation, CreateChannelMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateChannelMutation, CreateChannelMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CreateChannelMutation, CreateChannelMutationVariables>(CreateChannelDocument, options);
}
export type CreateChannelMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateChannelMutation, CreateChannelMutationVariables>;
export const FindAllChannelsDocument = gql`
    query FindAllChannels {
  findAllChannels {
    id
    name
    avatarUrl
    password
    channelType
    createdAt
  }
}
    `;

/**
 * __useFindAllChannelsQuery__
 *
 * To run a query within a Vue component, call `useFindAllChannelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllChannelsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useFindAllChannelsQuery();
 */
export function useFindAllChannelsQuery(options: VueApolloComposable.UseQueryOptions<FindAllChannelsQuery, FindAllChannelsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<FindAllChannelsQuery, FindAllChannelsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<FindAllChannelsQuery, FindAllChannelsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<FindAllChannelsQuery, FindAllChannelsQueryVariables>(FindAllChannelsDocument, {}, options);
}
export function useFindAllChannelsLazyQuery(options: VueApolloComposable.UseQueryOptions<FindAllChannelsQuery, FindAllChannelsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<FindAllChannelsQuery, FindAllChannelsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<FindAllChannelsQuery, FindAllChannelsQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<FindAllChannelsQuery, FindAllChannelsQueryVariables>(FindAllChannelsDocument, {}, options);
}
export type FindAllChannelsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<FindAllChannelsQuery, FindAllChannelsQueryVariables>;
export const CreateMessageForChannelDocument = gql`
    mutation CreateMessageForChannel($args: CreateMessageForChannelInput!) {
  createMessageForChannel(args: $args) {
    id
  }
}
    `;

/**
 * __useCreateMessageForChannelMutation__
 *
 * To run a mutation, you first call `useCreateMessageForChannelMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageForChannelMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateMessageForChannelMutation({
 *   variables: {
 *     args: // value for 'args'
 *   },
 * });
 */
export function useCreateMessageForChannelMutation(options: VueApolloComposable.UseMutationOptions<CreateMessageForChannelMutation, CreateMessageForChannelMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateMessageForChannelMutation, CreateMessageForChannelMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CreateMessageForChannelMutation, CreateMessageForChannelMutationVariables>(CreateMessageForChannelDocument, options);
}
export type CreateMessageForChannelMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateMessageForChannelMutation, CreateMessageForChannelMutationVariables>;
export const FindAllChannelMessagesForChannelDocument = gql`
    query FindAllChannelMessagesForChannel($args: FindAllMessagesForChannelInput!) {
  findAllChannelMessagesForChannel(args: $args) {
    id
    message
    channelId
    userId
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useFindAllChannelMessagesForChannelQuery__
 *
 * To run a query within a Vue component, call `useFindAllChannelMessagesForChannelQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllChannelMessagesForChannelQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useFindAllChannelMessagesForChannelQuery({
 *   args: // value for 'args'
 * });
 */
export function useFindAllChannelMessagesForChannelQuery(variables: FindAllChannelMessagesForChannelQueryVariables | VueCompositionApi.Ref<FindAllChannelMessagesForChannelQueryVariables> | ReactiveFunction<FindAllChannelMessagesForChannelQueryVariables>, options: VueApolloComposable.UseQueryOptions<FindAllChannelMessagesForChannelQuery, FindAllChannelMessagesForChannelQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<FindAllChannelMessagesForChannelQuery, FindAllChannelMessagesForChannelQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<FindAllChannelMessagesForChannelQuery, FindAllChannelMessagesForChannelQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<FindAllChannelMessagesForChannelQuery, FindAllChannelMessagesForChannelQueryVariables>(FindAllChannelMessagesForChannelDocument, variables, options);
}
export function useFindAllChannelMessagesForChannelLazyQuery(variables: FindAllChannelMessagesForChannelQueryVariables | VueCompositionApi.Ref<FindAllChannelMessagesForChannelQueryVariables> | ReactiveFunction<FindAllChannelMessagesForChannelQueryVariables>, options: VueApolloComposable.UseQueryOptions<FindAllChannelMessagesForChannelQuery, FindAllChannelMessagesForChannelQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<FindAllChannelMessagesForChannelQuery, FindAllChannelMessagesForChannelQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<FindAllChannelMessagesForChannelQuery, FindAllChannelMessagesForChannelQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<FindAllChannelMessagesForChannelQuery, FindAllChannelMessagesForChannelQueryVariables>(FindAllChannelMessagesForChannelDocument, variables, options);
}
export type FindAllChannelMessagesForChannelQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<FindAllChannelMessagesForChannelQuery, FindAllChannelMessagesForChannelQueryVariables>;