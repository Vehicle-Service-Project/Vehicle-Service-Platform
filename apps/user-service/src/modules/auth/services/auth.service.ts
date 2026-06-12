import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { PrismaService } from '../../../infrastructure/prisma/prisma.service.js';
import { AuthMapper } from '../auth.mapper.js';
import type {
  PublicAccount,
  RequestWithSession,
  SessionWithAccount,
} from '../auth.types.js';
import type { LoginDto } from '../dto/login.dto.js';
import type { RegisterDto } from '../dto/register.dto.js';
import { PasswordService } from './password.service.js';
import { SessionService } from './session.service.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly sessionService: SessionService,
    private readonly authMapper: AuthMapper,
  ) {}

  async register(
    dto: RegisterDto,
    request: RequestWithSession,
  ): Promise<PublicAccount> {
    const existingAccount = await this.prisma.account.findUnique({
      where: {
        email: dto.email,
      },
      select: {
        id: true,
      },
    });

    if (existingAccount) {
      throw new ConflictException('Account with this email already exists');
    }

    const passwordHash = await this.passwordService.hash(dto.password);
    const account = await this.prisma.account.create({
      data: {
        email: dto.email,
        fullName: dto.fullName,
        passwordHash,
      },
    });

    await this.startAuthenticatedSession(request, account.id);

    return this.authMapper.toPublicAccount(account);
  }

  async login(
    dto: LoginDto,
    request: RequestWithSession,
  ): Promise<PublicAccount> {
    const account = await this.prisma.account.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!account) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await this.passwordService.verify(
      account.passwordHash,
      dto.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    this.assertAccountCanLogin(account);

    const updatedAccount = await this.prisma.account.update({
      where: {
        id: account.id,
      },
      data: {
        lastLoginAt: new Date(),
      },
    });

    await this.startAuthenticatedSession(request, updatedAccount.id);

    return this.authMapper.toPublicAccount(updatedAccount);
  }

  async logout(session: SessionWithAccount): Promise<void> {
    await this.sessionService.destroy(session);
  }

  async me(session: SessionWithAccount): Promise<PublicAccount> {
    if (!session.accountId) {
      throw new UnauthorizedException('Authentication required');
    }

    const account = await this.prisma.account.findUnique({
      where: {
        id: session.accountId,
      },
    });

    if (!account) {
      throw new UnauthorizedException('Authentication required');
    }

    this.assertAccountCanLogin(account);

    return this.authMapper.toPublicAccount(account);
  }

  private assertAccountCanLogin(account: { isActive: boolean }) {
    if (!account?.isActive) {
      throw new ForbiddenException('Account is not active');
    }
  }

  private async startAuthenticatedSession(
    request: RequestWithSession,
    accountId: string,
  ) {
    const session = await this.sessionService.regenerate(request);
    session.accountId = accountId;
    await this.sessionService.save(session);
  }
}
