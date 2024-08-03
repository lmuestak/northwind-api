import { Column, Entity, ManyToMany, OneToMany } from "typeorm";
import { CustomerDemographic } from "./customer-demographic.model";
import { Order } from "./order.model";

@Entity("Customers")
export class Customer
{
    @Column("text", { primary: true, name: "CustomerID", unique: true, nullable: false })
    customerId!: string;

    @Column("text", { name: "CompanyName", nullable: false })
    companyName!: string;

    @Column("text", { name: "ContactName", nullable: false })
    contactName!: string;

    @Column("text", { name: "ContactTitle", nullable: false })
    contactTitle!: string;

    @Column("text", { name: "Address", nullable: true })
    address?: string | null;

    @Column("text", { name: "City", nullable: true })
    city?: string | null;

    @Column("text", { name: "Region", nullable: true })
    region?: string | null;

    @Column("text", { name: "PostalCode", nullable: true })
    postalCode?: string | null;

    @Column("text", { name: "Country", nullable: true })
    country?: string | null;

    @Column("text", { name: "Phone", nullable: true })
    phone?: string | null;

    @Column("text", { name: "Fax", nullable: true })
    fax?: string | null;

    @ManyToMany(() => CustomerDemographic, (customerDemographics) => customerDemographics.customers)
    customerDemographics!: CustomerDemographic[];

    @OneToMany(() => Order, (orders) => orders.customer)
    orders!: Order[];
}
