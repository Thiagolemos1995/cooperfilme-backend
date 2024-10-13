import { BaseEntity } from '../../common/entities';
import { Entity, Column, OneToMany } from 'typeorm';
import { EScriptState } from '../enums';
import { ScriptState } from './script-state.entity';

@Entity()
export class Script extends BaseEntity {
  @Column()
  title: string;

  @Column()
  genre: string;

  @Column()
  author: string;

  @Column('text')
  content: string;

  @Column({
    type: 'enum',
    enum: EScriptState,
    default: EScriptState.AWAITING_ANALYSIS,
  })
  status: EScriptState;

  @OneToMany(() => ScriptState, (state) => state.script)
  states: ScriptState[];

  constructor(data: Partial<Script>) {
    super();
    Object.assign(this, data);
  }
}
