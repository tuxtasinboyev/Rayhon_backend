import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { UserRole, UserStatus } from '@prisma/client';
import { hashPassword } from 'src/common/config/bcrypt';
import { JwtPayload } from 'src/common/config/jwt/jwt.service';
import { PrismaService } from 'src/common/database/prisma.service';
import { CreateUserDto } from './dto/create.user.dto';
import { GetAllUsersDto } from './dto/get.all.users.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }

    async getProfile(user: JwtPayload) {
        const data = await this.prisma.user.findUnique({
            where: { id: user.userId },
            select: {
                id: true,
                fullname: true,
                phone: true,
                role: true,
                status: true,
                branchId: true,
                restaurantId: true,
                createdAt: true,
            },
        });

        if (!data) throw new NotFoundException('User not found');

        return data;
    }



    async getAllUsersByRoleArxive(
        role: UserRole,
        query: GetAllUsersDto,
        currentUser: JwtPayload,
    ) {
        const page = Number(query.page) || 1
        const limit = Number(query.limit) || 10
        // const { page = 1, limit = 10 } = query;
        const skip = (page - 1) * limit;

        const where: any = {
            role,
            restaurantId: currentUser.restaurantId,
            status: UserStatus.BLOCKED
        };

        const [users, total] = await this.prisma.$transaction([
            this.prisma.user.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    fullname: true,
                    phone: true,
                    role: true,
                    status: true,
                    branchId: true,
                    createdAt: true,
                },
            }),
            this.prisma.user.count({ where }),
        ]);

        return {
            users,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }


    async getAllUsersByRole(
        role: UserRole,
        query: GetAllUsersDto,
        currentUser: JwtPayload,
    ) {
        const page = Number(query.page) || 1
        const limit = Number(query.limit) || 10
        // const { page = 1, limit = 10 } = query;
        const skip = (page - 1) * limit;

        const where: any = {
            role,
            restaurantId: currentUser.restaurantId,
            status: UserStatus.ACTIVE
        };

        const [users, total] = await this.prisma.$transaction([
            this.prisma.user.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    fullname: true,
                    phone: true,
                    role: true,
                    status: true,
                    branchId: true,
                    createdAt: true,
                },
            }),
            this.prisma.user.count({ where }),
        ]);

        return {
            users,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    async createUser(
        payload: CreateUserDto,
        role: UserRole,
        currentUser: JwtPayload,
    ) {
        const exists = await this.prisma.user.findUnique({
            where: { phone: payload.phone },
        });
        if (exists) throw new ConflictException('Phone already exists');

        if (!payload.branchId)
            throw new BadRequestException('branchId is required');

        const existsReastarant = await this.prisma.restaurant.findUnique({ where: { id: payload.restaurantId } })
        if (!existsReastarant) throw new NotFoundException('restarunt not found')
            
        const branch = await this.prisma.branch.findUnique({
            where: { id: payload.branchId },
        });
        if (!branch) throw new NotFoundException('Branch not found');

        const password = await hashPassword(payload.password);

        return this.prisma.user.create({
            data: {
                fullname: payload.fullname,
                phone: payload.phone,
                password,
                role,
                status: UserStatus.ACTIVE,
                branchId: payload.branchId,
                restaurantId: payload.restaurantId,
            },
        });
    }


    async updateUser(id: number, payload: UpdateUserDto) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) throw new NotFoundException('User not found');

        if (payload.phone && payload.phone !== user.phone) {

            const existPhone = await this.prisma.user.findUnique({
                where: {
                    phone: payload.phone
                }
            })

            if (existPhone) throw new ConflictException("this phone already exists")
        }
        return this.prisma.user.update({
            where: { id },
            data: {
                fullname: payload.fullname ?? user.fullname,
                phone: payload.phone ?? user.phone,
                status: payload.status ?? user.status,
            },
        });
    }

    async updateStatusTooggle(id: number) {

        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) throw new NotFoundException('User not found');

        const newStatus = user.status === UserStatus.ACTIVE
            ? UserStatus.BLOCKED
            : UserStatus.ACTIVE;

        await this.prisma.user.update({
            where: { id: id },
            data: {
                status: newStatus
            }
        })
        return {
            success: true,
            message: "successfully updated"
        }
    }


    async deleteUser(id: number) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) throw new NotFoundException('User not found');

        await this.prisma.user.delete({ where: { id } });

        return { message: 'User deleted', userId: id };
    }


}
