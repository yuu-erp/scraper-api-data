import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ScraperDto {
  @ApiProperty({ example: 'abc' })
  @IsNotEmpty()
  sourceId: string;
}
