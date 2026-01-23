import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { UserStatus } from '@prisma/client';
import { compirePassword, hashPassword } from 'src/common/config/bcrypt';
import { JwtServices } from 'src/common/config/jwt/jwt.service';
import { PrismaService } from 'src/common/database/prisma.service';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtServices,
    ) { }

    async login(payload: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: { phone: payload.phone },
            include: {
                branch: true,
                restaurant: true,
            },
        });

        if (!user) {
            throw new NotFoundException('user not found');
        }

        const isPasswordValid = await compirePassword(
            payload.password,
            user.password,
        );

        if (!isPasswordValid) {
            throw new NotFoundException('phone or password isn\'t correct ');
        }

        if (user.status !== UserStatus.ACTIVE) {
            throw new BadRequestException('user blocked');
        }

        return {
            accessToken: await this.jwtService.generateAccessToken(user),
            refreshToken: await this.jwtService.generateRefreshToken(user),

            user: {
                id: user.id,
                fullname: user.fullname,
                phone: user.phone,
                role: user.role,
                branchId: user.branchId,
                restaurantId: user.restaurantId,
                createdAt: user.createdAt,
            },
        };
    }

    async resetPassword(payload: ResetPasswordDto) {
        const user = await this.prisma.user.findUnique({
            where: { phone: payload.phone },
        });

        if (!user) {
            throw new NotFoundException(' user not found');
        }

        const isOldPasswordCorrect = await compirePassword(
            payload.oldPassword,
            user.password,
        );

        if (!isOldPasswordCorrect) {
            throw new BadRequestException('old password isn\'t correct ');
        }

        const newHashedPassword = await hashPassword(payload.newPassword);

        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                password: newHashedPassword,
            },
        });

        return {
            message: 'password successfuly updated',
        };
    }
}
