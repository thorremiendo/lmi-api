import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(@Inject('PrismaClient') private prisma: PrismaClient) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      return false;
    }

    const dbUser = await this.prisma.user.findUnique({
      where: { id: user.sub },
      select: { role: true },
    });

    return dbUser?.role === 'Admin';
  }
}
