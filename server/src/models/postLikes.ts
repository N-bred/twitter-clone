import { Column, PrimaryGeneratedColumn, ManyToOne, Entity } from 'typeorm';
import { User } from './users';
import { Post } from './posts';

@Entity('PostLikes')
export class PostLikes {
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
    user => user.postLikes
  )
  user: User | undefined;

  @ManyToOne(
    type => Post,
    post => post.postLikes
  )
  post: Post | undefined;

  // Relations

  /**
   * User
   * Post
   */
}
