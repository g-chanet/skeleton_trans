import { Test, TestingModule } from '@nestjs/testing';
import { UserRelationsService } from './user-relations.service';

describe('UserRelationsService', () => {
  let service: UserRelationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRelationsService],
    }).compile();

    service = module.get<UserRelationsService>(UserRelationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
