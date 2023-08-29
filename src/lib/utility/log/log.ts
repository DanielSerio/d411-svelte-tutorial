export default function log() {
	const message = `Created By: Dan Serio | 2023`;
	const total = 80;
	const diff = total - message.length;
	const half = ~~(diff / 2);
	let messageBlock: string;

	if ((diff / 2) % 1 !== 0) {
		const firstHalf = `#${' '.repeat(half - 1)}`;
		const secondHalf = `${' '.repeat(half)}#`;
		messageBlock = `${firstHalf}${message}${secondHalf}`;
	} else {
		const firstHalf = `#${' '.repeat(half - 1)}`;
		const secondHalf = `${' '.repeat(half - 1)}#`;
		messageBlock = `${firstHalf}${message}${secondHalf}`;
	}
	const bar = '#'.repeat(total);
	console.log(`${bar}\n${messageBlock}\n${bar}`);
}
