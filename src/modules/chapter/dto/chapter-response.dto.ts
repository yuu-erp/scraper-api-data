import { ApiProperty } from '@nestjs/swagger';

export class ChapterResponseDto {
  @ApiProperty({ example: 1, description: 'Unique identifier for the chapter' })
  id: string;

  @ApiProperty({
    example: 'nguyen-ton-netttruyen',
    description: 'Source identifier of the chapter',
  })
  sourceId: string;

  @ApiProperty({
    example: 'nguyen-ton',
    description: 'Media identifier associated with the source',
  })
  sourceMediaId: string;

  @ApiProperty({
    example: 'netttruyen',
    description: 'Connection identifier for the source',
  })
  sourceConnectionId: string;

  @ApiProperty({
    example: null,
    description: 'Anilist ID if available, otherwise null',
  })
  anilistId: number | null;
}
