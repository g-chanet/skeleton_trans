import { Module } from '@nestjs/common'
import { PrismaModule } from './prisma/prisma.module'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriverConfig } from '@nestjs/apollo'
import { ApolloDriver } from '@nestjs/apollo/dist/drivers'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { UsersModule } from './users/users.module'
import { UserPresencesModule } from './user-presences/user-presences.module'
import { AuthModule } from './auth/auth.module'
import { GameMatchmakingMembersModule } from './game-matchmaking-members/game-matchmaking-members.module'
import { GameMembersModule } from './game-members/game-members.module'
import { GamesModule } from './games/games.module'
import { ChannelMessagesModule } from './channel-messages/channel-messages.module'
import { ChannelMembersModule } from './channel-members/channel-members.module'
import { ChannelsModule } from './channels/channels.module'
import { UserRelationsModule } from './user-relations/user-relations.module'
import { PubSubModule } from './pub-sub/pub-sub.module'
import { PassportModule } from '@nestjs/passport'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: `schema.gql`,
      installSubscriptionHandlers: true,
      subscriptions: {
        'graphql-ws': {
          path: `/graphql`,
          onConnect: (context: any) => {
            console.log(`OnConnect WS`)
          },
        },
      },
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    PrismaModule,
    UsersModule,
    UserPresencesModule,
    UserRelationsModule,
    ChannelsModule,
    ChannelMembersModule,
    ChannelMessagesModule,
    GamesModule,
    GameMembersModule,
    GameMatchmakingMembersModule,
    AuthModule,
    PubSubModule,
    PassportModule.register({ session: true }),
  ],
  providers: [],
  // controllers: [AppController],
})
export class AppModule {}
