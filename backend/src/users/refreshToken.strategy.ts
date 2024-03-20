import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './accessToken.strategy';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        RefreshTokenStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: configService.get<string>('JWT_REFRESH_SECRET'),
    });
  }

  private static extractJWT(req: Request): string | null {
    if (
      req.cookies &&
      'auth-cookie' in req.cookies &&
      req.cookies['auth-cookie'].refresh_token &&
      req.cookies['auth-cookie'].refresh_token.length > 0
    ) {
      return req.cookies['auth-cookie'].refresh_token;
    }
    return null;
  }
  async validate(payload: JwtPayload) {
    if (payload === null) {
      throw new UnauthorizedException();
    }
    return payload;
  }
  // validate(req: Request, payload: JwtPayload) {
  //   const refresh_token = req.get('Authorization').replace('Bearer', '').trim();
  //   return { ...payload, refresh_token };
  // }
}
