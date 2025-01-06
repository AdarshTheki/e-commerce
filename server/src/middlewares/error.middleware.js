import { ApiError } from "../utils/ApiError.js";

export const errorHandler = async (err, req, res, next) => {
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            errors: err.errors,
        });
    } else {
        // Generic error
        console.log("error:", err?.message);
        res.status(500).json({
            success: false,
            message:
                err?.message || "Internal Server Error! middleware errorHandle",
        });
    }
};
