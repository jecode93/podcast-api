import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateEpisodeDto {
  @IsString()
  name: string;

  @IsBoolean()
  @IsOptional()
  featured?: boolean;
}

export class UpdateEpisodeDto {
  @IsString()
  name: string;

  @IsBoolean()
  @IsOptional()
  featured?: boolean;
}
