import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller('episodes')
export class EpisodesController {
  @Get()
  findAll() {
    return 'All Episodes';
  }

  @Get('featured')
  featuredEpisode(@Query('sort') sort: 'asc' | 'desc' = 'desc') {
    return 'Feature episodes ' + sort;
  }

  @Get(':id')
  findOne(@Param() id: string) {
    return 'One episode ' + id;
  }

  @Post()
  createEpisodes(@Body() input: any) {
    return `Episode created ${input}`;
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
