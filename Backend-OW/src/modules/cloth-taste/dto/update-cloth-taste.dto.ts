import { PartialType } from '@nestjs/swagger';
import { CreateClothTasteDto } from './create-cloth-taste.dto';

export class UpdateClothTasteDto extends PartialType(CreateClothTasteDto) {}
