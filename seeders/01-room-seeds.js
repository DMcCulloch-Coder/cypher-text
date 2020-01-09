module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Rooms",
			[
				{
					room_name: "Example Room 1",
					track_history: 0,
					team_count: 3,
					created_at: new Date(),
					updated_at: new Date()
				},
				{
					room_name: "Example Room 2",
					track_history: 0,
					team_count: 3,
					created_at: new Date(),
					updated_at: new Date()
				},
				{
					room_name: "Example Room 3",
					track_history: 0,
					team_count: 3,
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
