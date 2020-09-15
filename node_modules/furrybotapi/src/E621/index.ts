import { USER_AGENT } from "../util/Constants";
import { Options } from "../typings";


export default class E621 {
	options: Options;
	constructor(d?: Partial<Options>) {
		if (!d) d = {};
		this.options = {
			userAgent: d.userAgent || USER_AGENT,
			apiKey: d.apiKey || "",
			debug: d.debug || (() => null)
		};
	}

	// e621 reverse image function has been removed, find a library for saucenao.com or something

	private get debug() { return this.options.debug; }
}
