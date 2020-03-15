import { Column, PrimaryGeneratedColumn, ManyToOne, Entity } from 'typeorm';
import { User } from './users';
import { Threads } from './threads';

@Entity('CommentLikes')
export class CommentLikes {
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
