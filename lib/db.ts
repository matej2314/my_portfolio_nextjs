// import mysql, { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

// // type MysqlPool = ReturnType<typeof mysql.createPool>;

// // declare global {
// //     var mysqlPool: MysqlPool | undefined;
// // }

// const pool = mysql.createPool({
//     host: process.env.DB_HOST || '185.170.196.107',
//     user: process.env.DB_USER || 'mateo2314',
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME || 'portfolio_db',
//     waitForConnections: true,
//     connectionLimit: 20,
//     queueLimit: 0,
// });

// // if (!global.mysqlPool) {
// //     global.mysqlPool = pool;
// // }

// export const executeQuery = async <T = RowDataPacket[]>(sql: string, values: any[] = []): Promise<T> => {
//     const connection = await pool.getConnection();

//     try {
//         const [rows] = await connection.execute(sql, values) as [T,any];
//         return rows;
//     } catch (error) {
//         console.log('Query error:',error);
//         throw error;
//     } finally {
//        connection.release();
//     }
// };

// export const executeTransaction = async <T= RowDataPacket[]>(queries: { sql: string, values: any[] }[]): Promise<T[]> => {
//     const connection = await pool.getConnection();
    
//     try {
//         await connection.beginTransaction();
//         const results: T[] = [];

//         for (const query of queries) {
//             const [result] = await connection.execute(query.sql, query.values);
//             results.push(result as T);
//         }

//         await connection.commit();
//         return results;
//     } catch (error) {
//         console.error(`Transaction error:`, error);
//         await connection.rollback();
//         throw error;
//     } finally {
//         connection.release();
//     };
// };


import { PrismaClient } from '@prisma/client';

declare global {
    var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
    global.prisma = prisma;
}

export default prisma;