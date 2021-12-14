import { PartialType } from '@nestjs/swagger';
import { CreateDataScrappingDto } from './create-data-scrapping.dto';

export class UpdateDataScrappingDto extends PartialType(CreateDataScrappingDto) {}
