import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ProductType } from '@prisma/client';
import { PrismaService } from 'src/common/database/prisma.service';
import { CreateProductDto } from './dto/create.product.dto';
import { UpdateProductDto } from './dto/update.product.dto';

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) { }

    async getAllProduct(query: {
        search?: string;
        categoryId?: number;
        restaurantId?: number;
        type?: ProductType;
        isActive?: boolean;
    }) {
        const { search, categoryId, restaurantId, type, isActive } = query;

        const where: any = {};

        if (search) {
            where.name = {
                contains: search,
                mode: 'insensitive',
            };
        }

        if (categoryId) {
            where.categoryId = Number(categoryId);
        }

        if (restaurantId) {
            where.restaurantId = Number(restaurantId);
        }

        if (type) {
            where.type = type;
        }

        if (isActive !== undefined) {
            where.isActive = String(isActive) === 'true';
        }

        const data = await this.prisma.product.findMany({
            where,
            include: {
                category: true,
                restaurant: true,
                setItems: true,
                orderItems: true,
                asSetItems: true
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return {
            success: true,
            count: data.length,
            data,
        };
    }

    async getOneProduct(id: number) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: {
                category: true,
                restaurant: true,
                setItems: {
                    include: {
                        product: true
                    }
                },
                asSetItems: true,
                orderItems: true,
            }
        });

        if (!product) {
            throw new NotFoundException(`ID: ${id} not found`);
        }

        return {
            success: true,
            data: product
        };
    }

    async createProduct(payload: CreateProductDto) {
        const existsRestaurant = await this.prisma.restaurant.findUnique({
            where: { id: payload.restaurantId }
        });
        if (!existsRestaurant) {
            throw new NotFoundException(`ID: ${payload.restaurantId}  restoran not found`);
        }

        const existsCategory = await this.prisma.category.findUnique({
            where: { id: payload.categoryId }
        });
        if (!existsCategory) {
            throw new NotFoundException(`ID: ${payload.categoryId} kategoriya not found`);
        }


        const duplicateProduct = await this.prisma.product.findFirst({
            where: {
                name: payload.name,
                restaurantId: payload.restaurantId
            }
        });
        if (duplicateProduct) {
            throw new ConflictException('this product already exists');
        }

        const newProduct = await this.prisma.product.create({
            data: {
                name: payload.name,
                price: payload.price,
                type: payload.type || 'SINGLE',
                isActive: payload.isActive ?? true,
                categoryId: payload.categoryId,
                restaurantId: payload.restaurantId,
            },
            include: {
                category: true,
                restaurant: true
            }
        });

        return {
            success: true,
            message: "Mahsulot muvaffaqiyatli yaratildi",
            data: newProduct
        };
    }


    async updateProduct(id: number, payload: Omit<UpdateProductDto, 'restaurantId'>) {
        const existsProduct = await this.prisma.product.findUnique({
            where: { id }
        });
        if (!existsProduct) {
            throw new NotFoundException(`ID: ${id}  product not found `);
        }

        if (payload.categoryId) {
            const existsCategory = await this.prisma.category.findUnique({
                where: { id: payload.categoryId }
            });
            if (!existsCategory) {
                throw new NotFoundException(`ID: ${payload.categoryId}  caqtegory not found `);
            }
        }

        const updatedProduct = await this.prisma.product.update({
            where: { id },
            data: {
                name: payload.name || existsProduct.name,
                price: payload.price || existsProduct.price,
                type: payload.type || existsProduct.type,
                isActive: payload.isActive || existsProduct.isActive,
                categoryId: payload.categoryId || existsProduct.categoryId,
            },
            include: {
                category: true,
                restaurant: true
            }
        });

        return {
            success: true,
            data: updatedProduct
        };
    }


    async updateProductType(id: number, type: ProductType) {
        const existsProduct = await this.prisma.product.findUnique({
            where: { id }
        });
        if (!existsProduct) {
            throw new NotFoundException(`ID: ${id}  product not found `);
        }

        const data = await this.prisma.product.update({
            where: {
                id: id
            },
            data: {
                type: type
            },
            include: {
                category: true,
                restaurant: true
            }
        })

        return {
            success: true,
            data
        }

    }

    async updateProductStatusToogle(id: number) {
        const existsProduct = await this.prisma.product.findUnique({
            where: { id }
        });
        if (!existsProduct) {
            throw new NotFoundException(`ID: ${id}  product not found `);
        }

        const data = await this.prisma.product.update({
            where: {
                id: id
            },
            data: {
                isActive: !existsProduct.isActive
            },
            include: {
                category: true,
                restaurant: true
            }
        })

        return {
            success: true,
            data
        }

    }

    async deleteProduct(id: number) {
        const existsProduct = await this.prisma.product.findUnique({
            where: { id }
        });
        if (!existsProduct) {
            throw new NotFoundException(`ID: ${id}  product not found `);
        }

        const data = await this.prisma.product.delete({
            where: {
                id: id
            }
        })

        return {
            success:true,
            data:data.id
        }
    }



}
