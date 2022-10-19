import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CompaniesService } from 'src/app/companies/companies.service';

@Injectable()
export class TheCompanyGuard implements CanActivate {
  constructor(private companiesService: CompaniesService) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const req = context.switchToHttp().getRequest();

    const {
      user,
      params: { companyAlias },
    } = req;

    const company = await this.companiesService.getCompanyByAlias(
      companyAlias,
      user,
    );

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    req.company = company;

    return true;
  }
}
