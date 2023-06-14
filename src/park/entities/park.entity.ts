import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Park')
export class Park {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  carParkNo: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'float' })
  xCoord: number;

  @Column({ type: 'float' })
  yCoord: number;

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
  gantryHeight: number;

  @Column({ type: 'varchar' })
  carParkBasement: string;

  @Column({ type: 'int', default: 0 })
  availableLots: number;

  @Column({ type: 'int', default: 0 })
  totalLots: number;
}
