import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';

@Injectable()
export class BranchService {
    constructor(private prisma:PrismaService){}


}   
