import 'reflect-metadata'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
    type: "postgres",
    url: 'postgres://postgres:dbteste@localhost/postgres',
    entities: [`${__dirname}/**/entity/*.ts`],
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`]
})