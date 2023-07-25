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
  channelMembers?: Maybe<Array<ChannelMember>>;
  channelMessages?: Maybe<Array<ChannelMessage>>;
  channelType: EChannelType;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  password?: Maybe<Scalars['String']>;
};

export type ChannelMember = {
  __typename?: 'ChannelMember';
  channel?: Maybe<Channel>;
  channelId: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  muted: Scalars['DateTime'];
  type: EChannelMemberType;
  updatedAt: Scalars['DateTime'];
  user?: Maybe<UserPublic>;
  userId: Scalars['String'];
};

export type ChannelMessage = {
  __typename?: 'ChannelMessage';
  channelId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  message: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type CheckChannelInput = {
  channelName: Scalars['String'];
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
  channelPassword?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<EChannelMemberType>;
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

export type FindAllChannelMembersForChannelInput = {
  channelId: Scalars['String'];
};

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

export type GoogleAuthCodeValidatorInput = {
  code: Scalars['String'];
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
  isGoogleAuthCodeValid: Scalars['Boolean'];
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


export type MutationIsGoogleAuthCodeValidArgs = {
  args: GoogleAuthCodeValidatorInput;
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

export type OnNewChannelMemberForChannelIdInput = {
  userId: Scalars['String'];
};

export type OnNewChannelMessageForChannelIdInput = {
  channelId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  checkChannelName: Scalars['Boolean'];
  findAllChannelMembersForChannel: Array<ChannelMember>;
  findAllChannelMessagesForChannel: Array<ChannelMessage>;
  findAllChannels: Array<Channel>;
  findAllChannelsForUser: Array<Channel>;
  findAllGameMatchmakingMemberl: Array<GameMatchmakingMember>;
  findAllProtectedChannels: Array<Channel>;
  findAllPublicChannels: Array<Channel>;
  findChannel: Channel;
  findLeaderboardUserList: Array<UserPublic>;
  findMyUser: User;
  findUser: UserPublic;
};


export type QueryCheckChannelNameArgs = {
  args: CheckChannelInput;
};


export type QueryFindAllChannelMembersForChannelArgs = {
  args: FindAllChannelMembersForChannelInput;
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
  doubleAuthCode: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignUpLocalInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  onCreateChannel: Channel;
  onDeleteChannel: Channel;
  onNewChannelMemberForUserId: Channel;
  onNewChannelMessageForChannelId: ChannelMessage;
  onUpdateChannel: Channel;
};


export type SubscriptionOnDeleteChannelArgs = {
  args: OnChannelInput;
};


export type SubscriptionOnNewChannelMemberForUserIdArgs = {
  args: OnNewChannelMemberForChannelIdInput;
};


export type SubscriptionOnNewChannelMessageForChannelIdArgs = {
  args: OnNewChannelMessageForChannelIdInput;
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
  type: EChannelMemberType;
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
  id: Scalars['ID'];
  username: Scalars['String'];
};

export type UserPublic = {
  __typename?: 'UserPublic';
  avatarUrl?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  username: Scalars['String'];
};

export type UserRelation = {
  __typename?: 'UserRelation';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
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

export type FindAllPublicChannelsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllPublicChannelsQuery = { __typename?: 'Query', findAllPublicChannels: Array<{ __typename?: 'Channel', id: string, name: string, avatarUrl?: string | null, channelType: EChannelType, createdAt: any }> };

export type FindAllProtectedChannelsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllProtectedChannelsQuery = { __typename?: 'Query', findAllProtectedChannels: Array<{ __typename?: 'Channel', id: string, name: string, avatarUrl?: string | null, channelType: EChannelType, createdAt: any }> };

export type FindAllChannelsForUserQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllChannelsForUserQuery = { __typename?: 'Query', findAllChannelsForUser: Array<{ __typename?: 'Channel', id: string, name: string, avatarUrl?: string | null, channelType: EChannelType, createdAt: any }> };

export type FindChannelQueryVariables = Exact<{
  args: FindChannelInput;
}>;


export type FindChannelQuery = { __typename?: 'Query', findChannel: { __typename?: 'Channel', id: string, name: string, avatarUrl?: string | null, channelType: EChannelType, createdAt: any } };

export type CheckChannelNameQueryVariables = Exact<{
  args: CheckChannelInput;
}>;


export type CheckChannelNameQuery = { __typename?: 'Query', checkChannelName: boolean };

export type OnCreateChannelSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnCreateChannelSubscription = { __typename?: 'Subscription', onCreateChannel: { __typename?: 'Channel', id: string, name: string, avatarUrl?: string | null, channelType: EChannelType, createdAt: any } };

export type FindAllChannelMembersForChannelQueryVariables = Exact<{
  args: FindAllChannelMembersForChannelInput;
}>;


export type FindAllChannelMembersForChannelQuery = { __typename?: 'Query', findAllChannelMembersForChannel: Array<{ __typename?: 'ChannelMember', type: EChannelMemberType, user?: { __typename?: 'UserPublic', id: string, username: string, avatarUrl?: string | null } | null }> };

export type CreateMemberForChannelMutationVariables = Exact<{
  args: CreateMemberForChannelInput;
}>;


export type CreateMemberForChannelMutation = { __typename?: 'Mutation', createMemberForChannel: { __typename?: 'ChannelMember', channelId: string, userId: string, type: EChannelMemberType, muted: any, createdAt: any, updatedAt: any } };

export type OnNewChannelMemberForUserIdSubscriptionVariables = Exact<{
  args: OnNewChannelMemberForChannelIdInput;
}>;


export type OnNewChannelMemberForUserIdSubscription = { __typename?: 'Subscription', onNewChannelMemberForUserId: { __typename?: 'Channel', id: string, name: string, avatarUrl?: string | null, channelType: EChannelType, createdAt: any } };

export type CreateMessageForChannelMutationVariables = Exact<{
  args: CreateMessageForChannelInput;
}>;


export type CreateMessageForChannelMutation = { __typename?: 'Mutation', createMessageForChannel: { __typename?: 'ChannelMessage', id: string } };

export type FindAllChannelMessagesForChannelQueryVariables = Exact<{
  args: FindAllMessagesForChannelInput;
}>;


export type FindAllChannelMessagesForChannelQuery = { __typename?: 'Query', findAllChannelMessagesForChannel: Array<{ __typename?: 'ChannelMessage', id: string, message: string, channelId: string, userId: string, createdAt: any, updatedAt: any }> };

export type OnNewChannelMessageForChannelIdSubscriptionVariables = Exact<{
  args: OnNewChannelMessageForChannelIdInput;
}>;


export type OnNewChannelMessageForChannelIdSubscription = { __typename?: 'Subscription', onNewChannelMessageForChannelId: { __typename?: 'ChannelMessage', id: string, message: string, channelId: string, userId: string, createdAt: any, updatedAt: any } };

export type FindLeaderboardUserListQueryVariables = Exact<{ [key: string]: never; }>;


export type FindLeaderboardUserListQuery = { __typename?: 'Query', findLeaderboardUserList: Array<{ __typename?: 'UserPublic', id: string, username: string, avatarUrl?: string | null }> };


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
export const FindAllPublicChannelsDocument = gql`
    query FindAllPublicChannels {
  findAllPublicChannels {
    id
    name
    avatarUrl
    channelType
    createdAt
  }
}
    `;

/**
 * __useFindAllPublicChannelsQuery__
 *
 * To run a query within a Vue component, call `useFindAllPublicChannelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllPublicChannelsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useFindAllPublicChannelsQuery();
 */
export function useFindAllPublicChannelsQuery(options: VueApolloComposable.UseQueryOptions<FindAllPublicChannelsQuery, FindAllPublicChannelsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<FindAllPublicChannelsQuery, FindAllPublicChannelsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<FindAllPublicChannelsQuery, FindAllPublicChannelsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<FindAllPublicChannelsQuery, FindAllPublicChannelsQueryVariables>(FindAllPublicChannelsDocument, {}, options);
}
export function useFindAllPublicChannelsLazyQuery(options: VueApolloComposable.UseQueryOptions<FindAllPublicChannelsQuery, FindAllPublicChannelsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<FindAllPublicChannelsQuery, FindAllPublicChannelsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<FindAllPublicChannelsQuery, FindAllPublicChannelsQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<FindAllPublicChannelsQuery, FindAllPublicChannelsQueryVariables>(FindAllPublicChannelsDocument, {}, options);
}
export type FindAllPublicChannelsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<FindAllPublicChannelsQuery, FindAllPublicChannelsQueryVariables>;
export const FindAllProtectedChannelsDocument = gql`
    query FindAllProtectedChannels {
  findAllProtectedChannels {
    id
    name
    avatarUrl
    channelType
    createdAt
  }
}
    `;

/**
 * __useFindAllProtectedChannelsQuery__
 *
 * To run a query within a Vue component, call `useFindAllProtectedChannelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllProtectedChannelsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useFindAllProtectedChannelsQuery();
 */
export function useFindAllProtectedChannelsQuery(options: VueApolloComposable.UseQueryOptions<FindAllProtectedChannelsQuery, FindAllProtectedChannelsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<FindAllProtectedChannelsQuery, FindAllProtectedChannelsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<FindAllProtectedChannelsQuery, FindAllProtectedChannelsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<FindAllProtectedChannelsQuery, FindAllProtectedChannelsQueryVariables>(FindAllProtectedChannelsDocument, {}, options);
}
export function useFindAllProtectedChannelsLazyQuery(options: VueApolloComposable.UseQueryOptions<FindAllProtectedChannelsQuery, FindAllProtectedChannelsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<FindAllProtectedChannelsQuery, FindAllProtectedChannelsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<FindAllProtectedChannelsQuery, FindAllProtectedChannelsQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<FindAllProtectedChannelsQuery, FindAllProtectedChannelsQueryVariables>(FindAllProtectedChannelsDocument, {}, options);
}
export type FindAllProtectedChannelsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<FindAllProtectedChannelsQuery, FindAllProtectedChannelsQueryVariables>;
export const FindAllChannelsForUserDocument = gql`
    query FindAllChannelsForUser {
  findAllChannelsForUser {
    id
    name
    avatarUrl
    channelType
    createdAt
  }
}
    `;

/**
 * __useFindAllChannelsForUserQuery__
 *
 * To run a query within a Vue component, call `useFindAllChannelsForUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllChannelsForUserQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useFindAllChannelsForUserQuery();
 */
export function useFindAllChannelsForUserQuery(options: VueApolloComposable.UseQueryOptions<FindAllChannelsForUserQuery, FindAllChannelsForUserQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<FindAllChannelsForUserQuery, FindAllChannelsForUserQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<FindAllChannelsForUserQuery, FindAllChannelsForUserQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<FindAllChannelsForUserQuery, FindAllChannelsForUserQueryVariables>(FindAllChannelsForUserDocument, {}, options);
}
export function useFindAllChannelsForUserLazyQuery(options: VueApolloComposable.UseQueryOptions<FindAllChannelsForUserQuery, FindAllChannelsForUserQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<FindAllChannelsForUserQuery, FindAllChannelsForUserQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<FindAllChannelsForUserQuery, FindAllChannelsForUserQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<FindAllChannelsForUserQuery, FindAllChannelsForUserQueryVariables>(FindAllChannelsForUserDocument, {}, options);
}
export type FindAllChannelsForUserQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<FindAllChannelsForUserQuery, FindAllChannelsForUserQueryVariables>;
export const FindChannelDocument = gql`
    query FindChannel($args: FindChannelInput!) {
  findChannel(args: $args) {
    id
    name
    avatarUrl
    channelType
    createdAt
  }
}
    `;

/**
 * __useFindChannelQuery__
 *
 * To run a query within a Vue component, call `useFindChannelQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindChannelQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useFindChannelQuery({
 *   args: // value for 'args'
 * });
 */
export function useFindChannelQuery(variables: FindChannelQueryVariables | VueCompositionApi.Ref<FindChannelQueryVariables> | ReactiveFunction<FindChannelQueryVariables>, options: VueApolloComposable.UseQueryOptions<FindChannelQuery, FindChannelQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<FindChannelQuery, FindChannelQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<FindChannelQuery, FindChannelQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<FindChannelQuery, FindChannelQueryVariables>(FindChannelDocument, variables, options);
}
export function useFindChannelLazyQuery(variables: FindChannelQueryVariables | VueCompositionApi.Ref<FindChannelQueryVariables> | ReactiveFunction<FindChannelQueryVariables>, options: VueApolloComposable.UseQueryOptions<FindChannelQuery, FindChannelQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<FindChannelQuery, FindChannelQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<FindChannelQuery, FindChannelQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<FindChannelQuery, FindChannelQueryVariables>(FindChannelDocument, variables, options);
}
export type FindChannelQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<FindChannelQuery, FindChannelQueryVariables>;
export const CheckChannelNameDocument = gql`
    query CheckChannelName($args: CheckChannelInput!) {
  checkChannelName(args: $args)
}
    `;

/**
 * __useCheckChannelNameQuery__
 *
 * To run a query within a Vue component, call `useCheckChannelNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckChannelNameQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useCheckChannelNameQuery({
 *   args: // value for 'args'
 * });
 */
export function useCheckChannelNameQuery(variables: CheckChannelNameQueryVariables | VueCompositionApi.Ref<CheckChannelNameQueryVariables> | ReactiveFunction<CheckChannelNameQueryVariables>, options: VueApolloComposable.UseQueryOptions<CheckChannelNameQuery, CheckChannelNameQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CheckChannelNameQuery, CheckChannelNameQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CheckChannelNameQuery, CheckChannelNameQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<CheckChannelNameQuery, CheckChannelNameQueryVariables>(CheckChannelNameDocument, variables, options);
}
export function useCheckChannelNameLazyQuery(variables: CheckChannelNameQueryVariables | VueCompositionApi.Ref<CheckChannelNameQueryVariables> | ReactiveFunction<CheckChannelNameQueryVariables>, options: VueApolloComposable.UseQueryOptions<CheckChannelNameQuery, CheckChannelNameQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CheckChannelNameQuery, CheckChannelNameQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CheckChannelNameQuery, CheckChannelNameQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<CheckChannelNameQuery, CheckChannelNameQueryVariables>(CheckChannelNameDocument, variables, options);
}
export type CheckChannelNameQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<CheckChannelNameQuery, CheckChannelNameQueryVariables>;
export const OnCreateChannelDocument = gql`
    subscription OnCreateChannel {
  onCreateChannel {
    id
    name
    avatarUrl
    channelType
    createdAt
  }
}
    `;

/**
 * __useOnCreateChannelSubscription__
 *
 * To run a query within a Vue component, call `useOnCreateChannelSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnCreateChannelSubscription` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the subscription, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/subscription.html#options;
 *
 * @example
 * const { result, loading, error } = useOnCreateChannelSubscription();
 */
export function useOnCreateChannelSubscription(options: VueApolloComposable.UseSubscriptionOptions<OnCreateChannelSubscription, OnCreateChannelSubscriptionVariables> | VueCompositionApi.Ref<VueApolloComposable.UseSubscriptionOptions<OnCreateChannelSubscription, OnCreateChannelSubscriptionVariables>> | ReactiveFunction<VueApolloComposable.UseSubscriptionOptions<OnCreateChannelSubscription, OnCreateChannelSubscriptionVariables>> = {}) {
  return VueApolloComposable.useSubscription<OnCreateChannelSubscription, OnCreateChannelSubscriptionVariables>(OnCreateChannelDocument, {}, options);
}
export type OnCreateChannelSubscriptionCompositionFunctionResult = VueApolloComposable.UseSubscriptionReturn<OnCreateChannelSubscription, OnCreateChannelSubscriptionVariables>;
export const FindAllChannelMembersForChannelDocument = gql`
    query FindAllChannelMembersForChannel($args: FindAllChannelMembersForChannelInput!) {
  findAllChannelMembersForChannel(args: $args) {
    type
    user {
      id
      username
      avatarUrl
    }
  }
}
    `;

/**
 * __useFindAllChannelMembersForChannelQuery__
 *
 * To run a query within a Vue component, call `useFindAllChannelMembersForChannelQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllChannelMembersForChannelQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useFindAllChannelMembersForChannelQuery({
 *   args: // value for 'args'
 * });
 */
export function useFindAllChannelMembersForChannelQuery(variables: FindAllChannelMembersForChannelQueryVariables | VueCompositionApi.Ref<FindAllChannelMembersForChannelQueryVariables> | ReactiveFunction<FindAllChannelMembersForChannelQueryVariables>, options: VueApolloComposable.UseQueryOptions<FindAllChannelMembersForChannelQuery, FindAllChannelMembersForChannelQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<FindAllChannelMembersForChannelQuery, FindAllChannelMembersForChannelQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<FindAllChannelMembersForChannelQuery, FindAllChannelMembersForChannelQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<FindAllChannelMembersForChannelQuery, FindAllChannelMembersForChannelQueryVariables>(FindAllChannelMembersForChannelDocument, variables, options);
}
export function useFindAllChannelMembersForChannelLazyQuery(variables: FindAllChannelMembersForChannelQueryVariables | VueCompositionApi.Ref<FindAllChannelMembersForChannelQueryVariables> | ReactiveFunction<FindAllChannelMembersForChannelQueryVariables>, options: VueApolloComposable.UseQueryOptions<FindAllChannelMembersForChannelQuery, FindAllChannelMembersForChannelQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<FindAllChannelMembersForChannelQuery, FindAllChannelMembersForChannelQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<FindAllChannelMembersForChannelQuery, FindAllChannelMembersForChannelQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<FindAllChannelMembersForChannelQuery, FindAllChannelMembersForChannelQueryVariables>(FindAllChannelMembersForChannelDocument, variables, options);
}
export type FindAllChannelMembersForChannelQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<FindAllChannelMembersForChannelQuery, FindAllChannelMembersForChannelQueryVariables>;
export const CreateMemberForChannelDocument = gql`
    mutation CreateMemberForChannel($args: CreateMemberForChannelInput!) {
  createMemberForChannel(args: $args) {
    channelId
    userId
    type
    muted
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useCreateMemberForChannelMutation__
 *
 * To run a mutation, you first call `useCreateMemberForChannelMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateMemberForChannelMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateMemberForChannelMutation({
 *   variables: {
 *     args: // value for 'args'
 *   },
 * });
 */
export function useCreateMemberForChannelMutation(options: VueApolloComposable.UseMutationOptions<CreateMemberForChannelMutation, CreateMemberForChannelMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateMemberForChannelMutation, CreateMemberForChannelMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CreateMemberForChannelMutation, CreateMemberForChannelMutationVariables>(CreateMemberForChannelDocument, options);
}
export type CreateMemberForChannelMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateMemberForChannelMutation, CreateMemberForChannelMutationVariables>;
export const OnNewChannelMemberForUserIdDocument = gql`
    subscription OnNewChannelMemberForUserId($args: OnNewChannelMemberForChannelIdInput!) {
  onNewChannelMemberForUserId(args: $args) {
    id
    name
    avatarUrl
    channelType
    createdAt
  }
}
    `;

/**
 * __useOnNewChannelMemberForUserIdSubscription__
 *
 * To run a query within a Vue component, call `useOnNewChannelMemberForUserIdSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnNewChannelMemberForUserIdSubscription` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the subscription
 * @param options that will be passed into the subscription, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/subscription.html#options;
 *
 * @example
 * const { result, loading, error } = useOnNewChannelMemberForUserIdSubscription({
 *   args: // value for 'args'
 * });
 */
export function useOnNewChannelMemberForUserIdSubscription(variables: OnNewChannelMemberForUserIdSubscriptionVariables | VueCompositionApi.Ref<OnNewChannelMemberForUserIdSubscriptionVariables> | ReactiveFunction<OnNewChannelMemberForUserIdSubscriptionVariables>, options: VueApolloComposable.UseSubscriptionOptions<OnNewChannelMemberForUserIdSubscription, OnNewChannelMemberForUserIdSubscriptionVariables> | VueCompositionApi.Ref<VueApolloComposable.UseSubscriptionOptions<OnNewChannelMemberForUserIdSubscription, OnNewChannelMemberForUserIdSubscriptionVariables>> | ReactiveFunction<VueApolloComposable.UseSubscriptionOptions<OnNewChannelMemberForUserIdSubscription, OnNewChannelMemberForUserIdSubscriptionVariables>> = {}) {
  return VueApolloComposable.useSubscription<OnNewChannelMemberForUserIdSubscription, OnNewChannelMemberForUserIdSubscriptionVariables>(OnNewChannelMemberForUserIdDocument, variables, options);
}
export type OnNewChannelMemberForUserIdSubscriptionCompositionFunctionResult = VueApolloComposable.UseSubscriptionReturn<OnNewChannelMemberForUserIdSubscription, OnNewChannelMemberForUserIdSubscriptionVariables>;
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
export const OnNewChannelMessageForChannelIdDocument = gql`
    subscription OnNewChannelMessageForChannelId($args: OnNewChannelMessageForChannelIdInput!) {
  onNewChannelMessageForChannelId(args: $args) {
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
 * __useOnNewChannelMessageForChannelIdSubscription__
 *
 * To run a query within a Vue component, call `useOnNewChannelMessageForChannelIdSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnNewChannelMessageForChannelIdSubscription` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the subscription
 * @param options that will be passed into the subscription, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/subscription.html#options;
 *
 * @example
 * const { result, loading, error } = useOnNewChannelMessageForChannelIdSubscription({
 *   args: // value for 'args'
 * });
 */
export function useOnNewChannelMessageForChannelIdSubscription(variables: OnNewChannelMessageForChannelIdSubscriptionVariables | VueCompositionApi.Ref<OnNewChannelMessageForChannelIdSubscriptionVariables> | ReactiveFunction<OnNewChannelMessageForChannelIdSubscriptionVariables>, options: VueApolloComposable.UseSubscriptionOptions<OnNewChannelMessageForChannelIdSubscription, OnNewChannelMessageForChannelIdSubscriptionVariables> | VueCompositionApi.Ref<VueApolloComposable.UseSubscriptionOptions<OnNewChannelMessageForChannelIdSubscription, OnNewChannelMessageForChannelIdSubscriptionVariables>> | ReactiveFunction<VueApolloComposable.UseSubscriptionOptions<OnNewChannelMessageForChannelIdSubscription, OnNewChannelMessageForChannelIdSubscriptionVariables>> = {}) {
  return VueApolloComposable.useSubscription<OnNewChannelMessageForChannelIdSubscription, OnNewChannelMessageForChannelIdSubscriptionVariables>(OnNewChannelMessageForChannelIdDocument, variables, options);
}
export type OnNewChannelMessageForChannelIdSubscriptionCompositionFunctionResult = VueApolloComposable.UseSubscriptionReturn<OnNewChannelMessageForChannelIdSubscription, OnNewChannelMessageForChannelIdSubscriptionVariables>;
export const FindLeaderboardUserListDocument = gql`
    query FindLeaderboardUserList {
  findLeaderboardUserList {
    id
    username
    avatarUrl
  }
}
    `;

/**
 * __useFindLeaderboardUserListQuery__
 *
 * To run a query within a Vue component, call `useFindLeaderboardUserListQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindLeaderboardUserListQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useFindLeaderboardUserListQuery();
 */
export function useFindLeaderboardUserListQuery(options: VueApolloComposable.UseQueryOptions<FindLeaderboardUserListQuery, FindLeaderboardUserListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<FindLeaderboardUserListQuery, FindLeaderboardUserListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<FindLeaderboardUserListQuery, FindLeaderboardUserListQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<FindLeaderboardUserListQuery, FindLeaderboardUserListQueryVariables>(FindLeaderboardUserListDocument, {}, options);
}
export function useFindLeaderboardUserListLazyQuery(options: VueApolloComposable.UseQueryOptions<FindLeaderboardUserListQuery, FindLeaderboardUserListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<FindLeaderboardUserListQuery, FindLeaderboardUserListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<FindLeaderboardUserListQuery, FindLeaderboardUserListQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<FindLeaderboardUserListQuery, FindLeaderboardUserListQueryVariables>(FindLeaderboardUserListDocument, {}, options);
}
export type FindLeaderboardUserListQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<FindLeaderboardUserListQuery, FindLeaderboardUserListQueryVariables>;