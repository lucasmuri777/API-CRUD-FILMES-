import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
    process.env.DATABASE_URL as string,
    {
    dialect: 'postgres',
    ssl: true, // Certifique-se de usar SSL ao conectar-se ao Heroku PostgreSQL
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // Ajuste essa opção conforme necessário para aceitar certificados SSL
        }
    }
});
sequelize.authenticate()
    .then(() => {
        console.log('Conexão bem-sucedida com o banco de dados');
    })
    .catch(err => {
        console.error('Erro ao conectar-se ao banco de dados:', err);
    });
