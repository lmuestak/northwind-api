import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetail } from "./order-detail.model";
import { Category } from "./category.model";
import { Supplier } from "./supplier.model";

@Entity('Products')
export class Product
{
    @PrimaryGeneratedColumn({ type: 'integer', name: 'ProductID' })
    productId!: number;

    @Column('text', { name: 'ProductName' })
    productName!: string;

    @Column('text', { name: 'QuantityPerUnit', nullable: true })
    quantityPerUnit!: string | null;

    @Column('numeric', { name: 'UnitPrice', nullable: true, default: () => 0 })
    unitPrice!: number | null;

    @Column('integer', { name: 'UnitsInStock', nullable: true, default: () => 0 })
    unitsInStock!: number | null;

    @Column('integer', { name: 'UnitsOnOrder', nullable: true, default: () => 0 })
    unitsOnOrder!: number | null;

    @Column('integer', { name: 'ReorderLevel', nullable: true, default: () => 0 })
    reorderLevel!: number | null;

    @Column('text', { name: 'Discontinued', default: () => "'0'" })
    discontinued!: string;

    @OneToMany(() => OrderDetail, (orderDetails) => orderDetails.product)
    orderDetails!: OrderDetail[];

    @ManyToOne(() => Supplier, (suppliers) => suppliers.products)
    @JoinColumn([{ name: 'SupplierID', referencedColumnName: 'supplierId' }])
    supplier!: Supplier;

    @ManyToOne(() => Category, (categories) => categories.products)
    @JoinColumn([{ name: 'CategoryID', referencedColumnName: 'categoryId' }])
    category?: Category;
}