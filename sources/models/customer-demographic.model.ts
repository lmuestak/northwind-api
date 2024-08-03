import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { Customer } from "./customer.model";

@Entity("CustomerDemographics")
export class CustomerDemographic 
{
    @Column("text", { primary: true, name: "CustomerTypeID", unique: true })
    customerTypeId!: string;

    @Column("text", { name: "CustomerDesc", nullable: true })
    customerDesc?: string | null;

    @ManyToMany(() => Customer, (customers) => customers.customerDemographics)
    @JoinTable(
    {
        name: "CustomerCustomerDemo",
        joinColumns: 
        [
            { 
                name: "CustomerTypeID", 
                referencedColumnName: "customerTypeId" 
            },
        ],
        inverseJoinColumns: 
        [
            { 
                name: "CustomerID", 
                referencedColumnName: "customerId" 
            },
        ],
    })
    customers!: Customer[];
}