import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class GithubStrategy extends PassportStrategy(null) {}
