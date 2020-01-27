import { Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, Entity } from 'typeorm';
import { User } from './users';
import { Threads } from './threads';
import { PostPics } from './postPics';
import { PostLikes } from './postLikes';
import { PostRetweets } from './postRetweets';

@Entity('Post')
export class Post {
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
    user => user.posts
  )
  user: User | undefined;

  @OneToMany(
    type => Threads,
    threads => threads.post,
    { cascade: ['remove'], onDelete: 'CASCADE' }
  )
  threads: Threads[] | undefined;

  @OneToMany(
    type => PostPics,
    postPics => postPics.post,
    { cascade: ['remove'], onDelete: 'CASCADE' }
  )
  postPics: PostPics[] | undefined;

  @OneToMany(
    type => PostLikes,
    postLikes => postLikes.post,
    { cascade: ['remove'], onDelete: 'CASCADE' }
  )
  postLikes: PostLikes[] | undefined;

  @OneToMany(
    type => PostRetweets,
    postRetweets => postRetweets.post,
    { cascade: ['remove'], onDelete: 'CASCADE' }
  )
  postRetweets: PostRetweets[] | undefined;

  // Relations

  /**
   * User
   * post_likes
   * post_retweets
   * post_pics
   * threads
   */
}
