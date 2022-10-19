import { Company } from 'src/app/companies/company.entity';
import { User } from 'src/app/users/user.entity';

export type Auth = {
  company: Company;

  user: User;
};
