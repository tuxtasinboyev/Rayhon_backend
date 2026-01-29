import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { CreateRestaurantDto } from './dto/create.restaurant.dto';
import { UpdateRestaurantDto } from './dto/update.restaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(private prisma: PrismaService) {}

  async getAllRestaurants() {
    const data = await this.prisma.restaurant.findMany({
      include: {
        users: {
          select: {
            id: true,
            fullname: true,
            branchId: true,
            phone: true,
            role: true,
            status: true,
            createdAt: true,
            updateAt: true,
          },
        },
        branches: {
          select: {
            id: true,
            name: true,
            address: true,
            createdAt: true,
            updateAt: true,
          },
        },
        categories: {
          select: {
            id: true,
            name: true,
          },
        },
        orders: true,
        products: true,
      },
    });
    return {
      success: true,
      data,
    };
  }

  async getByBranch(branchId: number) {
    const existsBranch = await this.prisma.branch.findUnique({
      where: {
        id: branchId,
      },
    });
    if (!existsBranch) throw new NotFoundException('branch not found ');

    const data = await this.prisma.restaurant.findMany({
      where: { branches: { some: { id: branchId } } },
      include: {
        users: {
          select: {
            id: true,
            fullname: true,
            branchId: true,
            phone: true,
            role: true,
            status: true,
            createdAt: true,
            updateAt: true,
          },
        },
        branches: {
          select: {
            id: true,
            name: true,
            address: true,
            createdAt: true,
            updateAt: true,
          },
        },
        categories: {
          select: {
            id: true,
            name: true,
          },
        },
        orders: true,
        products: true,
      },
    });

    return {
      success: true,
      data,
    };
  }

  async getRestaurantById(id: number) {
    const existsRestauran = await this.prisma.restaurant.findUnique({
      where: { id: id },
    });
    if (!existsRestauran) throw new NotFoundException('restaurat not found');

    const data = this.prisma.restaurant.findMany({
      where: { id: id },
      include: {
        users: {
          select: {
            id: true,
            fullname: true,
            branchId: true,
            phone: true,
            role: true,
            status: true,
            createdAt: true,
            updateAt: true,
          },
        },
        branches: {
          select: {
            id: true,
            name: true,
            address: true,
            createdAt: true,
            updateAt: true,
          },
        },
        categories: {
          select: {
            id: true,
            name: true,
          },
        },
        orders: true,
        products: true,
      },
    });

    return {
      success: true,
      data,
    };
  }

  async createRestourant(data: CreateRestaurantDto) {
    const findRestaran = await this.prisma.restaurant.findUnique({
      where: { name: data.name },
    });

    if (findRestaran)
      throw new ConflictException("Restaran name yunik bo'lishi kerak");

    const createdData = await this.prisma.restaurant.create({
      data: {
        name: data.name,
        address: data.address,
        phone: data.phone,
      },
      include: {
        users: {
          select: {
            id: true,
            fullname: true,
            branchId: true,
            phone: true,
            role: true,
            status: true,
            createdAt: true,
            updateAt: true,
          },
        },
        branches: {
          select: {
            id: true,
            name: true,
            address: true,
            createdAt: true,
            updateAt: true,
          },
        },
        categories: {
          select: {
            id: true,
            name: true,
          },
        },
        orders: true,
        products: true,
      },
    });
    return {
      success: true,
      data: createdData,
    };
  }

  async updateRestaurant(id: number, data: UpdateRestaurantDto) {
    const existsRestauran = await this.prisma.restaurant.findUnique({
      where: { id: id },
    });
    if (!existsRestauran) throw new NotFoundException('restaurat not found');

    const updatedData = await this.prisma.restaurant.update({
      where: { id: id },
      data: {
        name: data.name || existsRestauran.name,
        address: data.address || existsRestauran.address,
        phone: data.phone || existsRestauran.phone,
      },
      include: {
        users: {
          select: {
            id: true,
            fullname: true,
            branchId: true,
            phone: true,
            role: true,
            status: true,
            createdAt: true,
            updateAt: true,
          },
        },
        branches: {
          select: {
            id: true,
            name: true,
            address: true,
            createdAt: true,
            updateAt: true,
          },
        },
        categories: {
          select: {
            id: true,
            name: true,
          },
        },
        orders: true,
        products: true,
      },
    });
    return {
      success: true,
      data: updatedData,
    };
  }

  async deleteRestaurant(id: number) {
    const existsRestauran = await this.prisma.restaurant.findUnique({
      where: { id: id },
    });
    if (!existsRestauran) throw new NotFoundException('restaurat not found');

    await this.prisma.restaurant.delete({ where: { id: id } });

    return {
      success: true,
      message: 'successfully',
    };
  }
}
