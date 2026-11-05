import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";
dotenv.config();

const ratelimit=new Ratelimit({
    redis:Redis.fromEnv({retry:{retries:1}}),
    limiter:Ratelimit.slidingWindow(100,"60 s"),
    // Never let the rate limit check hold up a request for long.
    timeout:1000,
})

export default ratelimit;