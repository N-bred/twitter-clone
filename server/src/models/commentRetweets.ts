import { Column, PrimaryGeneratedColumn, ManyToOne, Entity } from 'typeorm';
import { User } from './users';
import { Threads } from './threads';

@Entity('CommentRetweets')
export class CommentRetweets {
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
    user => user.commentRetweets
  )
  user: User | undefined;

  @ManyToOne(
    type => Threads,
    thread => thread.commentRetweets
  )
  thread: Threads | undefined;

  // Relations

  /**
   * User
   * Thread
   */
}
