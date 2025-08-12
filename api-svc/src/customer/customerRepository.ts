import sql, {
    config as SqlConfig, ConnectionPool, Transaction, Request as SqlRequest, ISOLATION_LEVEL, BigInt, NVarChar,
    IResult
} from 'mssql';

import {CustomerDto} from "./customerDto";
import {CustomerEntity} from "./customerEntity";
import {mapCustomerDtoToEntity} from "./customerMapper";

const conf: SqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER!,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true,
        trustServerCertificate: true,
    }
}

async function getCustomer(id: number): Promise<CustomerEntity | null> {
    let pool: ConnectionPool | undefined;

    pool = await sql.connect(conf);

    const result = await pool.request()
        .input('id', BigInt, id)
        .query(`
            SELECT id, firstName, lastName, country, rowVersion
                FROM Customer
                WHERE id = @id`);

    if(result.recordset.length === 0) {
        return null;
    }

    const row = result.recordset[0];

    return {
        id: row.id,
        firstName: row.firstName,
        lastName: row.lastName,
        country: row.country,
        rowVersion: row.rowVersion,
    };
}

async function createCustomer(dto: CustomerDto): Promise<void> {

    let entity: CustomerEntity = mapCustomerDtoToEntity(0, dto);

    let pool: ConnectionPool | undefined;
    let transaction: Transaction | undefined;

    try {

        pool = await sql.connect(conf);
        transaction = new Transaction(pool);

        await transaction.begin(ISOLATION_LEVEL.SNAPSHOT);

        const r = new SqlRequest(transaction);
        r.input('firstName', NVarChar(100), entity.firstName);
        r.input('lastName', NVarChar(100), entity.lastName);
        r.input('country', NVarChar(50), entity.country);

        const result: IResult<any> = await r.query(`
            INSERT INTO Customer(firstName, lastName, country)
            VALUES(@firstName, @lastName, @country)`);

        await transaction.commit();

        if (result.rowsAffected[0] != 1) {
            throw {
                code: 'INSERT_ERROR',
                message: 'Failed to add Customer'
            }
        }

    } catch(err) {

        if(transaction) {
            try {
                await transaction.rollback();
            } catch(transactionError) {
                console.error('Error trying to rollback transaction: ', transactionError);
            }
        }

        throw err;
    }
}

async function updateCustomer(id: number, dto: CustomerDto): Promise<void> {

    let entity: CustomerEntity = mapCustomerDtoToEntity(id, dto);

    let pool: ConnectionPool | undefined;
    let transaction: Transaction | undefined;

    try {

        pool = await sql.connect(conf);
        transaction = new Transaction(pool);

        await transaction.begin(ISOLATION_LEVEL.SNAPSHOT);

        const r = new SqlRequest(transaction);
        r.input('id', BigInt, entity.id);
        r.input('firstName', NVarChar(100), entity.firstName);
        r.input('lastName', NVarChar(100), entity.lastName);
        r.input('country', NVarChar(50), entity.country);
        r.input('rowVersion', BigInt, entity.rowVersion);

        const result: IResult<any> = await r.query(`
            UPDATE Customer
                SET firstName = @firstName,
                    lastName = @lastName,
                    country = @country,
                    rowVersion = rowVersion + 1
                WHERE id = @id
                    AND rowVersion = @rowVersion`);

        if (result.rowsAffected[0] === 0) {
            throw {
                code: 'OPTIMISTIC_LOCKING_ERR',
                message: 'Customer not found due to version mismatch'
            }
        }

        await transaction.commit();
    } catch(err) {

        if(transaction) {
            try {
                await transaction.rollback();
            } catch(transactionError) {
                console.error('Error trying to rollback transaction: ', transactionError);
            }
        }

        throw err;
    }
}

export { getCustomer, createCustomer, updateCustomer }