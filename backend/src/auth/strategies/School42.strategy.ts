import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'

@Injectable()
export class School42Strategy extends PassportStrategy(null) {}
