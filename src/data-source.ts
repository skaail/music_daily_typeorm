import 'reflect-metadata'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
    type: "postgres",
    url: 'postgres://lwqiekqz:e842oj1r-TPMvE0R0uVHfgvs0m5PoomU@silly.db.elephantsql.com/lwqiekqz',
    entities: [`${__dirname}/**/entity/*.ts`],
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`]
})