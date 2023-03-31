import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { MessagesModule } from './messages/messages.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloDriver } from '@nestjs/apollo/dist/drivers';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { UsersModule } from './users/users.module';
import { UserPresencesModule } from './user-presences/user-presences.module';
import { AuthModule } from './auth/auth.module';
import { GameMatchmakingMembersModule } from './game-matchmaking-members/game-matchmaking-members.module';
import { GameMembersModule } from './game-members/game-members.module';
import { GameDatasModule } from './game-datas/game-datas.module';
import { GamesModule } from './games/games.module';
import { ChannelMessagesModule } from './channel-messages/channel-messages.module';
import { ChannelMembersModule } from './channel-members/channel-members.module';
import { ChannelsModule } from './channels/channels.module';
import { UserRelationsModule } from './user-relations/user-relations.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: 'schema.gql',
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    PrismaModule,
    MessagesModule,
    UsersModule,
    UserPresencesModule,
    UserRelationsModule,
    ChannelsModule,
    ChannelMembersModule,
    ChannelMessagesModule,
    GamesModule,
    GameDatasModule,
    GameMembersModule,
    GameMatchmakingMembersModule,
    AuthModule,
  ],
  // controllers: [AppController],
})
export class AppModule {
  constructor() {
    // console.log(process.env);
  }
}
