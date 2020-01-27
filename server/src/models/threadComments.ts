import { Column, PrimaryGeneratedColumn, ManyToOne, Entity } from 'typeorm';
import { User } from './users';
import { Threads } from './threads';

@Entity('ThreadComments')
export class ThreadComments {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number | undefined;

  @Column({ type: 'text', length: 500 })
  content: string | undefined;

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
    user => user.commentThreads
  )
  user: User | undefined;

  @ManyToOne(
    type => Threads,
    threads => threads.commentThreads
  )
  threads: Threads | undefined;

  // Relations

  /**
   * User
   * Threads
   */
}
