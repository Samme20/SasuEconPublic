import { USER_AGENT, API_URL, API_VERSION, API_HEADERS } from "../util/Constants";
import { JSONResponse, ImageResponse, f, FurryEndpoints, Options } from "../typings";
import ErrorHandler from "../util/ErrorHandler";
import YIFF from "./YIFF";
import { performance } from "perf_hooks";
import get from "../util/get";

export default class Furry {
	options: Options;
	constructor(d?: Partial<Options>) {
		if (!d) d = {};
		this.options = {
			userAgent: d.userAgent || USER_AGENT,
			apiKey: d.apiKey || "",
			debug: d.debug || (() => null),
			baseURL: d.baseURL || API_URL
		};
	}

	private async sendRequest(cat: FurryEndpoints, method: "image"): Promise<ImageResponse>;
	private async sendRequest(cat: FurryEndpoints, method: "json", amount: 1): Promise<JSONResponse>;
	private async sendRequest(cat: FurryEndpoints, method: "json", amount?: 2 | 3 | 4 | 5): Promise<JSONResponse[]>;
	private async sendRequest(cat: FurryEndpoints, method?: "image" | "json", amount?: 1 | 2 | 3 | 4 | 5): Promise<JSONResponse[] | JSONResponse | ImageResponse> {
		if (!cat) throw new TypeError("missing category");
		if (!method) method = "json";
		method = method.toLowerCase() as any;
		if (["image"].includes(method) && amount && amount > 1) throw new TypeError("Ammount cannot be greater than one when requesting an image or stream.");
		if (amount && amount > 5) throw new TypeError("Amount cannot be greater than five.");

		switch (method) {
			case "image": {
				const start = performance.now();
				const r = await get(`${this.options.baseURL}/${API_VERSION}/furry/${cat}/image`, this.options.userAgent, this.options.apiKey);
				const end = performance.now();

				if (r.statusCode !== 200) {
					const e = ErrorHandler(r.statusCode);
					if (!e) throw new TypeError(`Non 200-OK status code returned from api: ${r.statusCode} ${r.statusMessage}`);
					else throw new TypeError(e);
				}

				const d = {
					artists: [],
					sources: [],
					width: 0,
					height: 0,
					url: "",
					shortURL: "",
					reportURL: "",
					type: "",
					name: "",
					ext: ""
				} as JSONResponse;

				Object.keys(r.headers).map((h: string) => {
					if (Object.values(API_HEADERS).includes(h[0])) {
						const n = Object.keys(API_HEADERS)[Object.values(API_HEADERS).indexOf(h)];
						if (d[n] instanceof Array) d[n].push(r.headers[h]);
						else if (typeof d[n] === "number") d[n] = Number(r.headers[h]);
						else d[n] = r.headers[h];
					}
				});

				this.debug(`${this.options.baseURL}/${API_VERSION}/furry/${cat}/image`, { start, end, time: parseFloat((end - start).toFixed(2)) });

				return {
					image: r.body,
					data: d
				} as any as ImageResponse;
				break;
			}

			case "json": {
				const start = performance.now();
				const r = await get(`${this.options.baseURL}/${API_VERSION}/furry/${cat}`, this.options.userAgent, this.options.apiKey);

				const end = performance.now();

				if (r.statusCode !== 200) {
					const e = ErrorHandler(r.statusCode);
					if (!e) throw new TypeError(`Non 200-OK status code returned from api: ${r.statusCode} ${r.statusMessage}`);
					else throw new TypeError(e);
				}

				let b;
				try {
					b = JSON.parse(r.body.toString());
				} catch (e) {
					throw new TypeError(`Error parsing JSON body: ${e.stack}`);
				}

				this.debug(`${this.options.baseURL}/${API_VERSION}/furry/${cat}`, { start, end, time: parseFloat((end - start).toFixed(2)) });

				return amount === 1 ? b.images[0] as JSONResponse : b.images as JSONResponse[];
				break;
			}
		}
	}

	get boop(): typeof f { return this.sendRequest.bind(this, "boop"); }
	get cuddle(): typeof f { return this.sendRequest.bind(this, "cuddle"); }
	get flop(): typeof f { return this.sendRequest.bind(this, "flop"); }
	get fursuit(): typeof f { return this.sendRequest.bind(this, "fursuit"); }
	get hold(): typeof f { return this.sendRequest.bind(this, "hold"); }
	get howl(): typeof f { return this.sendRequest.bind(this, "howl"); }
	get hug(): typeof f { return this.sendRequest.bind(this, "hug"); }
	get kiss(): typeof f { return this.sendRequest.bind(this, "kiss"); }
	get lick(): typeof f { return this.sendRequest.bind(this, "lick"); }
	get propose(): typeof f { return this.sendRequest.bind(this, "propose"); }
	get butts(): typeof f { return this.sendRequest.bind(this, "butts"); }
	get bulge(): typeof f { return this.sendRequest.bind(this, "bulge"); }
	get yiff() { return new YIFF(this.options); }

	private get debug() { return this.options.debug; }
}
