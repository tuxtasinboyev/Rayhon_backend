import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { User, UserRole } from '@prisma/client';

export type JwtPayload = {
    userId: number;
    role: UserRole;
    branchId?: number;
    restaurantId?: number

};

@Injectable()
export class JwtServices {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) { }

    private async signToken(
        payload: JwtPayload,
        secret: string,
        expiresIn: JwtSignOptions['expiresIn'],
    ): Promise<string> {
        return this.jwtService.signAsync(payload, {
            secret,
            expiresIn,
        });
    }
    async generateAccessToken(user: User): Promise<string> {
        const secret =
            this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET') ??
            'access_default_secret';

        const expiresIn =
            this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRES_IN') ?? '15m';

        return this.signToken(
            {
                userId: user.id,
                role: user.role,
                branchId: user.branchId ?? undefined,
                restaurantId: user.restaurantId ?? undefined, // ✅ MUHIM
            },
            secret,
            expiresIn as JwtSignOptions['expiresIn'],
        );
    }
    async generateRefreshToken(user: User): Promise<string> {
        const secret =
            this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET') ??
            'refresh_default_secret';

        const expiresIn =
            this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRES_IN') ?? '7d';

        return this.signToken(
            {
                userId: user.id,
                role: user.role,
                branchId: user.branchId ?? undefined,
                restaurantId: user.restaurantId ?? undefined, // ✅ MUHIM
            },
            secret,
            expiresIn as JwtSignOptions['expiresIn'],
        );
    }

}
