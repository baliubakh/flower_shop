import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Role } from '@prisma/client';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

export type JwtPayload = {
  sub: number;
  first_name: string;
  last_name: string;
  role: Role;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        AccessTokenStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: process.env.JWT_ACCESS_SECRET,
    });
  }

  private static extractJWT(req: Request): string | null {
    if (
      req.cookies &&
      'auth-cookie' in req.cookies &&
      req.cookies['auth-cookie'].access_token &&
      req.cookies['auth-cookie'].access_token.length > 0
    ) {
      return req.cookies['auth-cookie'].access_token;
    }
    return null;
  }
  async validate(payload: JwtPayload) {
    if (payload === null) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
