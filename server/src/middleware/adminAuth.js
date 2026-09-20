export default function adminAuth(req, res, next) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  
  if (!adminPassword) {
    console.error("ADMIN_PASSWORD environment variable is not set.");
    return res.status(500).json({ error: "Server misconfiguration." });
  }

  const providedPassword = req.headers["x-admin-password"];

  if (!providedPassword || providedPassword !== adminPassword) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
}
