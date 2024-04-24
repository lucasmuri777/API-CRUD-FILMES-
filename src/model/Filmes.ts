import {Model, DataTypes} from 'sequelize';
import {sequelize } from '../instances/pg';

export interface FilmesInstance extends Model {
    id: number;
    name: string;
    description: string;
}

export const Filmes = sequelize.define<FilmesInstance>('Filmes', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    }
},{
    tableName: 'filmes',
    timestamps: false
})