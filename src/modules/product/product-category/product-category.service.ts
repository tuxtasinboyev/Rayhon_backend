import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { CreateCategoryDto } from './dto/create.category.dto';
import { UpdateCategoryDto } from './dto/update.category.dto';

@Injectable()
export class ProductCategoryService {
    constructor(private prisma: PrismaService) { }

    async getAllCategories(restaurantId: number) {
        const restaurant = await this.prisma.restaurant.findUnique({
            where: { id: restaurantId }
        });
        if (!restaurant) throw new NotFoundException('Restoran topilmadi');

        const data = await this.prisma.category.findMany({
            where: { restaurantId },
            include: {
                products: true,
                _count: {
                    select: { products: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return { success: true, data };
    }

    async getOneCategory(id: number) {
        const category = await this.prisma.category.findUnique({
            where: { id },
            include: { products: true }
        });

        if (!category) throw new NotFoundException('Kategoriya topilmadi');

        return { success: true, data: category };
    }

    async createCategory(dto: CreateCategoryDto) {
        const restaurant = await this.prisma.restaurant.findUnique({
            where: { id: dto.restaurantId }
        });
        if (!restaurant) throw new NotFoundException('Restoran topilmadi');

        const existingCategory = await this.prisma.category.findUnique({
            where: {
                restaurantId_name: {
                    name: dto.name,
                    restaurantId: dto.restaurantId
                }
            }
        });

        if (existingCategory) {
            throw new ConflictException('this category already exist in restaurant ');
        }

        const newCategory = await this.prisma.category.create({
            data: {
                name: dto.name,
                restaurantId: dto.restaurantId
            }
        });

        return { success: true, data: newCategory };
    }

    async updateCategory(id: number, dto: UpdateCategoryDto) {
        const category = await this.prisma.category.findUnique({
            where: { id }
        });
        if (!category) throw new NotFoundException('Kategoriya topilmadi');

        if (dto.name && dto.name !== category.name) {
            const duplicate = await this.prisma.category.findFirst({
                where: {
                    restaurantId: category.restaurantId,
                    name: { equals: dto.name, mode: 'insensitive' },
                    NOT: { id: id }
                }
            });
            if (duplicate) throw new ConflictException('Bu nomli kategoriya restoranda mavjud');
        }

        const updatedData = await this.prisma.category.update({
            where: { id },
            data: {
                name: dto.name,
                restaurantId: dto.restaurantId
            }
        });

        return { success: true, data: updatedData };
    }

    async deleteCategory(id: number) {
        const category = await this.prisma.category.findUnique({
            where: { id }
        });
        if (!category) throw new NotFoundException('Kategoriya topilmadi');

        await this.prisma.category.delete({
            where: { id }
        });

        return { success: true, message: 'Kategoriya muvaffaqiyatli o\'chirildi' };
    }
}