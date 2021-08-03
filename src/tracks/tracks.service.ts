import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Track, TrackDocument } from './models/track.model';
import { Comment, CommentDocument } from './models/comment.model';
import { CreateTrackDto } from './dto/CreateTrackDto.dto';
import { AddCommentDto } from './dto/AddCommentDto.dts';
import { FilesService, FILE_TYPE } from 'src/files/files.service';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private filesService: FilesService,
  ) {}

  async create(dto: CreateTrackDto, picture: any, audio: any): Promise<Track> {
    const audioPath = this.filesService.createFile(FILE_TYPE.AUDIO, audio);
    const picturePath = this.filesService.createFile(FILE_TYPE.IMAGE, picture);

    const track = await this.trackModel.create({
      ...dto,
      listens: 0,
      picture: picturePath,
      audio: audioPath,
    });
    return track;
  }

  async getAll(): Promise<Track[]> {
    const tracks = await this.trackModel.find();
    return tracks;
  }

  async getOne(id: ObjectId): Promise<Track> {
    const track = await this.trackModel.findById(id).populate('comments');
    return track;
  }

  async delete(id: ObjectId): Promise<ObjectId> {
    const track = await this.trackModel.findByIdAndDelete(id);
    return track._id;
  }

  async addComment(dto: AddCommentDto): Promise<Comment> {
    const track = await this.trackModel.findById(dto.trackId);
    const comment = await this.commentModel.create({ ...dto });
    track.comments.push(comment._id);
    await track.save();
    return comment;
  }
}
