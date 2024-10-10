import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from './dto/create-episodes.dto';

@Controller('episodes')
export class EpisodesController {
  constructor(private episodesService: EpisodesService) {}

  @Get()
  findAll(@Query('sort') sort: 'asc' | 'desc' = 'desc') {
    return this.episodesService.findAll(sort);
  }

  @Get('featured')
  featuredEpisode() {
    return this.episodesService.findFeatured;
  }

  @Get(':id')
  async findOne(@Param() id: string) {
    const episode = await this.episodesService.findOne(id);
    if (!episode) {
      throw new NotFoundException('Episode not found');
    } else {
      return episode;
    }
  }

  @Post()
  createEpisodes(@Body() input: CreateEpisodeDto) {
    return this.episodesService.createEpisode(input);
  }

  @Put(':id')
  updateData(@Param() id: string, @Body() input: any) {
    return `Data updated with id: ${id} and body ${input}`;
  }

  @Delete(':id')
  deleteData(@Param() id: string) {
    return `Data deleted with id: ${id}`;
  }
}
