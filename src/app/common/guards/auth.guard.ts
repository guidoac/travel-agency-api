import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { CompaniesService } from 'src/app/companies/companies.service';

@Injectable()
export class TheAuthGuard extends AuthGuard('jwt') {}
