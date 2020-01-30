import { Column, PrimaryGeneratedColumn, ManyToOne, Entity } from 'typeorm';
import { User } from './users';

@Entity('Follows')
export class Follows {
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
    user => user.userPreferences
  )
  follower: User | number | undefined;

  @ManyToOne(
    type => User,
    user => user.userPreferences
  )
  followed: User | number | undefined;

  // Relations

  /**
   * User
   */
}
