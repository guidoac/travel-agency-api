import { Global, Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersModule } from './app/users/users.module';
import { AuthModule } from './auth/auth.module';
import { ToursModule } from './app/tours/tours.module';
import { CountriesModule } from './app/countries/countries.module';
import { MulterModule } from '@nestjs/platform-express';
import { ImagesModule } from './app/images/images.module';
import { CompaniesModule } from './app/companies/companies.module';
import { AddressModule } from './app/address/address.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.dev',
    }),
    TypeOrmModule.forRoot(<TypeOrmModuleOptions>{
      type: process.env.DB_TYPE,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: true,
      autoLoadEntities: true,
    }),
    MulterModule.register({
      dest: `./${process.env.STATIC_DEFAULT_PATH}`,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', process.env.STATIC_DEFAULT_PATH),
    }),
    UsersModule,
    AuthModule,
    ToursModule,
    CountriesModule,
    ImagesModule,
    CompaniesModule,
    AddressModule,
  ],
  exports: [MulterModule],
})
export class AppModule {}
