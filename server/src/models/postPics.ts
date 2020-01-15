import { Column, PrimaryGeneratedColumn, ManyToOne, Entity } from 'typeorm';
import { User } from './users';
import { Post } from './posts';

@Entity('PostPics')
export class PostPics {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number | undefined;

  @Column({ type: 'varchar' })
  picUrl: string | undefined;

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
    user => user.postPics
  )
  user: User | undefined;

  @ManyToOne(
    type => Post,
    post => post.postPics
  )
  post: Post | undefined;

  // Relations

  /**
   * User
   * Post
   */
}
