import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Track } from './track.model';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment extends Document {
  @Prop({ type: String })
  username: string;

  @Prop({ type: String })
  text: string;

  @Prop({
    type: { type: MongooseSchema.Types.ObjectId, ref: 'Track' },
  })
  track: Track;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
