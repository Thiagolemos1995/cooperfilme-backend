import { BaseEntity } from '../../common/entities';
import { Entity, Column, OneToMany } from 'typeorm';
import { EScriptState } from '../enums';
import { ScriptState } from './script-state.entity';

@Entity()
export class Script extends BaseEntity {
  @Column()
  email: string;

  @Column()
  title: string;

  @Column()
  genre: string;

  @Column()
  author: string;

  @Column('text')
  content: string;

  @Column({ default: 0 })
  votes: number;

  @Column({
    type: 'enum',
    enum: EScriptState,
    default: EScriptState.AWAITING_ANALYSIS,
  })
  status: EScriptState;

  @Column({ type: 'text', nullable: true })
  message: string;

  @OneToMany(() => ScriptState, (state) => state.script)
  states: ScriptState[];

  constructor(data: Partial<Script>) {
    super();
    Object.assign(this, data);
  }
}
