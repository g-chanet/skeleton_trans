import { Injectable } from '@nestjs/common';
import { CreateUserRelationInput } from './dto/create-user-relation.input';
import { UpdateUserRelationInput } from './dto/update-user-relation.input';

@Injectable()
export class UserRelationsService {
  create(createUserRelationInput: CreateUserRelationInput) {
    return 'This action adds a new userRelation';
  }

  findAll() {
    return `This action returns all userRelations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userRelation`;
  }

  update(id: number, updateUserRelationInput: UpdateUserRelationInput) {
    return `This action updates a #${id} userRelation`;
  }

  remove(id: number) {
    return `This action removes a #${id} userRelation`;
  }
}
