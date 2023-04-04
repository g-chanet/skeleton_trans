import { Injectable } from '@nestjs/common'

@Injectable()
export class GameMatchmakingMembersService {
  //**************************************************//
  //  MUTATION
  //**************************************************//

  create() {
    return `This action add`
  }

  remove(id: string) {
    return `This action removes a #${id}`
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  findAll() {
    return `This action returns all`
  }
}
