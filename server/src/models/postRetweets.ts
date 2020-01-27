import { Column, PrimaryGeneratedColumn, ManyToOne, Entity } from 'typeorm';
import { User } from './users';
import { Post } from './posts';

@Entity('PostRetweets')
export class PostRetweets {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number | undefined;

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
    user => user.postRetweets
  )
  user: User | undefined;

  @ManyToOne(
    type => Post,
    post => post.postRetweets
  )
  post: Post | undefined;

  // Relations

  /**
   * User
   * Post
   */
}
