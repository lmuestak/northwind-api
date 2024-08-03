import { Column, Entity, OneToMany } from "typeorm";
import { Territory } from "./territory.model";

@Entity("Regions")
export class Region 
{
    @Column("integer", { primary: true, name: "RegionID" })
    regionId!: number;

    @Column("text", { name: "RegionDescription" })
    regionDescription!: string;

    @OneToMany(() => Territory, (territories) => territories.region)
    territories?: Territory[];
}
