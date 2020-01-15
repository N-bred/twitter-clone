import {
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  Entity,
  JoinColumn
} from 'typeorm';
import { User } from './users';

@Entity('UserPreferences')
export class UserPreferences {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number | undefined;

  @Column({ type: 'varchar', length: 9 })
  color: string | undefined;

  @Column({ type: 'varchar', length: 20 })
  theme: string | undefined;

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

  @OneToOne(
    type => User,
    user => user.userPreferences
  )
  @JoinColumn()
  user: User | undefined;

  // Relations

  /**
   * User
   */
}
