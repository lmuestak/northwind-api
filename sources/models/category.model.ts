import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.model";

@Entity("Categories")
export class Category
{
    @PrimaryGeneratedColumn({ type: "integer", name: "CategoryID" })
    categoryId!: number;

    @Column("text", { name: "CategoryName", nullable: false })
    categoryName!: string;

    @Column("text", { name: "Description", nullable: true })
    description!: string | null;

    @Column("blob", { name: "Picture", nullable: true, select: false })
    picture!: Buffer | null;

    @OneToMany(() => Product, (products) => products.category)
    products!: Product[];
}
