module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Players",
			[
				{
					player_name: "Steve",
					player_team: 0,
					player_type: 3,
					room_id: 1,
					created_at: new Date(),
					updated_at: new Date()
				},
				{
					player_name: "David",
					player_team: 0,
					player_type: 3,
					room_id: 1,
					created_at: new Date(),
					updated_at: new Date()
				},
				{
					player_name: "Dana",
					player_team: 0,
					player_type: 3,
					room_id: 1,
					created_at: new Date(),
					updated_at: new Date()
				},
				{
					player_name: "Steve",
					player_team: 0,
					player_type: 3,
					room_id: 2,
					created_at: new Date(),
					updated_at: new Date()
				},
				{
					player_name: "David",
					player_team: 0,
					player_type: 3,
					room_id: 2,
					created_at: new Date(),
					updated_at: new Date()
				},
				{
					player_name: "Dana",
					player_team: 0,
					player_type: 3,
					room_id: 2,
					created_at: new Date(),
					updated_at: new Date()
				},
				{
					player_name: "Steve",
					player_team: 0,
					player_type: 3,
					room_id: 3,
					created_at: new Date(),
					updated_at: new Date()
				},
				{
					player_name: "David",
					player_team: 0,
					player_type: 3,
					room_id: 3,
					created_at: new Date(),
					updated_at: new Date()
				},
				{
					player_name: "Dana",
					player_team: 0,
					player_type: 3,
					room_id: 3,
					created_at: new Date(),
					updated_at: new Date()
				}
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		/*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
	}
};
