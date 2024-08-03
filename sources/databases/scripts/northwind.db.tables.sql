BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS [Categories]
(
	[CategoryID]	INTEGER,
	[CategoryName]	TEXT,
	[Description]	TEXT,
	PRIMARY KEY([CategoryID] AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS [CustomerCustomerDemo] 
(
	[CustomerID]	 TEXT NOT NULL,
	[CustomerTypeID] TEXT NOT NULL,
	FOREIGN KEY([CustomerTypeID]) REFERENCES [CustomerDemographics]([CustomerTypeID]) ON DELETE NO ACTION ON UPDATE NO ACTION,
	FOREIGN KEY([CustomerID]) REFERENCES [Customers]([CustomerID]) ON DELETE NO ACTION ON UPDATE NO ACTION,
	PRIMARY KEY([CustomerID],[CustomerTypeID])
);

CREATE TABLE IF NOT EXISTS [CustomerDemographics] 
(
	[CustomerTypeID] TEXT NOT NULL,
	[CustomerDesc]	 TEXT,
	PRIMARY KEY([CustomerTypeID])
);

CREATE TABLE IF NOT EXISTS [Customers] 
(
	[CustomerID]	TEXT,
	[CompanyName]	TEXT,
	[ContactName]	TEXT,
	[ContactTitle]	TEXT,
	[Address]	    TEXT,
	[City]	        TEXT,
	[Region]	    TEXT,
	[PostalCode]	TEXT,
	[Country]	    TEXT,
	[Phone]	        TEXT,
	[Fax]	        TEXT,
	PRIMARY KEY([CustomerID])
);

CREATE TABLE IF NOT EXISTS [Employees]
(
	[EmployeeID]	  INTEGER,
	[LastName]	      TEXT,
	[FirstName]	      TEXT,
	[Title]	          TEXT,
	[TitleOfCourtesy] TEXT,
	[BirthDate]       DATE,
	[HireDate]	      DATE,
	[Address]	      TEXT,
	[City]	          TEXT,
	[Region]	      TEXT,
	[PostalCode]	  TEXT,
	[Country]	      TEXT,
	[HomePhone]	      TEXT,
	[Extension]	      TEXT,
	[Notes]	          TEXT,
	[ReportsTo]	      INTEGER,
	[Email]	          TEXT,
	[Password]	      TEXT,
	[PasswordSalt]	  TEXT,
	[RefreshToken]	  TEXT,
	[Status]          TEXT,
	FOREIGN KEY([ReportsTo]) REFERENCES [Employees]([EmployeeID]) ON DELETE NO ACTION ON UPDATE NO ACTION,
	PRIMARY KEY([EmployeeID] AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS [EmployeeTerritories]
(
	[EmployeeID]	INTEGER NOT NULL,
	[TerritoryID]	TEXT NOT NULL,
	FOREIGN KEY([EmployeeID]) REFERENCES [Employees]([EmployeeID]) ON DELETE NO ACTION ON UPDATE NO ACTION,
	FOREIGN KEY([TerritoryID]) REFERENCES [Territories]([TerritoryID]) ON DELETE NO ACTION ON UPDATE NO ACTION,
	PRIMARY KEY([EmployeeID],[TerritoryID])
);

CREATE TABLE IF NOT EXISTS [Order Details]
(
	[OrderID]	INTEGER NOT NULL,
	[ProductID]	INTEGER NOT NULL,
	[UnitPrice]	NUMERIC NOT NULL DEFAULT 0,
	[Quantity]	INTEGER NOT NULL DEFAULT 1,
	[Discount]	REAL NOT NULL DEFAULT 0,
	FOREIGN KEY([ProductID]) REFERENCES [Products]([ProductID]) ON DELETE NO ACTION ON UPDATE NO ACTION,
	FOREIGN KEY([OrderID]) REFERENCES [Orders]([OrderID]) ON DELETE NO ACTION ON UPDATE NO ACTION,
	CHECK([Discount] >= (0) AND [Discount] <= (1)),
	CHECK([Quantity] > (0)),
	CHECK([UnitPrice] >= (0)),
	PRIMARY KEY([OrderID],[ProductID])
);

CREATE TABLE IF NOT EXISTS [Orders]
(
	[OrderID]	     INTEGER NOT NULL,
	[CustomerID]	 TEXT,
	[EmployeeID]	 INTEGER,
	[OrderDate]	     DATETIME,
	[RequiredDate]	 DATETIME,
	[ShippedDate]	 DATETIME,
	[ShipVia]	     INTEGER,
	[Freight]	     NUMERIC DEFAULT 0,
	[ShipName]	     TEXT,
	[ShipAddress] 	 TEXT,
	[ShipCity]	     TEXT,
	[ShipRegion]	 TEXT,
	[ShipPostalCode] TEXT,
	[ShipCountry]    TEXT,
	FOREIGN KEY([CustomerID]) REFERENCES [Customers]([CustomerID]) ON DELETE NO ACTION ON UPDATE NO ACTION,
	FOREIGN KEY([ShipVia]) REFERENCES [Shippers]([ShipperID]) ON DELETE NO ACTION ON UPDATE NO ACTION,
	FOREIGN KEY([EmployeeID]) REFERENCES [Employees]([EmployeeID]) ON DELETE NO ACTION ON UPDATE NO ACTION,
	PRIMARY KEY([OrderID] AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS [Products]
(
	[ProductID]	      INTEGER NOT NULL,
	[ProductName]	  TEXT NOT NULL,
	[SupplierID]	  INTEGER,
	[CategoryID]	  INTEGER,
	[QuantityPerUnit] TEXT,
	[UnitPrice]	      NUMERIC DEFAULT 0,
	[UnitsInStock]	  INTEGER DEFAULT 0,
	[UnitsOnOrder]	  INTEGER DEFAULT 0,
	[ReorderLevel]	  INTEGER DEFAULT 0,
	[Discontinued]	  BOOLEAN NOT NULL DEFAULT 0,
	FOREIGN KEY([CategoryID]) REFERENCES [Categories]([CategoryID]) ON DELETE NO ACTION ON UPDATE NO ACTION,
	FOREIGN KEY([SupplierID]) REFERENCES [Suppliers]([SupplierID]) ON DELETE NO ACTION ON UPDATE NO ACTION,
	CHECK([UnitsInStock] >= (0)),
	CHECK([ReorderLevel] >= (0)),
	CHECK([UnitPrice] >= (0)),
	CHECK([UnitsOnOrder] >= (0)),
	PRIMARY KEY([ProductID] AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS [Regions] 
(
	[RegionID]	        INTEGER NOT NULL,
	[RegionDescription]	TEXT NOT NULL,
	PRIMARY KEY([RegionID])
);

CREATE TABLE IF NOT EXISTS [Shippers] 
(
	[ShipperID]	  INTEGER NOT NULL,
	[CompanyName] TEXT NOT NULL,
	[Phone]	      TEXT,
	PRIMARY KEY([ShipperID] AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS [Suppliers] 
(
	[SupplierID]	INTEGER NOT NULL,
	[CompanyName]	TEXT NOT NULL,
	[ContactName]	TEXT,
	[ContactTitle]	TEXT,
	[Address]	    TEXT,
	[City]	        TEXT,
	[Region]	    TEXT,
	[PostalCode]	TEXT,
	[Country]	    TEXT,
	[Phone]	        TEXT,
	[Fax]	        TEXT,
	[HomePage]	    TEXT,
	PRIMARY KEY([SupplierID] AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS [Territories] 
(
	[TerritoryID]	        TEXT NOT NULL,
	[TerritoryDescription]	TEXT NOT NULL,
	[RegionID]	            INTEGER NOT NULL,
	FOREIGN KEY([RegionID]) REFERENCES [Regions]([RegionID]) ON DELETE NO ACTION ON UPDATE NO ACTION,
	PRIMARY KEY([TerritoryID])
);

CREATE VIEW [Alphabetical list of products] 
AS
    SELECT 
        Products.*, 
        Categories.CategoryName
    FROM 
        Categories 
    INNER JOIN 
        Products 
    ON 
        Categories.CategoryID = Products.CategoryID
    WHERE 
        Products.Discontinued = 0;

CREATE VIEW [Current Product List] 
AS
    SELECT 
        ProductID,
        ProductName 
    FROM 
        Products 
    WHERE 
        Discontinued = 0;

CREATE VIEW [Customer and Suppliers by City] 
AS
    SELECT 
        City, 
        CompanyName, 
        ContactName, 
        'Customers' AS Relationship 
    FROM 
        Customers
    UNION 
    SELECT 
        City, 
        CompanyName, 
        ContactName, 
        'Suppliers'
    FROM 
        Suppliers 
    ORDER BY 
        City, 
        CompanyName;

CREATE VIEW [Invoices] 
AS
    SELECT 
        Orders.ShipName,
        Orders.ShipAddress,
        Orders.ShipCity,
        Orders.ShipRegion, 
        Orders.ShipPostalCode,
        Orders.ShipCountry,
        Orders.CustomerID,
        Customers.CompanyName AS CustomerName, 
        Customers.Address,
        Customers.City,
        Customers.Region,
        Customers.PostalCode,
        Customers.Country,
        (Employees.FirstName + ' ' + Employees.LastName) AS Salesperson, 
        Orders.OrderID,
        Orders.OrderDate,
        Orders.RequiredDate,
        Orders.ShippedDate, 
        Shippers.CompanyName As ShipperName,
        [Order Details].ProductID,
        Products.ProductName, 
        [Order Details].UnitPrice,
        [Order Details].Quantity,
        [Order Details].Discount, 
        ((([Order Details].UnitPrice*Quantity*(1-Discount))/100)*100) AS ExtendedPrice,
        Orders.Freight 
    FROM 
        Customers 
    JOIN 
        Orders 
    ON 
        Customers.CustomerID = Orders.CustomerID  
    JOIN 
        Employees ON Employees.EmployeeID = Orders.EmployeeID    
    JOIN 
        [Order Details] ON Orders.OrderID = [Order Details].OrderID     
    JOIN 
        Products ON Products.ProductID = [Order Details].ProductID      
    JOIN 
        Shippers ON Shippers.ShipperID = Orders.ShipVia;

CREATE VIEW [Orders Qry] AS
    SELECT 
        Orders.OrderID,
        Orders.CustomerID,
        Orders.EmployeeID, 
        Orders.OrderDate, 
        Orders.RequiredDate,
        Orders.ShippedDate, 
        Orders.ShipVia, 
        Orders.Freight,
        Orders.ShipName, 
        Orders.ShipAddress, 
        Orders.ShipCity,
        Orders.ShipRegion,
        Orders.ShipPostalCode,
        Orders.ShipCountry,
        Customers.CompanyName,
        Customers.Address,
        Customers.City,
        Customers.Region,
        Customers.PostalCode, 
        Customers.Country
    FROM 
        Customers 
    JOIN 
        Orders 
    ON 
        Customers.CustomerID = Orders.CustomerID;

CREATE VIEW [Order Subtotals] AS
    SELECT 
        [Order Details].OrderID, 
        Sum(([Order Details].UnitPrice*Quantity*(1-Discount)/100)*100) AS Subtotal
    FROM 
        [Order Details]
    GROUP BY 
        [Order Details].OrderID;

CREATE VIEW [Product Sales for 1997] AS
    SELECT 
        Categories.CategoryName, 
        Products.ProductName, 
        Sum(([Order Details].UnitPrice*Quantity*(1-Discount)/100)*100) AS ProductSales
    FROM 
        Categories
    JOIN 
        Products 
    ON 
        Categories.CategoryID = Products.CategoryID
    JOIN  
        [Order Details] 
    ON 
        Products.ProductID = [Order Details].ProductID     
    JOIN  
        [Orders] 
    ON 
        Orders.OrderID = [Order Details].OrderID 
    WHERE 
        Orders.ShippedDate BETWEEN DATETIME('1997-01-01') AND DATETIME('1997-12-31')
    GROUP BY 
        Categories.CategoryName, 
        Products.ProductName;

CREATE VIEW [Products Above Average Price] AS
    SELECT 
        Products.ProductName, 
        Products.UnitPrice
    FROM 
        Products
    WHERE 
        Products.UnitPrice > (SELECT AVG(UnitPrice) From Products);

CREATE VIEW [Products by Category] AS
    SELECT 
        Categories.CategoryName, 
        Products.ProductName, 
        Products.QuantityPerUnit, 
        Products.UnitsInStock, 
        Products.Discontinued
    FROM 
        Categories 
    INNER JOIN
        Products 
    ON 
        Categories.CategoryID = Products.CategoryID
    WHERE 
        Products.Discontinued <> 1;

CREATE VIEW [Quarterly Orders] AS
    SELECT DISTINCT 
        Customers.CustomerID, 
        Customers.CompanyName, 
        Customers.City, 
        Customers.Country
    FROM 
        Customers 
    JOIN 
        Orders 
    ON 
        Customers.CustomerID = Orders.CustomerID
    WHERE 
        Orders.OrderDate BETWEEN DATETIME('1997-01-01') AND DATETIME('1997-12-31');

CREATE VIEW [Sales Totals by Amount] AS
    SELECT [Order Subtotals].Subtotal AS SaleAmount, 
           Orders.OrderID, 
           Customers.CompanyName, 
           Orders.ShippedDate
    FROM 
        Customers 
    JOIN 
        Orders 
    ON 
        Customers.CustomerID = Orders.CustomerID
    JOIN 
        [Order Subtotals] 
    ON 
        Orders.OrderID = [Order Subtotals].OrderID 
    WHERE 
        ([Order Subtotals].Subtotal > 2500) 
    AND 
        (Orders.ShippedDate BETWEEN DATETIME('1997-01-01') AND DATETIME('1997-12-31'));

CREATE VIEW [Summary of Sales by Quarter] AS
    SELECT 
        Orders.ShippedDate, 
        Orders.OrderID, 
        [Order Subtotals].Subtotal
    FROM 
        Orders 
    INNER JOIN 
        [Order Subtotals] 
    ON 
        Orders.OrderID = [Order Subtotals].OrderID
    WHERE 
        Orders.ShippedDate IS NOT NULL;

CREATE VIEW [Summary of Sales by Year] AS
    SELECT
        Orders.ShippedDate, 
        Orders.OrderID, 
        [Order Subtotals].Subtotal
    FROM 
        Orders 
    INNER JOIN 
        [Order Subtotals] 
    ON 
        Orders.OrderID = [Order Subtotals].OrderID
    WHERE 
        Orders.ShippedDate IS NOT NULL;

CREATE VIEW [Category Sales for 1997] AS
    SELECT
        [Product Sales for 1997].CategoryName, 
        Sum([Product Sales for 1997].ProductSales) AS CategorySales
    FROM 
        [Product Sales for 1997]
    GROUP BY 
        [Product Sales for 1997].CategoryName;

CREATE VIEW [Order Details Extended] AS
    SELECT 
        [Order Details].OrderID, 
        [Order Details].ProductID, 
        Products.ProductName, 
        [Order Details].UnitPrice, 
        [Order Details].Quantity, 
        [Order Details].Discount, 
        ([Order Details].UnitPrice*Quantity*(1-Discount)/100)*100 AS ExtendedPrice
    FROM 
        Products 
    JOIN 
        [Order Details] 
    ON 
        Products.ProductID = [Order Details].ProductID;

CREATE VIEW [Sales by Category] AS
    SELECT 
        Categories.CategoryID, 
        Categories.CategoryName, 
        Products.ProductName, 
        Sum([Order Details Extended].ExtendedPrice) AS ProductSales
    FROM  
        Categories 
    JOIN 
        Products 
    ON 
        Categories.CategoryID = Products.CategoryID
    JOIN 
        [Order Details Extended] 
    ON 
        Products.ProductID = [Order Details Extended].ProductID                
    JOIN 
        Orders 
    ON 
        Orders.OrderID = [Order Details Extended].OrderID 
    WHERE 
        Orders.OrderDate BETWEEN DATETIME('1997-01-01') AND DATETIME('1997-12-31')
    GROUP BY 
        Categories.CategoryID, 
        Categories.CategoryName, 
        Products.ProductName;

CREATE VIEW [ProductDetails_V] as
    SELECT 
        p.*, 
        c.CategoryName, 
        c.Description as [CategoryDescription],
        s.CompanyName as [SupplierName], 
        s.Region as [SupplierRegion]
    FROM 
        [Products] p
    JOIN 
        [Categories] c 
    ON 
        p.CategoryId = c.CategoryId
    JOIN 
        [Suppliers] s 
    ON 
        s.SupplierId = p.SupplierId;
