import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AxiosAdapter } from './adapters/axios.adapter';

@Module({
  providers: [AxiosAdapter],
  imports: [HttpModule],
  exports: [AxiosAdapter],
})
export class CommonModule {}
