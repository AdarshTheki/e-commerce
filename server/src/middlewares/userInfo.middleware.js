import { UAParser } from "ua-parser-js";

export const userInfo = async (req, res, next) => {
  try {
    if (req.session) {
      const parser = new UAParser();
      const userAgent = req.headers["user-agent"];
      const ip =
        req.headers["x-forwarded-for"] || req.socket.remoteAddress || "Unknown";
      const uaResult = parser.setUA(userAgent).getResult();

      // Add metadata or update existing session metadata
      req.session.metadata = {
        device: uaResult.device.type || "desktop",
        browser: uaResult.browser.name || "Unknown",
        os: uaResult.os.name || "Unknown",
        ip,
      };
    }
    next();
  } catch (error) {
    res.status(505).json({ message: error.message, status: false });
  }
};
