import { Global, Module } from '@nestjs/common';
import { CommonService } from './providers/common.service';
import { CommonController } from './controllers/common.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  providers: [CommonService, ConfigService],
  controllers: [CommonController],
})
export class CommonModule {}
