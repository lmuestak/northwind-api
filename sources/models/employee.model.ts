import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"
import { Territory } from "./territory.model";
import { Order } from "./order.model";

@Entity("Employees")
export class Employee
{
    @PrimaryGeneratedColumn( { type: 'integer', name: 'EmployeeID' })
    employeeId!: Number;

    @Column("text", { name: "LastName", nullable: false })
    lastName!: string;

    @Column("text", { name: "FirstName", nullable: false })
    firstName!: string;

    @Column({ type: 'text', name: 'Title', nullable: false})
    title!: string;

    @Column({ type: 'text', name: 'TitleOfCourtesy', nullable: true })
    titleOfCourtesy!: string | null;

    @Column({ type: 'text', name: 'Address', nullable: true })
    address!: string | null;

    @Column({ type: 'text', name: 'City', nullable: true })
    city!: string | null;

    @Column({ type: 'text', name: 'Region', nullable: true })
    region!: string | null;

    @Column({ type: 'text', name: 'PostalCode', nullable: true })
    zipCode!: string | null;

    @Column({ type: 'text', name: 'Country', nullable: true })
    country!: string | null;

    @Column({ type: 'text', name: 'HomePhone', nullable: true })
    phone?: string | null;

    @Column({ type: 'text', name: 'Extension', nullable: true })
    extension?: string | null;

    @Column({ type: 'date', name: 'BirthDate', nullable: false })
    birthDate!:  Date;

    @Column({ type: 'date', name: 'HireDate', nullable: true })
    hireDate?: Date | null;

    @Column({ type: 'text', name: 'Email', nullable: true  })
    email?: string | null = null;

    @Column({ type: 'text', name: 'Password', nullable: true, select: false })
    password?: string | null = null;

    @Column({ type: 'text', name: 'PasswordSalt', nullable: true, select: false  })
    passwordSalt?: string | null = null;

    @Column({ type: 'text', name: 'RefreshToken', nullable: true, select: false })
    refreshToken?: string | null = null;

    @Column({ type: 'text', name: 'Notes', nullable: true  })
    notes?: string | null = null;

    @Column({ type: 'text', name: 'Status', nullable: false })
    status!: string;

    @ManyToOne(() => Employee, (employees) => employees.employees)
    @JoinColumn([{ name: "ReportsTo", referencedColumnName: "employeeId" }])
    reportsTo?: Employee;

    @OneToMany(() => Employee, (employees) => employees.reportsTo)
    employees!: Employee[];

    @ManyToMany(() => Territory, (territories) => territories.employees)
    territories!: Territory[];

    @OneToMany(() => Order, (orders) => orders.employee)
    orders!: Order[];
    
};