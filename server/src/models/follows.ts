import { Column, PrimaryGeneratedColumn, ManyToOne, Entity } from 'typeorm';
import { User } from './users';

@Entity('Follows')
export class Follows {
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
    user => user.userPreferences
  )
  follower: User | undefined;

  @ManyToOne(
    type => User,
    user => user.userPreferences
  )
  followed: User | undefined;

  // Relations

  /**
   * User
   */
}
