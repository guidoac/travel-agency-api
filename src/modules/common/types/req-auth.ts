import { Company } from 'src/modules/companies/company.entity';
import { User } from 'src/modules/users/user.entity';

export type Auth = {
  company: Company;

  user: User;
};
