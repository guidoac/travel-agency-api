import { Global, Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ToursModule } from './modules/tours/tours.module';
import { CountriesModule } from './modules/countries/countries.module';
import { MulterModule } from '@nestjs/platform-express';
import { ImagesModule } from './modules/images/images.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { AddressModule } from './modules/address/address.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CommonModule } from './modules/common/common.module';

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
      dest: `./${process.env.STATIC_FILES_PATH}`,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', process.env.STATIC_FILES_PATH),
      serveRoot: '/uploads/',
    }),
    UsersModule,
    AuthModule,
    ToursModule,
    CountriesModule,
    ImagesModule,
    CompaniesModule,
    AddressModule,
    CommonModule,
  ],
  exports: [MulterModule],
})
export class AppModule {}
