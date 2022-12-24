import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PolyclinicModule } from './polyclinic/polyclinic.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [
    PolyclinicModule,
    MikroOrmModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
