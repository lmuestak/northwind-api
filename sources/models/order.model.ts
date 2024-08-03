import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetail } from "./order-detail.model";
import { Customer } from "./customer.model";
import { Employee } from "./employee.model";
import { Shipper } from "./shipper.model";

@Entity('Orders')
export class Order
{
    @PrimaryGeneratedColumn({ type: 'integer', name: 'OrderID' })
    orderId!: number;

    @Column('datetime', { name: 'OrderDate', nullable: false })
    orderDate!: Date;

    @Column('datetime', { name: 'RequiredDate', nullable: true })
    requiredDate?: Date | null;

    @Column('datetime', { name: 'ShippedDate', nullable: true })
    shippedDate?: Date | null;

    @Column('numeric', { name: 'Freight', nullable: true, default: () => 0 })
    freight!: number | null;

    @Column('text', { name: 'ShipName', nullable: true })
    shipName?: string | null;

    @Column('text', { name: 'ShipAddress', nullable: true })
    shipAddress?: string | null;

    @Column('text', { name: 'ShipCity', nullable: true })
    shipCity?: string | null;

    @Column('text', { name: 'ShipRegion', nullable: true })
    shipRegion?: string | null;

    @Column('text', { name: 'ShipPostalCode', nullable: true })
    shipPostalCode?: string | null;

    @Column('text', { name: 'ShipCountry', nullable: true })
    shipCountry?: string | null;

    @OneToMany(() => OrderDetail, (orderDetails) => orderDetails.order)
    orderDetails!: OrderDetail[];

    @ManyToOne(() => Shipper, (shippers) => shippers.orders)
    @JoinColumn([{ name: 'ShipVia', referencedColumnName: 'shipperId' }])
    shipVia!: Shipper;

    @ManyToOne(() => Customer, (customers) => customers.orders)
    @JoinColumn([{ name: 'CustomerID', referencedColumnName: 'customerId' }])
    customer!: Customer;

    @ManyToOne(() => Employee, (employees) => employees.orders)
    @JoinColumn([{ name: 'EmployeeID', referencedColumnName: 'employeeId' }])
    employee!: Employee;
}
