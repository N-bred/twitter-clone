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
    default: () => "datetime('now', 'localtime')"
  })
  createdAt: string | undefined;

  @Column({
    type: 'datetime',
    default: () => "datetime('now', 'localtime')",
    onUpdate: "datetime('now', 'localtime')"
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
