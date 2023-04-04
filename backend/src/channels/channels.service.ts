import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChannelsService {
  constructor(private prisma: PrismaService) {}
  //**************************************************//
  //  MUTATION
  //**************************************************//

  create() {
    return `This action add`;
  }

  update(id: string) {
    return `This action updates a #${id}`;
  }

  remove(id: string) {
    return `This action removes a #${id}`;
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  findAll() {
    return `This action returns all`;
  }

  findOne(id: string) {
    return `This action returns a #${id}`;
  }
}
