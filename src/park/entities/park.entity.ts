import { Column, Entity } from 'typeorm';

@ObjectType()
@Entity('Park')
export class Park {
  @Column({ type: 'varchar' })
  carParkNo: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'varchar' })
  xCoord: string;

  @Column({ type: 'varchar' })
  yCoord: string;

  @Column({ type: 'varchar' })
  carParkType: string;

  @Column({ type: 'varchar' })
  typeOfParkingSystem: string;

  @Column({ type: 'varchar' })
  shortTermParking: string;

  @Column({ type: 'varchar' })
  freeParking: string;

  @Column({ type: 'varchar' })
  nightParking: number;

  @Column({ type: 'int' })
  carParkDecks: number;

  @Column({ type: 'int' })
  gentryHeight: number;

  @Column({ type: 'varchar' })
  carParkBasement: string;
}
function ObjectType(): (target: typeof Park) => void | typeof Park {
  throw new Error('Function not implemented.');
}
