import { UAParser } from "ua-parser-js";

export const userInfo = async (req, res, next) => {
  try {
    const parser = new UAParser();
    const userAgent = req.headers["user-agent"] || "Unknown";
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req.socket.remoteAddress ||
      "Unknown";

    const uaResult = parser.setUA(userAgent).getResult();

    // Attach metadata to the request object
    req.metadata = {
      device: uaResult.device.type || "desktop",
      browser: uaResult.browser.name || "Unknown",
      os: uaResult.os.name || "Unknown",
      ip,
      userAgent,
    };

    next();
  } catch (error) {
    res
      .status(500)
      .json({
        message: error.message || "Internal Server Error",
        status: false,
      });
  }
};
