import {
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Entity
} from 'typeorm';
import { User } from './users';
import { Post } from './posts';
import { ThreadComments } from './threadComments';
import { CommentPics } from './commentPics';
import { CommentLikes } from './commentLikes';
import { CommentRetweets } from './commentRetweets';

@Entity('Threads')
export class Threads {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number | undefined;

  @Column({ type: 'text', length: 500 })
  content: string | undefined;

  @Column({
    type: 'datetime',
    default: () => "datetime('now', 'localtime')"
  })
  createdAt: string | undefined;

  @Column({
    type: 'datetime',
    default: () => "datetime('now', 'localtime')",
    onUpdate: "datetime('now', 'localtime')"
  })
  updatedAt: string | undefined;

  @ManyToOne(
    type => User,
    user => user.threads
  )
  user: User | undefined;

  @ManyToOne(
    type => Post,
    post => post.threads
  )
  post: Post | undefined;

  @OneToMany(
    type => ThreadComments,
    threadComments => threadComments.threads,
    { cascade: ['remove'], onDelete: 'CASCADE' }
  )
  commentThreads: ThreadComments[] | undefined;

  @OneToMany(
    type => CommentPics,
    commentPics => commentPics.thread,
    { cascade: ['remove'], onDelete: 'CASCADE' }
  )
  commentPics: CommentPics[] | undefined;

  @OneToMany(
    type => CommentLikes,
    commentLikes => commentLikes.thread,
    { cascade: ['remove'], onDelete: 'CASCADE' }
  )
  commentLikes: CommentLikes[] | undefined;

  @OneToMany(
    type => CommentRetweets,
    commentRetweets => commentRetweets.thread,
    { cascade: ['remove'], onDelete: 'CASCADE' }
  )
  commentRetweets: CommentRetweets[] | undefined;

  // Relations

  /**
   * User
   * Post
   * ThreadComments
   */
}
