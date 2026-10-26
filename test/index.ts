/**
 * neko-ts Test Script
 * -------------------
 * Exercises all four public methods and prints sample responses to stdout.
 * Use this as a reference for expected response structure.
 */

import NekoTs from '../src/index.js';

const neko = new NekoTs();

/**
 * Prints a separator line for visual clarity in the test output.
 */
function printHeader(title: string): void {
  console.log('═════════════════════════════════════════════════════════════════');
  console.log('                        neko-ts Test Suite');
  console.log('═════════════════════════════════════════════════════════════════');
  console.log(`▶ ${title}`);
  console.log('');
}

/**
 * Prints a standardized result block after a test attempt.
 */
function printResult(success: boolean, data?: unknown, error?: unknown): void {
  if (success) {
    console.log('  Status: ✅ Success');
    if (data !== undefined) {
      console.log('  Sample Response:');
      console.log(JSON.stringify(data, null, 2));
    }
  } else {
    console.log('  Status: ❌ Failed');
    if (error !== undefined) {
      console.log('  Error:', error);
    }
  }
  console.log('');
}

async function main(): Promise<void> {
  // 1. release()
  printHeader('Testing release() ...');
  try {
    const releases = await neko.release(1);
    printResult(true, releases.slice(0, 2));
    console.log('  Count:', releases.length);
  } catch (err) {
    printResult(false, undefined, err);
  }

  // 2. search()
  printHeader('Testing search("Akane") ...');
  try {
    const results = await neko.search('Akane');
    printResult(true, results.slice(0, 2));
    console.log('  Count:', results.length);
  } catch (err) {
    printResult(false, undefined, err);
  }

  // 3. search() validation
  printHeader('Testing search("") validation ...');
  try {
    await neko.search('');
    printResult(false, undefined, 'Should have thrown an error');
  } catch (err) {
    printResult(true, (err as Error).message);
  }

  // 4. get() - episode URL
  printHeader('Testing get(episode URL) ...');
  try {
    const episode = await neko.get(
      'https://nekopoi.care/akane-wa-tsumare-somerareru-episode-2-subtitle-indonesia/',
    );
    printResult(true, episode);
  } catch (err) {
    printResult(false, undefined, err);
  }

  // 5. get() empty URL validation
  printHeader('Testing get("") validation ...');
  try {
    await neko.get('');
    printResult(false, undefined, 'Should have thrown an error');
  } catch (err) {
    printResult(true, (err as Error).message);
  }

  // 6. get() invalid URL validation
  printHeader('Testing get("https://google.com") validation ...');
  try {
    await neko.get('https://google.com');
    printResult(false, undefined, 'Should have thrown an error');
  } catch (err) {
    printResult(true, (err as Error).message);
  }

  // 7. random()
  printHeader('Testing random() ...');
  try {
    const randomResult = await neko.random();
    printResult(true, randomResult);
  } catch (err) {
    printResult(false, undefined, err);
  }

  printHeader('Test Complete');
}

main().catch((err) => {
  console.error('Unhandled error:', err);
  process.exit(1);
});