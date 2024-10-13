import { Entity, ManyToOne, JoinColumn, Column } from 'typeorm';
import { BaseEntity } from '../../common/entities';
import { Script } from './script.entity';
import { EScriptState } from '../enums';

@Entity()
export class ScriptState extends BaseEntity {
  @ManyToOne(() => Script, (script) => script.states)
  @JoinColumn({ name: 'script_id' })
  script: Script;

  @Column({
    type: 'enum',
    enum: EScriptState,
    default: EScriptState.AWAITING_ANALYSIS,
  })
  state: EScriptState;

  constructor(data: Partial<ScriptState>) {
    super();
    Object.assign(this, data);
  }
}
