import { Column, PrimaryGeneratedColumn, ManyToOne, Entity } from 'typeorm';
import { User } from './users';
import { Threads } from './threads';

@Entity('CommentLikes')
export class CommentLikes {
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
    user => user.commentLikes
  )
  user: User | undefined;

  @ManyToOne(
    type => Threads,
    thread => thread.commentLikes
  )
  thread: Threads | undefined;

  // Relations

  /**
   * User
   * Thread
   */
}
