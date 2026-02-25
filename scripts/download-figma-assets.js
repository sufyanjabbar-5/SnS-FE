import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Assets to download
const assets = {
  // Hero Section
  heroImage: 'https://www.figma.com/api/mcp/asset/029a9dc1-12e1-4061-b399-12c9723390ed',
  
  // Instructor
  instructorImage: 'https://www.figma.com/api/mcp/asset/a6a7a0a0-d854-47f5-9809-221e2f7eef47',
  
  // Testimonials
  testimonial1: 'https://www.figma.com/api/mcp/asset/e2e7458f-6da6-4d1a-b112-7722f2bebc11',
  testimonial2: 'https://www.figma.com/api/mcp/asset/4a077c3d-4469-4624-82f4-6b2675400087',
  testimonial3: 'https://www.figma.com/api/mcp/asset/e2e7458f-6da6-4d1a-b112-7722f2bebc11',
  
  // Icons
  calendarIcon: 'https://www.figma.com/api/mcp/asset/1909e75e-7202-4927-b7f7-f8a4b894cdc3',
  clockIcon: 'https://www.figma.com/api/mcp/asset/1fddabd0-2ecb-4de1-ba4e-7dd777b358a4',
  usersIcon: 'https://www.figma.com/api/mcp/asset/488d5d3e-4580-4ecb-b605-fe1540cc3f8b',
  arrowRightIcon: 'https://www.figma.com/api/mcp/asset/fefe70d7-f907-4bb6-9ba9-a426245a9d10',
  downloadIcon: 'https://www.figma.com/api/mcp/asset/02801b1c-6430-469c-9dc7-780ec6a237fc',
  checkIcon: 'https://www.figma.com/api/mcp/asset/1d87891b-aea2-4762-b3cc-800b73995b45',
  questionIcon: 'https://www.figma.com/api/mcp/asset/ce9547a6-3d94-42a5-be98-86e38c66bad3',
  chevronIcon: 'https://www.figma.com/api/mcp/asset/c2192bdb-725d-4121-819a-4c4612e8718a',
  
  // Batches Section Icons
  classDetailsArrowIcon: 'https://www.figma.com/api/mcp/asset/6f0aea40-104b-4f57-8ef0-5f315d1f40c1',
  weekendClassIcon: 'https://www.figma.com/api/mcp/asset/9d7cfa5a-5527-406b-a4f7-9b9b648bf669',
  timeIcon: 'https://www.figma.com/api/mcp/asset/91050f72-b9d4-47da-8638-1fd5710bf9ca',
  enrollArrowIcon: 'https://www.figma.com/api/mcp/asset/e4d541e4-37ee-4b0e-80de-5ec590af47ec',
  sellingFastIcon: 'https://www.figma.com/api/mcp/asset/07a228eb-e55a-4f1b-bb14-81caf687068f',
  timezoneChevronIcon: 'https://www.figma.com/api/mcp/asset/a67ef1bb-3927-4ae8-adf1-5be56d544d84',
  
  // About Section Icons
  aboutIcon1: 'https://www.figma.com/api/mcp/asset/90a6c1d3-afe0-4732-a1bb-07fc9d67d666',
  aboutIcon2: 'https://www.figma.com/api/mcp/asset/0532c612-7530-4446-932c-27f2ecba0a41',
  aboutIcon3: 'https://www.figma.com/api/mcp/asset/e91c5b41-b0ff-42c5-bdaf-1ceee83b0aeb',
  
  // Audience Icons
  audienceIcon1: 'https://www.figma.com/api/mcp/asset/4583575c-90aa-427a-875b-9513658234c3',
  audienceIcon2: 'https://www.figma.com/api/mcp/asset/54320e36-4158-40ce-86c7-a7ae2d026c6d',
  audienceIcon3: 'https://www.figma.com/api/mcp/asset/3121fc75-1301-46c2-910a-e9acb76f6b08',
  audienceIcon4: 'https://www.figma.com/api/mcp/asset/0ca22ad2-a8ec-407b-a7a0-315d21467581',
  audienceIcon5: 'https://www.figma.com/api/mcp/asset/206c0f11-243c-4419-9078-fdce364f724a',
  audienceIcon6: 'https://www.figma.com/api/mcp/asset/bd715a83-dc06-4c1a-afbd-467754ad3bdb',
  audienceIcon7: 'https://www.figma.com/api/mcp/asset/3ea5090c-c75e-4544-97e0-d352bc93c982',
  audienceIcon8: 'https://www.figma.com/api/mcp/asset/5ad78cfe-ace2-4d5b-8487-f860b5de4ebf',
  
  // Schedule Icons
  scheduleCheckIcon: 'https://www.figma.com/api/mcp/asset/a72237b9-fbeb-4655-b2ef-3f6f65e4e8c5',
  
  // Experience Icons
  experienceCheckIcon: 'https://www.figma.com/api/mcp/asset/fcec6cae-1195-4b54-ae5b-1cdc7e335f3f',
  experienceCheckIcon2: 'https://www.figma.com/api/mcp/asset/bbcde936-ba0d-41bb-b845-4250e7df3337',
  
  // FAQ Icons
  faqQuestionIcon: 'https://www.figma.com/api/mcp/asset/9a3a5e58-e5fe-4eb7-8893-2ca8e9d43a86',
  faqChevronIcon: 'https://www.figma.com/api/mcp/asset/33f11acf-1292-49d1-b500-a9d2ae31e553',
  
  // Star Icon
  starIcon: 'https://www.figma.com/api/mcp/asset/5287b4d3-0128-4abc-94fa-15f128f41a9f',
  
  // Badge Icon
  badgeIcon: 'https://www.figma.com/api/mcp/asset/7db57766-4d01-4cf6-ad8f-7a105b285ea3',
  
  // Contact Form Icons
  contactPhoneIcon: 'https://www.figma.com/api/mcp/asset/78b4c227-f1b3-48d2-9b3a-15131f80beb7',
  contactEmailIcon: 'https://www.figma.com/api/mcp/asset/889ca9dd-08f3-422d-815a-e471c4539c98',
  contactChatIcon: 'https://www.figma.com/api/mcp/asset/06ad62c0-3162-4ab0-9f05-5453cbdc18d0',
  contactLocationIcon: 'https://www.figma.com/api/mcp/asset/e5a0aeed-5a04-4bce-b91f-555544b98d9e',
  contactButtonIcon: 'https://www.figma.com/api/mcp/asset/d1ba28ec-cf62-4881-8d48-1b57df0292c8',
  contactCheckIcon: 'https://www.figma.com/api/mcp/asset/8c7c64ef-34cd-4371-85cb-ef3ccf0e7cec',
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
  console.log('Starting download of Figma assets...\n');
  
  const results = [];
  
  for (const [key, url] of Object.entries(assets)) {
    try {
      // Determine file extension (most Figma assets are PNG, but some might be SVG)
      // We'll try to get the content type from the response
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
