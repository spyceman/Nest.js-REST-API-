import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  private async validateUser(dto: LoginUserDto) {
    const user = await this.UserModel.findOne({ login: dto.login });
    if (user) {
      const isPasswordMatching = await bcrypt.compare(
        dto.password,
        user.password,
      );
      if (user && isPasswordMatching) {
        return user;
      }
    }
    throw new UnauthorizedException({ message: 'Wrong credentials provided' });
  }

  async login(dto: LoginUserDto) {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  async registration(dto: CreateUserDto) {
    const check = await this.UserModel.findOne({ login: dto.login });
    if (!check) {
      dto.password = await bcrypt.hash(dto.password, 10);
      const user = new this.UserModel(dto);
      await user.save();
      return this.generateToken(user);
    } else {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
  }

  private async generateToken(user: CreateUserDto) {
    const payload = {
      login: user.login,
      password: user.password,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
