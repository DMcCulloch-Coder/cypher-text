// setup Word model and its fields.
module.exports = (sequelize, DataTypes) => {
    const Word = sequelize.define("Words", {
        word: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        },
        visible: {
            type: DataTypes.BOOLEAN,
            unique: false,
            allowNull: true
        },
        group_type: {
            type: DataTypes.INTEGER,
            unique: false,
            allowNull: true
        }
    });
    return Word;
};
