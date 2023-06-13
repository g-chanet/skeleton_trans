import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { UsersService } from 'src/users/users.service'
import { JwtModule } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma/prisma.service'
import { User } from '@prisma/client'
import { UnauthorizedException } from '@nestjs/common'

const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');
const User = require('../../../prisma/schema.prisma');

describe('Discord Authentication', () => {
  const user = {
    discord: {
      id: '1234567890',
      username: 'testuser',
      discriminator: '1234',
      email: 'testuser@example.com'
    }
  };

  const authenticateMock = jest.fn();
  const initializeMock = jest.fn();
  const useMock = jest.fn();
  passport.authenticate = authenticateMock;
  passport.initialize = initializeMock;
  passport.use = useMock;

  const findOneMock = jest.fn();
  User.findOne = findOneMock;

  const discordStrategyMock = jest.fn();
  DiscordStrategy.mockImplementationOnce(discordStrategyMock);

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('Le Discord-Passport devrait être init', () => {
    require('../config/passport.config');
    expect(initializeMock).toHaveBeenCalled();
  });

  test('La stratégie Discord devrait être used', () => {
    require('../config/passport.config');
    expect(useMock).toHaveBeenCalledWith(expect.any(DiscordStrategy));
  });

  test('Ici la stratégie Discord devrait être bien set et configurée', () => {
    require('../config/passport.config');
    expect(discordStrategyMock).toHaveBeenCalledWith({
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: process.env.DISCORD_CALLBACK_URL,
      scope: ['identify', 'email']
    }, expect.any(Function));
  });

  test('Lauthentification via passport devrait être appelée par la stratégie Discord', () => {
    const authController = require('../controllers/auth.controller');
    const req = { user };
    authController.discordCallback(req);
    expect(authenticateMock).toHaveBeenCalledWith('discord', expect.any(Function));
  });

  test('Tentative de création de new user si rien dans la db', () => {
    const authController = require('../controllers/auth.controller');
    const doneCallback = jest.fn();
    const req = { user };
    const accessToken = 'test_access_token';
    const refreshToken = 'test_refresh_token';

    findOneMock.mockResolvedValue(null);

    authController.discordCallback(req, accessToken, refreshToken, doneCallback);

    expect(User.findOne).toHaveBeenCalledWith({ 'discord.id': user.discord.id });
    expect(User.create).toHaveBeenCalledWith({
      discord: user.discord,
      accessToken,
      refreshToken
    });

    expect(doneCallback).toHaveBeenCalledWith(null, expect.any(User));
  });

  test('Si le user est déjà dans la db, il se fait bien update', () => {
    const authController = require('../controllers/auth.controller');
    const doneCallback = jest.fn();
    const req = { user };
    const accessToken = 'test_access_token';
    const refreshToken = 'test_refresh_token';

    findOneMock.mockResolvedValue(user);

    authController.discordCallback(req, accessToken, refreshToken, doneCallback);

    expect(User.findOne).toHaveBeenCalledWith({ 'discord.id': user.discord.id });
    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(user.discord.id, {
      discord: user.discord,
      accessToken,
      refreshToken
    }, { new: true });

    expect(doneCallback).toHaveBeenCalledWith(null, expect.any(User));
  });
});
