import ratelimit from "../config/upstash.js";

const rateLimiter=async (req,res,next)=>{
     try {
        const {success}=await ratelimit.limit("my-limit-key");
        if(!success){
            return res.status(429).json({
                message:"Too many requests, please try again later",

            })
        }
        next();
     } catch (error) {
        // A rate limiter outage shouldn't take the notes down with it.
        console.error("Rate limit check failed, allowing the request:",error.message);
        next();
     }
};


export default rateLimiter;