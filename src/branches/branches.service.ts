import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBranchInput } from './dto/create-branch.input';
import { UpdateBranchInput } from './dto/update-branch.input';
import { Branch } from './entities/branch.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { DeleteResponse } from 'src/utils/responses/delete-enitity.response';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class BranchesService {
  constructor(
    @InjectRepository(Branch)
    private readonly branchRepository: Repository<Branch>,
    private readonly userService: UsersService,
  ) {}

  async create(createBranchInput: CreateBranchInput) {
    const user = await this.userService.findOne(createBranchInput.userId);
    const newBranch = new Branch({ ...createBranchInput, user });
    return this.branchRepository.save(newBranch);
  }

  async findAll(userId: string) {
    return this.branchRepository.find({ where: { user: { id: userId } } });
  }

  async findOne(id: string, user: User) {
    const branch = await this.branchRepository.findOne({
      where: { id, user: { id: user.id } },
      relations: { user: true },
    });
    if (!branch) {
      throw new BadRequestException('The branch requested was not found');
    }
    return branch;
  }

  async update(user: User, updateBranchInput: UpdateBranchInput) {
    try {
      await this.findOne(updateBranchInput.id, user);
      await this.branchRepository.update(updateBranchInput.id, {
        ...updateBranchInput,
      });
      return this.findOne(updateBranchInput.id, user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string, user: User): Promise<DeleteResponse> {
    try {
      const branchExists = await this.findOne(id, user);
      await this.branchRepository.remove(branchExists);
      return { message: 'Deleted branch' };
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
