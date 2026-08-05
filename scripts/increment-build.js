import fs from 'fs';
import path from 'path';

const buildInfoPath = path.join(process.cwd(), 'src', 'buildInfo.json');

try {
  let buildNumber = 50;
  if (fs.existsSync(buildInfoPath)) {
    const raw = fs.readFileSync(buildInfoPath, 'utf-8');
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.buildNumber === 'number') {
      buildNumber = parsed.buildNumber + 1;
    }
  }

  const newBuildInfo = {
    buildNumber,
    timestamp: new Date().toISOString()
  };

  fs.writeFileSync(buildInfoPath, JSON.stringify(newBuildInfo, null, 2), 'utf-8');
  console.log(`[Build Script] Incremented build counter to #${buildNumber}`);
} catch (error) {
  console.error('[Build Script] Error updating build version:', error);
}
