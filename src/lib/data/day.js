/**
 * @param {string} day
 * @Returns {object} challengeMeta
 */
export function getChallengeMetaByDay(day) {
	return data.find((challenge) => challenge.id === parseInt(day));
}

export const data = [
	{
		id: 1,
		title: 'Day 1',
		description:
			"Operation Yuletide Harmony: Revitalizing Santa's Nice List with a Modern Deed Tracking System"
	}
];
