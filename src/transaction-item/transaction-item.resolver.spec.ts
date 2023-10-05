import { Test, TestingModule } from '@nestjs/testing';
import { TransactionItemResolver } from './transaction-item.resolver';
import { TransactionItemService } from './transaction-item.service';

describe('TransactionItemResolver', () => {
  let resolver: TransactionItemResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionItemResolver, TransactionItemService],
    }).compile();

    resolver = module.get<TransactionItemResolver>(TransactionItemResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
