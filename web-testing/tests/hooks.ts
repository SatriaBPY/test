import { attachment } from "allure-js-commons";
import { test } from "../src/fixture";
import fs from "fs";

test.afterEach(async ({ page }, testInfo) => {
  const video = page.video();
  if (!video) return;

  const videoPath = await video.path();
  
  console.log(`Video path: ${videoPath}`)

  if (videoPath && fs.existsSync(videoPath)) {
    await attachment(
      `Video - ${testInfo.title}`,
      fs.readFileSync(videoPath),
      "video/webm"
    );
  }
});
