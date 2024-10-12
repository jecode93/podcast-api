import { Injectable, NotFoundException } from '@nestjs/common';
import { Episode } from './entity/episode.entity';
import { CreateEpisodeDto, UpdateEpisodeDto } from './dto/create-episodes.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EpisodesService {
  constructor(
    @InjectRepository(Episode)
    private readonly episodesRepository: Repository<Episode>,
  ) {}

  findAll(): Promise<Episode[]> {
    return this.episodesRepository.find();
  }

  async findFeatured(): Promise<Episode[]> {
    return this.episodesRepository.findBy({ featured: true });
  }

  async findOne(id: string): Promise<Episode> {
    return this.episodesRepository.findOneBy({ id: id });
  }

  async createEpisode(createEpisodeDto: CreateEpisodeDto): Promise<Episode> {
    const newEpisode = this.episodesRepository.create(createEpisodeDto);
    await this.episodesRepository.save(newEpisode);

    return newEpisode;
  }

  async update(id: string, updateData: UpdateEpisodeDto) {
    const result = await this.episodesRepository.update(id, updateData); // Perform the update

    // Check if any rows were affected (i.e., updated)
    if (result.affected === 0) {
      throw new NotFoundException(`Episode with ID ${id} not found`);
    }

    // Fetch and return the updated episode
    return this.episodesRepository.findOne({ where: { id } });
  }

  async delete(id: string) {
    const episode = await this.episodesRepository.findOneBy({ id: id });

    if (!episode) {
      throw new NotFoundException(`Episode with ID ${id} not found`);
    }

    return this.episodesRepository.remove(episode); // Remove the episode
  }
}
