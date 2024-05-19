import { PartialType } from '@nestjs/swagger';
import { CreateLandslideReportDto } from './create-landslide-report.dto';

export class UpdateLandslideReportDto extends PartialType(CreateLandslideReportDto) {}
