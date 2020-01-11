// setup Room model and its fields.
module.exports = (sequelize, DataTypes) => {
    const Room = sequelize.define("Rooms", {
        room_name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        track_history: {
            type: DataTypes.BOOLEAN,
            unique: false,
            allowNull: true
        },
        team_count: {
            type: DataTypes.INTEGER,
            unique: false,
            allowNull: true
        }
    });
    return Room;
};
