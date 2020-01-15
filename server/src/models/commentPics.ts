import { Column, PrimaryGeneratedColumn, ManyToOne, Entity } from 'typeorm';
import { User } from './users';
import { Threads } from './threads';

@Entity('CommentPics')
export class CommentPics {
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
    user => user.commentPics
  )
  user: User | undefined;

  @ManyToOne(
    type => Threads,
    thread => thread.commentPics
  )
  thread: Threads | undefined;

  // Relations

  /**
   * User
   * Thread
   */
}
