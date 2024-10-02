const {Sequelize, DataTypes} = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql'
    }
);

sequelize.authenticate()
    .then(() => console.log('Database connected.'))
    .catch(err => console.error('Unable to connect to the database:', err));

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    customerName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    orderDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    timestamps: false
});

sequelize.sync({ alter: true }).then(() => {
    console.log("Database & tables created!");
});

module.exports = {Order};