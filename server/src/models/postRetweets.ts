import { Column, PrimaryGeneratedColumn, ManyToOne, Entity } from 'typeorm';
import { User } from './users';
import { Post } from './posts';

@Entity('PostRetweets')
export class PostRetweets {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number | undefined;

  @Column({
    type: 'datetime',
    default: () => "date('now')"
  })
  createdAt: string | undefined;

  @Column({
    type: 'datetime',
    default: () => "date('now')",
    onUpdate: "date('now')"
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
