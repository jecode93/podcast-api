import { Injectable, NotFoundException } from '@nestjs/common';
import { Episode } from './entity/episode.entity';
import { CreateEpisodeDto } from './dto/create-episodes.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class EpisodesService {
  private episodes: Episode[] = [];

  async findAll(sort: 'asc' | 'desc' = 'asc') {
    const sortAsc = (a: Episode, b: Episode) => (a.name > b.name ? 1 : -1);
    const sortDesc = (a: Episode, b: Episode) => (a.name < b.name ? 1 : -1);

    return sort === 'asc'
      ? this.episodes.sort(sortAsc)
      : this.episodes.sort(sortDesc);
  }

  async findFeatured() {
    return this.episodes.filter((episode) => episode.featured);
  }

  async findOne(id: string) {
    return this.episodes.find((episode) => episode.id === id);
  }

  async createEpisode(createEpisodeDto: CreateEpisodeDto) {
    const newEpisode = { ...createEpisodeDto, id: randomUUID() };
    this.episodes.push(newEpisode);

    return newEpisode;
  }

  async update(id: string, updateData: CreateEpisodeDto) {
    const episode = this.episodes.find((episode) => episode.id === id);

    if (!episode) {
      throw new NotFoundException(`Episode with ID ${id} not found`);
    }

    // Update the episode fields with the provided data
    Object.assign(episode, updateData);

    return episode; // Return the updated episode
  }

  async delete(id: string) {
    const episode = this.episodes.find((episode) => episode.id === id);

    if (!episode) {
      throw new NotFoundException(`Episode with ID ${id} not found`);
    }

    this.episodes = this.episodes.filter((episode) => episode.id !== id); // Remove the episode

    return { message: `Episode with ID ${id} deleted successfully` };
  }
}
