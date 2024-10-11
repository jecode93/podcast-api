import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto, UpdateEpisodeDto } from './dto/create-episodes.dto';
import { Episode } from './entity/episode.entity';

@Controller('episodes')
export class EpisodesController {
  constructor(private episodesService: EpisodesService) {}

  @Get()
  findAll(@Query('sort') sort: 'asc' | 'desc' = 'desc') {
    return this.episodesService.findAll(sort);
  }

  @Get('featured')
  featuredEpisode() {
    return this.episodesService.findFeatured();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Episode> {
    const episode = await this.episodesService.findOne(id);
    if (!episode) {
      throw new NotFoundException(`Episode with id ${id} not found`);
    }
    return episode;
  }

  @Post()
  createEpisodes(@Body(ValidationPipe) input: CreateEpisodeDto) {
    return this.episodesService.createEpisode(input);
  }

  @Patch(':id')
  updateEpisode(
    @Param('id') id: string,
    @Body(ValidationPipe) updateData: UpdateEpisodeDto,
  ) {
    return this.episodesService.update(id, updateData);
  }

  @Delete(':id')
  deleteEpisode(@Param('id') id: string) {
    return this.episodesService.delete(id);
  }
}
