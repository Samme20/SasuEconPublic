import https from "https";
import URL from "url";

async function get<T = object>(url: string, ua: string, auth?: string): Promise<{
	headers: { [k: string]: string | string[]; };
	body: Buffer;
	statusCode: number;
	statusMessage: string;
}> {
	return new Promise((a, b) => {
		const u = URL.parse(url);
		https
			.get({
				host: u.host,
				path: u.path,
				port: url.indexOf("https") !== -1 ? 443 : 80,
				method: "GET",
				headers: {
					"User-Agent": ua,
					"Host": "api.furry.bot",
					...(!!auth ? ({
						Authorization: auth
					}) : ({}))
				}
			}, (res) => {
				const d = [];

				res
					.on("data", d.push.bind(d))
					.on("error", b)
					.on("end", () => a({
						headers: res.headers,
						body: Buffer.concat(d),
						statusCode: res.statusCode,
						statusMessage: res.statusMessage
					}));
			})
			.end();
	});
}

// for overrides
export default get;
