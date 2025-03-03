import eventEmitter from "../config/events.config.js";
import Analytics from "../models/analytic.model.js";


eventEmitter.on("link-created", async (data) => {

  const tag = "[link-created.job.js][link-created]";
  console.log(`${tag} Link created event received`);

  try {
    await Analytics.create({ type: "link" });
  } catch (error) {
    console.error("Error while creating analytics for link creation:", error);
  }
  
});