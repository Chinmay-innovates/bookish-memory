import { Ratelimit } from "@upstash/ratelimit";
import {
	type NextFetchEvent,
	type NextRequest,
	NextResponse,
} from "next/server";
import { redis } from "~/db/redis";
// Create a new ratelimiter, that allows 10 requests per 10 seconds
export const ratelimit = new Ratelimit({
	redis,
	limiter: Ratelimit.fixedWindow(5, "1m"),
	/**
	 * Optional prefix for the keys used in redis. This is useful if you want to share a redis
	 * instance with other applications and want to avoid key collisions. The default prefix is
	 * "@upstash/ratelimit"
	 */
	prefix: "@upstash/ratelimit",
	ephemeralCache: new Map(),
	analytics: true,
});

export default async function middleware(
	request: NextRequest,
	context: NextFetchEvent
): Promise<Response | undefined> {
	const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";

	const { success, pending, limit, remaining } = await ratelimit.limit(ip);
	// we use context.waitUntil since analytics: true.
	// see https://upstash.com/docs/oss/sdks/ts/ratelimit/gettingstarted#serverless-environments
	context.waitUntil(pending);

	const res = success
		? NextResponse.next()
		: NextResponse.redirect(new URL("/api/blocked", request.url));

	res.headers.set("X-RateLimit-Success", success.toString());
	res.headers.set("X-RateLimit-Limit", limit.toString());
	res.headers.set("X-RateLimit-Remaining", remaining.toString());

	return res;
}

export const config = {
	matcher: "/api",
};
