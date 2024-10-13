import { Column, Entity } from 'typeorm';
import { ERole } from '../enums';
import { BaseEntity } from '../../common/entities';

@Entity()
export class Users extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'enum', enum: ERole, default: ERole.ANALYST })
  role: ERole;

  constructor(data: Partial<Users>) {
    super();
    Object.assign(this, data);
  }
}
