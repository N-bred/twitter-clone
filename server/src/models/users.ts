import {
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  Entity
} from 'typeorm';
import { Post } from './posts';
import { UserPreferences } from './userPreferences';
import { Follows } from './follows';
import { Threads } from './threads';
import { ThreadComments } from './threadComments';
import { PostPics } from './postPics';
import { PostLikes } from './postLikes';
import { PostRetweets } from './postRetweets';
import { CommentPics } from './commentPics';
import { CommentLikes } from './commentLikes';
import { CommentRetweets } from './commentRetweets';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number | undefined;

  @Column({ type: 'varchar', length: 100 })
  name: string | undefined;

  @Column({ type: 'varchar', length: 50 })
  nickname: string | undefined;

  @Column({ type: 'int' })
  age: number | undefined;

  @Column({ type: 'varchar', select: false })
  email: string | undefined;

  @Column({ type: 'varchar' })
  photo: string | undefined;

  @Column({ type: 'text' })
  bio: string | undefined;

  @Column({ type: 'varchar' })
  status: string | undefined;

  @Column({ type: 'varchar', select: false })
  password: string | undefined;

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

  @OneToMany(
    type => Post,
    post => post.user,
    { cascade: ['remove'], onDelete: 'CASCADE' }
  )
  posts: Post[] | undefined;

  @OneToOne(
    type => UserPreferences,
    userPreferences => userPreferences.user,
    { cascade: ['remove'], onDelete: 'CASCADE' }
  )
  userPreferences: UserPreferences | undefined;

  @OneToMany(
    type => Follows,
    follows => follows.follower,
    { cascade: ['remove'], onDelete: 'CASCADE' }
  )
  followers: Follows[] | undefined;

  @OneToMany(
    type => Follows,
    follows => follows.followed,
    { cascade: ['remove'], onDelete: 'CASCADE' }
  )
  followed: Follows[] | undefined;

  @OneToMany(
    type => Threads,
    threads => threads.user,
    { cascade: ['remove'], onDelete: 'CASCADE' }
  )
  threads: Threads[] | undefined;

  @OneToMany(
    type => ThreadComments,
    threadComments => threadComments.user,
    { cascade: ['remove'], onDelete: 'CASCADE' }
  )
  commentThreads: ThreadComments[] | undefined;

  @OneToMany(
    type => PostPics,
    postPics => postPics.user,
    { cascade: ['remove'], onDelete: 'CASCADE' }
  )
  postPics: PostPics[] | undefined;

  @OneToMany(
    type => CommentPics,
    commentPics => commentPics.user,
    { cascade: ['remove'], onDelete: 'CASCADE' }
  )
  commentPics: CommentPics[] | undefined;

  @OneToMany(
    type => PostLikes,
    postLikes => postLikes.user,
    { cascade: ['remove'], onDelete: 'CASCADE' }
  )
  postLikes: PostLikes[] | undefined;

  @OneToMany(
    type => CommentLikes,
    commentLikes => commentLikes.user,
    { cascade: ['remove'], onDelete: 'CASCADE' }
  )
  commentLikes: CommentLikes[] | undefined;

  @OneToMany(
    type => PostRetweets,
    postRetweets => postRetweets.user,
    { cascade: ['remove'], onDelete: 'CASCADE' }
  )
  postRetweets: PostRetweets[] | undefined;

  @OneToMany(
    type => CommentRetweets,
    commentRetweets => commentRetweets.user,
    { cascade: ['remove'], onDelete: 'CASCADE' }
  )
  commentRetweets: CommentRetweets[] | undefined;

  // Relations

  /**
   * Posts
   * Comments
   * Follows
   * User Preferences
   * Likes
   * Retweets
   * Pics
   * Threads
   */
}
