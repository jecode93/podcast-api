import { Module } from '@nestjs/common';
import { EpisodesModule } from './episodes/episodes.module';
import { TopicsModule } from './topics/topics.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Episode } from './episodes/entity/episode.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // Change to 'mysql' if you're using MySQL
      host: 'localhost', // Your database host
      port: 5432, // Default PostgreSQL port
      username: '', // Replace with your database username
      password: '', // Replace with your database password
      database: 'podcast', // Replace with your database name
      entities: [Episode], // Path to your entities
      synchronize: true, // Set to false in production
    }),
    EpisodesModule,
    TopicsModule,
  ],
})
export class AppModule {}
