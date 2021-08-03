import { Module } from '@nestjs/common';
import { TrackController } from './tracks.controller';
import { TrackService } from './tracks.service';
import { MongooseModule } from '@nestjs/mongoose';

import { Track, TrackSchema } from './models/track.model';
import { Comment, CommentSchema } from './models/comment.model';
import { FilesService } from 'src/files/files.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Track.name, schema: TrackSchema },
      { name: Comment.name, schema: CommentSchema },
    ]),
  ],
  controllers: [TrackController],
  providers: [TrackService, FilesService],
})
export class TrackModule {}
