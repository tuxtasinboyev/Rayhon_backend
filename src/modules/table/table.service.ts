import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { TableStatus } from '@prisma/client';
import { PrismaService } from 'src/common/database/prisma.service';
import { CreateTableDto } from './dto/create.table.dto';
import { UpdateTableDto } from './dto/update.table.dto';

@Injectable()
export class TableService {
    constructor(private prisma: PrismaService) { }

    async getAllTables(branchId: number) {
        const existsBranch = await this.prisma.branch.findUnique({ where: { id: branchId } })
        if (!existsBranch) throw new NotFoundException('branch not found')

        const data = await this.prisma.table.findMany({
            where: { branchId: branchId }, include: {
                branch: true,
                orders: true
            }
        })

        return {
            success: true,
            data
        }
    }

    async getOneTable(id: number) {

        const existsTable = await this.prisma.table.findUnique({
            where: { id: id }, include: {
                branch: true,
                orders: true
            }
        })
        if (!existsTable) throw new NotFoundException('table not found')

        return {
            success: true,
            data: existsTable
        }

    }


    async createTable(payload: CreateTableDto) {

        const existsBranch = await this.prisma.branch.findUnique({ where: { id: payload.branchId } })
        if (!existsBranch) throw new NotFoundException('branch not found')

        const existNumber = await this.prisma.table.findUnique({ where: { branchId_number: { branchId: payload.branchId, number: payload.number } } })
        if (existNumber) throw new ConflictException('this nuumber already exist in branch')

        const data = await this.prisma.table.create({
            data: {
                capacity: payload.capacity,
                number: payload.number,
                status: payload.status,
                branchId: payload.branchId
            },
            include: {
                branch: true,
            }
        })

        return {
            success: true,
            data
        }

    }

    async UpdateTable(id: number, payload: Omit<UpdateTableDto, 'branchId'>) {
        const existsTable = await this.prisma.table.findUnique({
            where: { id: id }, include: {
                branch: true,
                orders: true
            }
        })
        if (!existsTable) throw new NotFoundException('table not found')


        const data = await this.prisma.table.update({
            where: {
                id: id
            },
            data: {
                capacity: payload.capacity || existsTable.capacity,
                number: payload.number || existsTable.number,
                status: payload.status || existsTable.status,
            },
            include: {
                branch: true,
            }
        })

        return {
            success: true,
            data
        }

    }

    async updateStatus(id: number, status: TableStatus) {
        const existsTable = await this.prisma.table.findUnique({
            where: { id: id }, include: {
                branch: true,
                orders: true
            }
        })
        if (!existsTable) throw new NotFoundException('table not found')

        const data = await this.prisma.table.update({
            where: {
                id: id
            },
            data: {
                status: status
            },
            include: {
                branch: true,
                orders: true
            }
        })

        return {
            status: true,
            data
        }
    }

    async deleteTable(id: number) {
        const existsTable = await this.prisma.table.findUnique({
            where: { id: id }, include: {
                branch: true,
                orders: true
            }
        })
        if (!existsTable) throw new NotFoundException('table not found')

        const data = await this.prisma.table.delete({ where: { id: id } })

        return {
            success: true,
            id: data.id
        }
    }
}
