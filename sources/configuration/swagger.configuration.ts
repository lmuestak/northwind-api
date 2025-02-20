import { AppConfig as config } from '../configuration/application.configuration';
import swaggerJSDoc from 'swagger-jsdoc';
import { Employee } from '../models/employee.model';
import { report } from 'process';

const swaggerOptions = 
{
    definition:
    {
        openapi: '3.1.0',
        info: 
        {
            version: '1.0.0',
            title: 'Northwind RESTfull API',
            description: 'Northwind database RESTfull API',
            license: 
            {
                name: 'MIT',
                url: 'https://opensource.org/licenses/MIT'
            },
            contact: 
            {
                name: "Leon Muestak",
                url: "https://github.com/lmuestak",
                email: "leon.muestak@gmail.com",
            },
        },
        servers:
        [
            {
                url: `http://127.0.0.1:${config.port}`,
                description: 'Development server',
            }
        ],
        tags: [
            {
                name: 'category',
                description: 'a model to group products',
            },
            {
                name: 'product',
                description: 'an entity that is sold or produced',
            },
            {
                name: 'customer',
                description: 'a person or organization that buys goods or services from a store or business',
            },
            {
                name: 'employee',
                description: 'a person employed for wages or salary',
            },
            {
                name: 'order',
                description: 'a request for goods or services by a customer',
            },
            {
                name: 'order_detail',
                description: 'a product that is part of an order',
            },
            {
                name: 'supplier',
                description: 'a person or organization that provides goods or services',
            },
            {
                name: 'shipper',
                description: 'a company that transports goods',
            }
        ],
        //host: `http://127.0.0.1:${config.port}/api/${config.api_version_short}`,
        basePath: '/',
        schemas: 
        [
            'http'
        ],
        consumes: 
        [
            'application/json'
        ],
        produces: 
        [
            'application/json'
        ],
        components: 
        {
            securitySchemes: 
            {
                bearerAuth: 
                {
                    type: 'http',
                    scheme: 'bearer',
                }
            },
            schemas:
            {
                Category: 
                {
                    type: "object",
                    properties: 
                    {
                        categoryId: 
                        {
                            "type": "integer",
                            "format": "int32",
                            "example": 1
                        },
                        categoryName: 
                        {
                            type: 'string',
                            example: 'Bevarages',
                            required: true
                        },
                        description: 
                        {
                            type: 'string',
                            example: 'This category includes soft drinks, coffees, teas, beers, and ales',
                            required: false
                        },
                        picture: 
                        {
                            type: 'buffer',
                            example: '0x89504E470D0A1A0A0000000D4948445200000010000000100806000000F9FF000000017352474200AECE1CE90000000467414D410000B18F0BFC6105000000097048597300000EC300000EC301C76FA8640000000A4944415478DAED5D0A',
                            required: false
                        },
                        products: 
                        {
                            type: 'array',
                            $ref: '#/components/schemas/Product',
                        },
                    },
                },
                Product: 
                {
                    type: "object",
                    properties: 
                    {
                        productId: 
                        {
                            "type": "integer",
                            "format": "int32",
                            "example": 1
                        },
                        productName: 
                        {
                            type: 'string',
                            example: 'Tea',
                            required: true
                        },
                        quantityPerUnit: 
                        {
                            type: 'string',
                            example: 'This category includes soft drinks, coffees, teas, beers, and ales',
                            required: false
                        },
                        unitPrice: 
                        {
                            type: 'number',
                            example: '1.23',
                            required: true
                        },
                        unitsInStock: 
                        {
                            type: 'integer',
                            example: '12',
                            required: false
                        },
                        unitsOnOrder: 
                        {
                            type: 'integer',
                            example: '45',
                            required: false
                        },
                        reorderLevel: 
                        {
                            type: 'integer',
                            example: '23',
                            required: false
                        },
                        discontinued: 
                        {
                            type: 'string',
                            example: '0',
                            required: false
                        },
                        category: 
                        {
                            type: 'object',
                            $ref: '#/components/schemas/Category',
                        },
                        supplier: 
                        {
                            type: 'object',
                            $ref: '#/components/schemas/Supplier',
                        },
                        orderDetails: 
                        {
                            type: 'array',
                            $ref: '#/components/schemas/OrderDetail',
                        },
                    },
                },
                Supplier: 
                {
                    type: "object",
                    properties: 
                    {
                        supplierId: 
                        {
                            "type": "integer",
                            "format": "int32",
                            "example": 1
                        },
                        companyName: 
                        {
                            type: 'string',
                            example: 'Exotic Liquids',
                            required: true
                        },
                        contactName: 
                        {
                            type: 'string',
                            example: 'Charlotte Cooper',
                            required: false
                        },
                        contactTitle: 
                        {
                            type: 'string',
                            example: 'Purchasing Manager',
                            required: false
                        },
                        address: 
                        {
                            type: 'string',
                            example: '49 Gilbert St.',
                            required: false
                        },
                        city: 
                        {
                            type: 'string',
                            example: 'London',
                            required: false
                        },
                        region: 
                        {
                            type: 'string',
                            example: 'NULL',
                            required: false
                        },
                        postalCode: 
                        {
                            type: 'string',
                            example: 'EC1 4SD',
                            required: false
                        },
                        country: 
                        {
                            type: 'string',
                            example: 'UK',
                            required: false
                        },
                        phone: 
                        {
                            type: 'string',
                            example: '171-555-2222',
                            required: false
                        },
                        fax: 
                        {
                            type: 'string',
                            example: '171-555-2222',
                            required: false
                        },
                        homePage: 
                        {
                            type: 'string',
                            example: 'http://www.exoticliquids.com',
                            required: false
                        },
                        products: 
                        {
                            type: 'array',
                            $ref: '#/components/schemas/Product',
                        },
                    },
                },
                Customer: 
                {
                    type: "object",
                    properties: 
                    {
                        customerId: 
                        {
                            "type": "string",
                            "format": "string",
                            "example": 'ALFKI'
                        },
                        companyName: 
                        {
                            type: 'string',
                            example: 'Exotic Liquids',
                            required: true
                        },
                        contactName: 
                        {
                            type: 'string',
                            example: 'Charlotte Cooper',
                            required: false
                        },
                        contactTitle: 
                        {
                            type: 'string',
                            example: 'Purchasing Manager',
                            required: false
                        },
                        address: 
                        {
                            type: 'string',
                            example: '49 Gilbert St.',
                            required: false
                        },
                        city: 
                        {
                            type: 'string',
                            example: 'London',
                            required: false
                        },
                        region: 
                        {
                            type: 'string',
                            example: 'NULL',
                            required: false
                        },
                        postalCode: 
                        {
                            type: 'string',
                            example: 'EC1 4SD',
                            required: false
                        },
                        country: 
                        {
                            type: 'string',
                            example: 'UK',
                            required: false
                        },
                        phone: 
                        {
                            type: 'string',
                            example: '171-555-2222',
                            required: false
                        },
                        fax: 
                        {
                            type: 'string',
                            example: '171-555-2222',
                            required: false
                        },
                        orders: 
                        {
                            type: 'array',
                            $ref: '#/components/schemas/Order',
                        },
                        customerDemographics:
                        {
                            type: 'array',
                            $ref: '#/components/schemas/CustomerDemographic',
                        },
                    },
                },
                Employee: 
                {
                    type: "object",
                    properties: 
                    {
                        employeeId: 
                        {
                            "type": "integer",
                            "format": "int32",
                            "example": 1
                        },
                        lastName: 
                        {
                            type: 'string',
                            example: 'Davolio',
                            required: true
                        },
                        firstName: 
                        {
                            type: 'string',
                            example: 'Nancy',
                            required: false
                        },
                        title: 
                        {
                            type: 'string',
                            example: 'Sales Representative',
                            required: false
                        },
                        titleOfCourtesy: 
                        {
                            type: 'string',
                            example: 'Ms.',
                            required: false
                        },
                        address: 
                        {
                            type: 'string',
                            example: '49 Gilbert St.',
                            required: false
                        },
                        city: 
                        {
                            type: 'string',
                            example: 'London',
                            required: false
                        },
                        region: 
                        {
                            type: 'string',
                            example: 'NULL',
                            required: false
                        },
                        zipCode: 
                        {
                            type: 'string',
                            example: 'EC1 4SD',
                            required: false
                        },
                        country: 
                        {
                            type: 'string',
                            example: 'UK',
                            required: false
                        },
                        phone: 
                        {
                            type: 'string',
                            example: '171-555-2222',
                            required: false
                        },
                        extension: 
                        {
                            type: 'string',
                            example: '171',
                            required: false
                        },
                        birthDate: 
                        {
                            type: 'string',
                            example: '1958-12-08',
                            required: false
                        },
                        hireDate: 
                        {
                            type: 'string',
                            example: '1992-05-01',
                            required: false
                        },
                        email: 
                        {
                            type: 'string',
                            example: 'nancy.davolio@northwind.com',
                            required: true
                        },
                        password: 
                        {
                            type: 'string',
                            example: 'password',
                            required: true
                        },
                        passwordSalt: 
                        {
                            type: 'string',
                            example: 'password',
                            required: true
                        },
                        refreshToken: 
                        {
                            type: 'string',
                            example: '',
                            required: true
                        },
                        notes: 
                        {
                            type: 'string',
                            example: '',
                            required: false
                        },
                        status: 
                        {
                            type: 'string',
                            example: 'active',
                            required: false
                        },
                        reportsTo: {
                            type: 'object',
                            $ref: '#/components/schemas/Employee',
                        },
                        employees: 
                        {
                            type: 'array',
                            $ref: '#/components/schemas/Employee',
                        },
                        orders: 
                        {
                            type: 'array',
                            $ref: '#/components/schemas/Order',
                        },
                        territories: 
                        {
                            type: 'array',
                            $ref: '#/components/schemas/Territory',
                        },
                    },
                },
                Order: 
                {
                    type: "object",
                    properties: 
                    {
                        orderId: 
                        {
                            "type": "integer",
                            "format": "int32",
                            "example": 1
                        },
                        orderDate: 
                        {
                            type: 'date',
                            example: '1996-07-04',
                            required: true
                        },
                        requiredDate: 
                        {
                            type: 'date',
                            example: '1996-07-04',
                            required: false
                        },
                        shippedDate: 
                        {
                            type: 'date',
                            example: '1996-07-04',
                            required: false
                        },
                        freight: 
                        {
                            "type": "number",
                            "format": "float",
                            "example": 3.45
                        },
                        shipName: 
                        {
                            type: 'string',
                            example: 'Speedy Express',
                            required: false
                        },
                        shipAddress: 
                        {
                            type: 'string',
                            example: '49 Gilbert St.',
                            required: false
                        },
                        shipCity: 
                        {
                            type: 'string',
                            example: 'London',
                            required: false
                        },
                        shipRegion: 
                        {
                            type: 'string',
                            example: 'NULL',
                            required: false
                        },
                        shipPostalCode: 
                        {
                            type: 'string',
                            example: 'EC1 4SD',
                            required: false
                        },
                        shipCountry: 
                        {
                            type: 'string',
                            example: 'UK',
                            required: false
                        },
                        orderDetails: 
                        {
                            type: 'array',
                            $ref: '#/components/schemas/OrderDetail',
                        },
                        shipVia: 
                        {
                            type: 'object',
                            $ref: '#/components/schemas/Shipper',
                        },
                        customer: 
                        {
                            type: 'object',
                            $ref: '#/components/schemas/Customer',
                        },
                        employee: 
                        {
                            type: 'object',
                            $ref: '#/components/schemas/Employee',
                        },
                    },
                },
                Shipper: 
                {
                    type: "object",
                    properties: 
                    {
                        shipperId: 
                        {
                            "type": "integer",
                            "format": "int32",
                            "example": 1
                        },
                        companyName: 
                        {
                            type: 'string',
                            example: 'Speedy Express',
                            required: true
                        },
                        phone: 
                        {
                            type: 'string',
                            example: '171-555-2222',
                            required: false
                        },
                        orders: 
                        {
                            type: 'array',
                            $ref: '#/components/schemas/Order',
                        },
                    },
                },
                Region: 
                {
                    type: "object",
                    properties: 
                    {
                        regionId: 
                        {
                            "type": "integer",
                            "format": "int32",
                            "example": 1
                        },
                        regionDescription: 
                        {
                            type: 'string',
                            example: 'Western Europe',
                            required: false
                        },
                        territories: 
                        {
                            type: 'array',
                            $ref: '#/components/schemas/Territory',
                        },
                    },
                },
                Territory: 
                {
                    type: "object",
                    properties: 
                    {
                        territoryId: 
                        {
                            "type": "integer",
                            "format": "int32",
                            "example": 1
                        },
                        territoryDescription: 
                        {
                            type: 'string',
                            example: 'Westboro',
                            required: false
                        },
                        region: 
                        {
                            type: 'object',
                            $ref: '#/components/schemas/Region',
                        },
                        employees: 
                        {
                            type: 'array',
                            $ref: '#/components/schemas/Employee',
                        },
                    },
                },
                OrderDetail: 
                {
                    type: "object",
                    properties: 
                    {
                        orderId: 
                        {
                            "type": "integer",
                            "format": "int32",
                            "example": 1
                        },
                        productId: 
                        {
                            "type": "integer",
                            "format": "int32",
                            "example": 1
                        },
                        unitPrice: 
                        {
                            "type": "number",
                            "format": "float",
                            "example": 1.45
                        },
                        quantity: 
                        {
                            "type": "integer",
                            "format": "int32",
                            "example": 1
                        },
                        dicount: 
                        {
                            "type": "number",
                            "format": "float",
                            "example": 1.45
                        },
                        product: 
                        {
                            type: 'object',
                            $ref: '#/components/schemas/Product',
                        },
                        order: 
                        {
                            type: 'object',
                            $ref: '#/components/schemas/Order',
                        },
                    },
                },
                CustomerDemographic: 
                {
                    type: "object",
                    properties: 
                    {
                        customerTypeId: 
                        {
                            "type": "string",
                            "format": 'string',
                            "example": 1
                        },
                        customers: 
                        {
                            type: 'array',
                            $ref: '#/components/schemas/Customer',
                        },
                    },
                },
                EmployeeLoginRequest:
                {
                    type: 'object',
                    properties:
                    { 
                        email:
                        {
                            type: 'string',
                            required: true
                        },
                        password:
                        {
                            type: 'string',
                            required: true
                        }
                    }
                }
            }
        },
        paths:
        {
            '/api/v1/auth/login': 
            {
                post: 
                {
                    tags: ['auth'],
                    description: 'Login to the application',
                    produces: ['application/json'],
                    consumes: ['application/json'],
                    parameters: 
                    [
                        {
                            in: 'body',
                            description: 'User\'s login information.',
                            schema: 
                            {
                                type: 'object',
                                properties:
                                { 
                                    email:
                                    {
                                        type: 'string',
                                        required: true
                                    },
                                    password:
                                    {
                                        type: 'string',
                                        required: true
                                    }
                                }
                            }
                        }
                    ],
                    responses: 
                    {
                        200: 
                        {
                            description: 'login',
                            schema: 
                            {
                                type: 'object',
                                properties: 
                                [
                                    {
                                        type: 'boolean',
                                        name: 'sucsess',
                                    },
                                    {
                                        type: 'string',
                                        name: 'message',
                                    },
                                    {
                                        type: 'object',
                                        name: 'data',
                                        properties: 
                                        {
                                            'jwt_token':
                                            {
                                                type: 'string',
                                                required: true
                                            },
                                            'jwt_refresh_token':
                                            {
                                                type: 'string',
                                                required: true
                                            }
                                        },
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            '/api/v1/auth/refresh': 
            {
                post: 
                {
                    tags: ['auth'],
                    description: 'Login to the application',
                    produces: ['application/json'],
                    consumes: ['application/json'],
                    parameters: 
                    [
                        {
                            in: 'body',
                            description: 'User\'s refresh token information.',
                            schema: 
                            {
                                type: 'object',
                                properties:
                                { 
                                    'refreshToken':
                                    {
                                        type: 'string',
                                        required: true
                                    }
                                }
                            }
                        }
                    ],
                    responses: 
                    {
                        200: 
                        {
                            description: 'refresh token',
                            schema: 
                            {
                                type: 'object',
                                properties: 
                                [
                                    {
                                        type: 'boolean',
                                        name: 'sucsess',
                                    },
                                    {
                                        type: 'string',
                                        name: 'message',
                                    },
                                    {
                                        type: 'object',
                                        name: 'data',
                                        properties: 
                                        {
                                            'jwt_token':
                                            {
                                                type: 'string',
                                                required: true
                                            },
                                            'jwt_refresh_token':
                                            {
                                                type: 'string',
                                                required: true
                                            }
                                        },
                                    }
                                ]
                            }
                        }
                    }
                }
            },
        }
    },
    apis: ["../controllers/*.ts"],
    tryItOutEnabled: false
};

const DisableTryItOutPlugin = function() {
    return {
        statePlugins: {
            spec: {
                wrapSelectors: {
                    allowTryItOutFor: () => () => true,
                }
            }
        }
    }
}

export const swaggerConfigurationOptions = {
    swaggerOptions: {
        // supportedSubmitMethods: [

        // ],
        plugins: [
            DisableTryItOutPlugin
        ]
    }
};

export const swaggerSpecification = swaggerJSDoc(swaggerOptions);