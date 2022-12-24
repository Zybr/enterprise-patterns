import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import Doctor from "./entities/doctor.entity";

@Controller('doctor')
export class DoctorController {
  constructor(
    private readonly doctorService: DoctorService
  ) {
  }

  @Post()
  public create(@Body() createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    return this.doctorService.create(createDoctorDto);
  }

  @Get()
  public findAll(): Promise<Doctor[]> {
    return this.doctorService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: number): Promise<Doctor | null> {
    return this.doctorService.findOne(id);
  }

  @Put(':id')
  public update(@Param('id') id: number, @Body() updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {
    return this.doctorService.update(id, updateDoctorDto);
  }

  @Delete(':id')
  public remove(@Param('id') id: number): Promise<void> {
    return this.doctorService.remove(id);
  }
}
