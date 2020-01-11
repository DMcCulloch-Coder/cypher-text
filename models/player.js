// setup Player model and its fields.
module.exports = (sequelize, DataTypes) => {
    const Player = sequelize.define("Players", {
        player_name: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        },
        player_team: {
            type: DataTypes.INTEGER,
            unique: false,
            allowNull: false
        },
        player_type: {
            type: DataTypes.BOOLEAN,
            unique: false,
            allowNull: false
        }
    });
    return Player;
};
