import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// New assets from the Corporate Portfolio design
const assets = {
  // Hero Section
  heroImageNew: 'https://www.figma.com/api/mcp/asset/c263d118-1858-4389-8a16-a677ec6c6487',
  heroBadgeIcon: 'https://www.figma.com/api/mcp/asset/d5a6d913-556d-47f2-8d41-82016514541c',
  heroArrowIcon: 'https://www.figma.com/api/mcp/asset/89abb17d-71ef-461b-840e-3237fa3b3081',
  heroDownloadIcon: 'https://www.figma.com/api/mcp/asset/3e6993e9-f1bd-4f2c-be16-703cc9e45c91',
  
  // Who Is This Course For Icons
  enterpriseIcon: 'https://www.figma.com/api/mcp/asset/6a0e2e55-7e2d-4799-ab23-f30b2b94b7aa',
  publicSectorIcon: 'https://www.figma.com/api/mcp/asset/35662136-fa47-4442-91fb-579a74d58cc3',
  financeTechIcon: 'https://www.figma.com/api/mcp/asset/a54d9edd-51cf-4cf0-962d-578e09daedec',
  aiInitiativesIcon: 'https://www.figma.com/api/mcp/asset/274d85a7-9d05-4802-8269-c6f80ae34dfb',
  
  // What We Enable Icons
  portfolioIcon: 'https://www.figma.com/api/mcp/asset/1d896a5f-b26d-498e-bbdb-dee2f1af8038',
  riskIcon: 'https://www.figma.com/api/mcp/asset/f63c3b75-68b7-4809-860c-68ac9ee6628e',
  programIcon: 'https://www.figma.com/api/mcp/asset/3fb8f424-9791-4bfc-9847-99fa870e68bb',
  aiManagementIcon: 'https://www.figma.com/api/mcp/asset/307208c1-533b-4769-ab1c-de6a5bd9320e',
  pmoIcon: 'https://www.figma.com/api/mcp/asset/98d3e416-043d-4353-b9b2-dd0381b44b76',
};

const assetsDir = path.join(__dirname, '..', 'public', 'assets', 'live-virtual-classes');

// Create directory if it doesn't exist
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadFile(response.headers.location, filepath)
          .then(resolve)
          .catch(reject);
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function downloadAllAssets() {
  console.log('Starting download of new Figma assets...\n');
  
  const results = [];
  
  for (const [key, url] of Object.entries(assets)) {
    try {
      const filename = `${key}.png`;
      const filepath = path.join(assetsDir, filename);
      
      console.log(`Downloading ${key}...`);
      await downloadFile(url, filepath);
      
      // Check if it's actually an SVG by reading first bytes
      const buffer = fs.readFileSync(filepath);
      const isSvg = buffer.toString('utf8', 0, Math.min(100, buffer.length)).includes('<svg');
      
      if (isSvg) {
        const svgPath = path.join(assetsDir, `${key}.svg`);
        fs.renameSync(filepath, svgPath);
        results.push({ key, path: `/assets/live-virtual-classes/${key}.svg`, success: true });
        console.log(`  ✓ Saved as ${key}.svg\n`);
      } else {
        results.push({ key, path: `/assets/live-virtual-classes/${key}.png`, success: true });
        console.log(`  ✓ Saved as ${key}.png\n`);
      }
    } catch (error) {
      console.error(`  ✗ Failed to download ${key}: ${error.message}\n`);
      results.push({ key, path: null, success: false, error: error.message });
    }
  }
  
  console.log('\n=== Download Summary ===');
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`✓ Successfully downloaded: ${successful.length}`);
  console.log(`✗ Failed: ${failed.length}`);
  
  if (failed.length > 0) {
    console.log('\nFailed downloads:');
    failed.forEach(r => console.log(`  - ${r.key}: ${r.error}`));
  }
  
  return results;
}

downloadAllAssets().catch(console.error);
