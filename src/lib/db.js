import SequelizeLibrary from 'sequelize';
import {config} from 'dotenv';

config();

const { Sequelize, DataTypes, Op } = SequelizeLibrary;

const sequelize = new Sequelize(process['env']['DATABASE_STRING']);
const sq_fn = sequelize.fn;
const sq_col = sequelize.col;

const Wine = sequelize.define('Wine', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    source: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        indexes: [
            {
                fields: ['name', 'source', 'type']
            }
        ]
    });

const Bottle = sequelize.define('Bottle', {
    vintage: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bought: {
        type: DataTypes.DATE,
        allowNull: true
    },
    purchased_from: {
        type: DataTypes.STRING,
        allowNull: true
    },
    consumed: {
        type: DataTypes.DATE,
        allowNull: true
    },
    storage_location: {
        type: DataTypes.STRING,
        allowNull: true
    }
},
    {
        indexes: [
            {
                fields: ['vintage']
            },
            {
                fields: ['purchased_from']
            },
            {
                fields: ['consumed', 'bought']
            },
            {
                fields: ['storage_location']
            }
        ]
    });

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        indexes: [
            {
                fields: ['name']
            }
        ]
    });

const Note = sequelize.define('Note', {
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    }
},
    {
        indexs: [
            {
                fields: ['text']
            }
        ]
    });

const Review = sequelize.define('Review', {
    rating: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        indexes: [
            {
                fields: ['rating']
            }
        ]
    });

const Meta = sequelize.define('Meta', {
    key: {
        type: DataTypes.STRING,
        allowNull: false
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        indexes: [
            {
                fields: ['key']
            }
        ]
    });

Wine.hasMany(Bottle);
Bottle.belongsTo(Wine);

Bottle.hasMany(Note);
Note.belongsTo(Bottle);
Bottle.hasMany(Review);
Review.belongsTo(Bottle);

User.hasMany(Note);
Note.belongsTo(User);
User.hasMany(Review);
Review.belongsTo(User);

Wine.hasMany(Meta);
Bottle.hasMany(Meta);

let started = false;

async function startUp() {
    if (!started) {
        await sequelize.sync();
        await sequelize.query("PRAGMA journal_mode=WAL;");
        started = true;
    }
}

async function getModel() {
    await startUp();
    const context = function () { };
    context.Wine = Wine;
    context.Bottle = Bottle;
    context.User = User;
    context.Note = Note;
    context.Review = Review;
    context.Meta = Meta;

    return context;
}

export { getModel, sq_fn, sq_col, Op };