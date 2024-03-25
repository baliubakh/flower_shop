import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma.service';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AccessTokenStrategy } from './accessToken.strategy';
import { RefreshTokenStrategy } from './refreshToken.strategy';
import { S3Service } from 'src/s3/s3.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_ACCESS_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UsersController],
  providers: [
    PrismaService,
    S3Service,
    UsersService,
    AuthService,
    LocalStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
})
export class UsersModule {}
