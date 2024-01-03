import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';
import { Payload, PayloadRt } from '../types';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          let token = null;
          if (req && req.headers) {
            
            token=req.headers?.reresh_token
            
          }
          
          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.REFRESH_TOKEN_SECRET_KEY,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: Payload): Promise<PayloadRt> {
    const refreshToken = req.headers?.reresh_token as string;
    if (!refreshToken) throw new ForbiddenException('Refresh token malformed');
    return {
      ...payload,
      refresh_token:refreshToken
    };
  }
}
