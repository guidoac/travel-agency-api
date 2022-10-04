import { Global, Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersModule } from './app/users/users.module';
import { AuthModule } from './auth/auth.module';
import { ToursModule } from './app/tours/tours.module';
import { CountriesModule } from './app/countries/countries.module';
import { MulterModule } from '@nestjs/platform-express';
import { ImagesModule } from './app/images/images.module';

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
      dest: './upload',
    }),
    UsersModule,
    AuthModule,
    ToursModule,
    CountriesModule,
    ImagesModule,
  ],
  exports: [MulterModule],
})
export class AppModule {}
