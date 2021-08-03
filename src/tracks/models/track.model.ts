import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Comment } from './comment.model';

export type TrackDocument = Track & Document;

@Schema()
export class Track extends Document {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  artist: string;

  @Prop({ type: String })
  text: string;

  @Prop({ type: String })
  listens: number;

  @Prop({ type: String })
  audio: string;

  @Prop({ type: String })
  picture: string;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Comment' }],
  })
  comments: Comment[];
}

export const TrackSchema = SchemaFactory.createForClass(Track);
