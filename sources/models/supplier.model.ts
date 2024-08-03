import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.model";

@Entity("Suppliers")
export class Supplier
{
    @PrimaryGeneratedColumn({ type: "integer", name: "SupplierID" })
    supplierId!: number;

    @Column("text", { name: "CompanyName", nullable: false})
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

    @Column("text", { name: "HomePage", nullable: true })
    homePage?: string | null;

    @OneToMany(() => Product, (products) => products.supplier)
    products!: Product[];
}
