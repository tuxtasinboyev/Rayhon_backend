import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { CreateBranch } from './dto/create.branch.dto';
import { UpdateBranch } from './dto/update.branch.dto';

@Injectable()
export class BranchService {
    constructor(private prisma: PrismaService) { }

    async getAllBranchesActive() {
        return this.prisma.branch.findMany({
            where: { status: true },
            include: {
                orders: true,
                restaurant: true,
                users: {
                    select: {
                        id: true,
                        fullname: true,
                        phone: true,
                        role: true,
                        status: true,
                        createdAt: true,
                        updateAt: true
                    }
                },
                tables: true
            }
        })
    }

    async getAllBranchesArxive() {
        return this.prisma.branch.findMany({
            where: { status: false },
            include: {
                orders: true,
                restaurant: true,
                users: {
                    select: {
                        id: true,
                        fullname: true,
                        phone: true,
                        role: true,
                        status: true,
                        createdAt: true,
                        updateAt: true
                    }
                },
                tables: true
            }
        })
    }


    async getOneBranchBy(id: number) {
        const existsBranch = await this.prisma.branch.findUnique({ where: { id: id } })
        if (!existsBranch) throw new NotFoundException('branch not found')

        return this.prisma.branch.findUnique({
            where: { id: id },
            include: {
                orders: true,
                restaurant: true,
                users: {
                    select: {
                        id: true,
                        fullname: true,
                        phone: true,
                        role: true,
                        status: true,
                        createdAt: true,
                        updateAt: true
                    }
                },
                tables: true
            }
        })

    }

    async getbranchByRestaurantId(id: number) {
        const existsRestauran = await this.prisma.restaurant.findUnique({ where: { id: id } })
        if (!existsRestauran) throw new NotFoundException('restaurant not found')

        return this.prisma.branch.findMany({
            where: { restaurantId: id },
            include: {
                orders: true,
                restaurant: true,
                users: {
                    select: {
                        id: true,
                        fullname: true,
                        phone: true,
                        role: true,
                        status: true,
                        createdAt: true,
                        updateAt: true
                    }
                },
                tables: true
            }
        })

    }

    async createBranch(payload: CreateBranch) {

        const existsRestauran = await this.prisma.restaurant.findUnique({ where: { id: payload.restaurantId } })
        if (!existsRestauran) throw new NotFoundException('restaurant not found')

        const data = await this.prisma.branch.create({
            data: {
                name: payload.name,
                address: payload.address,
                restaurantId: payload.restaurantId,
            },
            include: {
                orders: true,
                restaurant: true,
                users: {
                    select: {
                        id: true,
                        fullname: true,
                        phone: true,
                        role: true,
                        status: true,
                        createdAt: true,
                        updateAt: true
                    }
                },
                tables: true
            }
        })
        return {
            success: true,
            data
        }

    }
    async updateBranch(id: number, payload: UpdateBranch) {
        const existsBranch = await this.prisma.branch.findUnique({ where: { id: id } })
        if (!existsBranch) throw new NotFoundException('branch not found')

        if (payload.restaurantId && payload.restaurantId !== existsBranch.restaurantId) {
            const existsRestauran = await this.prisma.restaurant.findUnique({ where: { id: payload.restaurantId } })
            if (!existsRestauran) throw new NotFoundException('restaurant not found')
        }

        const data = await this.prisma.branch.update({
            where: {
                id: id
            },
            data: {
                address: payload.address || existsBranch.address,
                name: payload.name || existsBranch.name,
                restaurantId: payload.restaurantId || existsBranch.restaurantId
            },
            include: {
                orders: true,
                restaurant: true,
                users: {
                    select: {
                        id: true,
                        fullname: true,
                        phone: true,
                        role: true,
                        status: true,
                        createdAt: true,
                        updateAt: true
                    }
                },
                tables: true
            }

        })

        return {
            success: true,
            data
        }

    }
    
    async updateBranchStatus(id: number) {
        const existsBranch = await this.prisma.branch.findUnique({ where: { id: id } })
        if (!existsBranch) throw new NotFoundException('branch not found')

        await this.prisma.branch.update({ where: { id: id }, data: { status: !existsBranch.status } })
        return {
            success: true,
            message: 'successfully updated'
        }
    }

    async deleteBranch(id: number) {
        const existsBranch = await this.prisma.branch.findUnique({ where: { id: id } })
        if (!existsBranch) throw new NotFoundException('branch not found')

        await this.prisma.branch.delete({ where: { id: id } })

        return {
            success: true,
            message: "successfully deleted"
        }
    }
}   
