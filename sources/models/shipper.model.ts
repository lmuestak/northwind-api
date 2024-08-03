import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.model";

@Entity("Shippers")
export class Shipper 
{
    @PrimaryGeneratedColumn({ type: "integer", name: "ShipperID" })
    shipperId!: number;

    @Column("text", { name: "CompanyName" })
    companyName!: string;

    @Column("text", { name: "Phone", nullable: true })
    phone?: string | null;

    @OneToMany(() => Order, (orders) => orders.shipVia)
    orders!: Order[];
}
