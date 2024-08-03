import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { Employee } from "./employee.model";
import { Region } from "./region.model";

@Entity("Territories")
export class Territory 
{
    @Column("text", { primary: true, name: "TerritoryID", unique: true })
    territoryId!: string;

    @Column("text", { name: "TerritoryDescription" })
    territoryDescription!: string;

    @ManyToMany(() => Employee, (employees) => employees.territories)
    @JoinTable(
    {
        name: "EmployeeTerritories",
        joinColumns: 
        [
            { 
                name: "TerritoryID", 
                referencedColumnName: "territoryId" 
            }
        ],
        inverseJoinColumns: 
        [
            { 
                name: "EmployeeID", 
                referencedColumnName: "employeeId" 
            },
        ],
    })
    employees?: Employee[];

    @ManyToOne(() => Region, (regions) => regions.territories)
    @JoinColumn(
        [
            { 
                name: "RegionID", 
                referencedColumnName: "regionId"
            }
        ])
    region?: Region;
}