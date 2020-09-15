export default function chunk<T = any>(arr: T[], num: number): T[][] {
	const t = Math.ceil(arr.length / num);
	const res = [];
	for (let i = 0; i < t; i++) res.push(arr.slice(i * num, (i * num) + num));
	return res;
}
