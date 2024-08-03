import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Product } from "./product.model";
import { Order } from "./order.model";

@Entity("Order Details")
export class OrderDetail
{
    @Column("integer", { primary: true, name: "OrderID" })
    orderId!: number;

    @Column("integer", { primary: true, name: "ProductID" })
    productId!: number;

    @Column("numeric", { name: "UnitPrice", default: () => "0" })
    unitPrice!: number;

    @Column("integer", { name: "Quantity", default: () => "1" })
    quantity!: number;

    @Column("real", { name: "Discount", default: () => "0" })
    discount!: number;

    @ManyToOne(() => Product, (products) => products.orderDetails)
    @JoinColumn([{ name: "ProductID", referencedColumnName: "productId" }])
    product!: Product;

    @ManyToOne(() => Order, (orders) => orders.orderDetails)
    @JoinColumn([{ name: "OrderID", referencedColumnName: "orderId" }])
    order!: Order;
}
