import { Column, PrimaryGeneratedColumn, ManyToOne, Entity } from 'typeorm';
import { User } from './users';
import { Threads } from './threads';

@Entity('CommentRetweets')
export class CommentRetweets {
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
