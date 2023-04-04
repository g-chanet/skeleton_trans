import { Injectable } from '@nestjs/common'
@Injectable()
export class UserRelationsService {
  //**************************************************//
  //  MUTATION
  //**************************************************//

  create() {
    return `This action add`
  }

  update(id: string) {
    return `This action updates a #${id}`
  }

  delete(id: string) {
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
