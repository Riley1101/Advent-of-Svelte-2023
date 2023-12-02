import { getChallengeMetaByDay } from '$lib/data/day';

/** @type {import('./$types').LayoutLoad} */
export function load() {
	const challenge_data = getChallengeMetaByDay('1');
	return {
		challenge: challenge_data
	};
}
