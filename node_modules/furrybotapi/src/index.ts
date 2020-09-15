import { Options } from "./typings";
import { USER_AGENT, API_URL } from "./util/Constants";
import Animals from "./Animals";
import Furry from "./Furry";
import E621 from "./E621";

export default class FurryBotAPI {
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

	get animals() { return new Animals(this.options); }
	get furry() { return new Furry(this.options); }
	get e621() { return new E621(this.options); }

	private get debug() { return this.options.debug; }
}
