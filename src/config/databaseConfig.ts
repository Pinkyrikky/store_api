import { Sequelize } from "sequelize";

const db= new Sequelize(process.env.DATABASE as string,process.env.USER as string,process.env.PASSWORD as string,{
    storage: 'localhost', 
    dialect: "postgres",
    logging: false 
})

export default db;