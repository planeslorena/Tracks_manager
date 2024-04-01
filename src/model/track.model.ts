import { ApiProperty } from "@nestjs/swagger";

class Track {
  @ApiProperty({
    example: 1,
    required: false
  })
  id?: number;
  @ApiProperty({
    example: 'Verte reir',
    required: true
  })
  title: string;
  @ApiProperty({
    example: 2.5,
    required: true
  })
  duration: number;
  @ApiProperty({
    example: 'No te va a gustar',
    required: true
  })
  artist: string;
}

export default Track;