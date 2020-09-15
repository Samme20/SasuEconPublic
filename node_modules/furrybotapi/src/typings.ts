import { Transform as Stream } from "stream";

declare namespace FurryBotAPI {
	type OmitFirstArg<F> = F extends (x: any, ...args: infer P) => infer R ? (...args: P) => R : never;

	function f(method: "image"): Promise<ImageResponse>;
	function f(method: "json", amount: 1): Promise<JSONResponse>;
	function f(method: "json", amount?: 2 | 3 | 4 | 5): Promise<JSONResponse[]>;
	function f(method?: "image" | "json", amount?: 1 | 2 | 3 | 4 | 5): Promise<ImageResponse | JSONResponse[]>;

	type YiffEndpoints = "dickgirl" | "gay" | "lesbian" | "straight";
	type FurryEndpoints = "boop" | "cuddle" | "flop" | "fursuit" | "hold" | "howl" | "hug" | "kiss" | "lick" | "propose" | "butts" | "bulge";
	type AnimalEndpoints = "birb" | "blep" | "cheeta" | "fox" | "lynx" | "wolf";

	interface Options {
		userAgent?: string;
		apiKey?: string;
		debug?: (url: string, time: {
			start: number;
			end: number;
			time: number;
		}) => any;
		baseURL?: string;
	}

	interface JSONResponse {
		artists: string[];
		sources: string[];
		width: number;
		height: number;
		url: string;
		type: string;
		name: string;
		shortURL: string;
		reportURL: string;
		ext: string;
	}

	interface ImageResponse {
		data: JSONResponse;
		image: Buffer;
	}

	interface E621Post {
		id: number;
		tags: string;
		locked_tags?: string;
		description: string;
		created_at: {
			json_class: string;
			s: number;
			n: number;
		};
		creator_id: number;
		author: string;
		change: number;
		source: string;
		score: number;
		fav_count: number;
		md5: string;
		file_size: number;
		file_url: string;
		file_ext: string;
		preview_url: string;
		preview_width: number;
		preview_height: number;
		sample_url: string;
		sample_width: number;
		sample_height: number;
		rating: "s" | "q" | "e";
		status: "active" | "deleted" | string;
		width: number;
		height: number;
		has_comments: boolean;
		has_notes: boolean;
		has_childeren: boolean;
		childeren: string;
		parent_id?: number;
		artist: string[];
		sources: string[];
	}
}
export = FurryBotAPI;
