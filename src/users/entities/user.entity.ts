import { BaseEntity } from 'src/common';
import { Column } from 'typeorm';
import { ERole } from '../enums';

export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'enum', enum: ERole, default: ERole.ANALYST })
  role: ERole;
}
