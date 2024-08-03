import "reflect-metadata";
import { DataSource as Ds } from "typeorm";
import { Employee } from "../models/employee.model";
import { Category } from "../models/category.model";
import { Product } from "../models/product.model";
import { Supplier } from '../models/supplier.model';
import { Order } from "../models/order.model";
import { OrderDetail } from "../models/order-detail.model";
import { Shipper } from "../models/shipper.model";
import { Customer } from "../models/customer.model";
import { Territory } from "../models/territory.model";
import { CustomerDemographic } from "../models/customer-demographic.model";
import { Region } from "../models/region.model";

export const DataSource = new Ds
(
    {
        type: "sqlite",
        database: __dirname + '/../databases/northwind.db',
        synchronize: true,
        logging: ["error"],
        entities: [Category, Product, Supplier, Order, Region, OrderDetail, Shipper, Customer, Territory, CustomerDemographic, Employee],
        migrations: [],
        subscribers: [],
    }
);
