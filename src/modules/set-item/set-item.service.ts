import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { PrismaService } from 'src/common/database/prisma.service'
import { UpdateSetItemDto } from './dto/update.setItem.dto'
import { CreateSetItemDto } from './dto/create.setItem.dto'

@Injectable()
export class SetItemService {
    constructor(private prisma: PrismaService) { }

    async getAllSetItem() {
        const items = await this.prisma.setItem.findMany({
            include: {
                product: true,
                set: true,
            },
        })

        return {
            success: true,
            data: items,
        }
    }

    async getOneSetItem(id: number) {
        const item = await this.prisma.setItem.findUnique({
            where: { id },
            include: {
                product: true,
                set: true,
            },
        })

        if (!item) throw new NotFoundException('SetItem not found')

        return {
            success: true,
            data: item,
        }
    }

    async create(dto: CreateSetItemDto) {
        const { setId, productId, quantity } = dto

        if (setId === productId) {
            throw new BadRequestException(
                'Set product and item product cannot be the same',
            )
        }

        const setProduct = await this.prisma.product.findUnique({
            where: { id: setId },
        })

        if (!setProduct)
            throw new NotFoundException('Set product not found')

        if (setProduct.type !== 'SET')
            throw new BadRequestException('Product is not SET type')

        const product = await this.prisma.product.findUnique({
            where: { id: productId },
        })

        if (!product)
            throw new NotFoundException('Product not found')

        if (product.type !== 'SINGLE')
            throw new BadRequestException(
                'Only SINGLE products can be added to SET',
            )

        const exists = await this.prisma.setItem.findFirst({
            where: {
                setId,
                productId,
            },
        })

        if (exists)
            throw new BadRequestException(
                'This product already exists in this set',
            )

        const created = await this.prisma.setItem.create({
            data: {
                quantity,
                setId,
                productId,
            },
            include: {
                product: true,
                set: true,
            },
        })

        return {
            success: true,
            message: 'Set item created successfully',
            data: created,
        }
    }

    async update(id: number, dto: UpdateSetItemDto) {
        const existing = await this.prisma.setItem.findUnique({
            where: { id },
        })

        if (!existing) throw new NotFoundException('SetItem not found')

        const newSetId = dto.setId ?? existing.setId
        const newProductId = dto.productId ?? existing.productId

        if (newSetId === newProductId) {
            throw new BadRequestException(
                'Set product and item product cannot be the same',
            )
        }

        if (dto.setId) {
            const setProduct = await this.prisma.product.findUnique({
                where: { id: dto.setId },
            })

            if (!setProduct)
                throw new NotFoundException('Set product not found')

            if (setProduct.type !== 'SET')
                throw new BadRequestException('Product is not SET type')
        }

        if (dto.productId) {
            const product = await this.prisma.product.findUnique({
                where: { id: dto.productId },
            })

            if (!product)
                throw new NotFoundException('Product not found')

            if (product.type !== 'SINGLE')
                throw new BadRequestException(
                    'Only SINGLE products can be added to SET',
                )
        }

        if (dto.setId || dto.productId) {
            const duplicate = await this.prisma.setItem.findFirst({
                where: {
                    setId: newSetId,
                    productId: newProductId,
                    NOT: { id },
                },
            })

            if (duplicate)
                throw new BadRequestException(
                    'This product already exists in this set',
                )
        }

        const updated = await this.prisma.setItem.update({
            where: { id },
            data: {
                quantity: dto.quantity,
                setId: dto.setId,
                productId: dto.productId,
            },
            include: {
                product: true,
                set: true,
            },
        })

        return {
            success: true,
            message: 'Set item updated successfully',
            data: updated,
        }
    }

  
    async delete(id: number) {
        const exists = await this.prisma.setItem.findUnique({
            where: { id },
        })

        if (!exists) throw new NotFoundException('SetItem not found')

        await this.prisma.setItem.delete({
            where: { id },
        })

        return {
            success: true,
            message: 'Set item deleted successfully',
        }
    }
}
