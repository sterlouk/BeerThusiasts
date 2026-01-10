import fs from 'fs';
import path from 'path';

// Check what statements are being extracted
const dummyDataPath = path.join(process.cwd(), 'dummy_data.sql');
console.log(`File path: ${dummyDataPath}`);

try {
  const dummyContent = fs.readFileSync(dummyDataPath, 'utf-8');
  console.log(`File size: ${dummyContent.length} bytes`);
  console.log(`First 100 chars: ${dummyContent.substring(0, 100)}`);

  const allStatements = dummyContent.split(';');
  console.log(`Total split statements: ${allStatements.length}`);
  
  const dummyStatements = allStatements
    .map(stmt => stmt.trim())
    .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

  console.log(`After filter: ${dummyStatements.length}`);

  // Show statements related to orderhasbeer
  dummyStatements.forEach((stmt, idx) => {
    if (stmt.includes('orderhasbeer')) {
      console.log(`\n[${idx}] ${stmt.substring(0, 150)}...`);
    }
  });
} catch (error) {
  console.error(`Error: ${error.message}`);
}
