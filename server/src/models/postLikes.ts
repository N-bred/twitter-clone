import { Column, PrimaryGeneratedColumn, ManyToOne, Entity } from 'typeorm';
import { User } from './users';
import { Post } from './posts';

@Entity('PostLikes')
export class PostLikes {
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
