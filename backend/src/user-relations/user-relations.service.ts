import { Injectable } from '@nestjs/common';
@Injectable()
export class UserRelationsService {
  create() {
    return 'This action adds a new userRelation';
  }

  findAll() {
    return `This action returns all userRelations`;
  }

  findOne(id: string) {
    return `This action returns a #${id} userRelation`;
  }

  update(id: string) {
    return `This action updates a #${id} userRelation`;
  }

  remove(id: string) {
    return `This action removes a #${id} userRelation`;
  }
}
