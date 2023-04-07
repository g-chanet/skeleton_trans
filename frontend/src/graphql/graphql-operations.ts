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
  signInLocal: UserToken;
  signUpLocal: UserToken;
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

export type UserToken = {
  __typename?: 'UserToken';
  token: Scalars['String'];
  user: User;
};

export type SignInLocalMutationVariables = Exact<{
  args: SignInLocalInput;
}>;


export type SignInLocalMutation = { __typename?: 'Mutation', signInLocal: { __typename?: 'UserToken', token: string, user: { __typename?: 'User', avatarUrl?: string | null, doubleAuth: boolean, id: string, username: string } } };

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
      avatarUrl
      doubleAuth
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