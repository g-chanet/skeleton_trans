import { Injectable } from '@nestjs/common'

@Injectable()
export class GameMatchmakingMembersService {
  //**************************************************//
  //  MUTATION
  //**************************************************//

  create() {
    return `This action add`
  }

  update(id: string) {
    return `This action updates a #${id}`
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

  findOne(id: string) {
    return `This action returns a #${id}`
  }
}
