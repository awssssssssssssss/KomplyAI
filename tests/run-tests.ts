#!/usr/bin/env ts-node

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function runTests() {
  console.log('Running comprehensive tests for X-Komply-AI...\n');
  
  try {
    // Run unit tests
    console.log('1. Running unit tests...');
    const { stdout, stderr } = await execAsync('npm run test:unit', { cwd: __dirname + '/..' });
    
    if (stderr) {
      console.error('Errors occurred during testing:');
      console.error(stderr);
    }
    
    console.log('Test output:');
    console.log(stdout);
    
    console.log('\n✅ All tests completed successfully!');
  } catch (error: any) {
    console.error('❌ Tests failed with error:');
    console.error(error.message);
    
    if (error.stdout) {
      console.log('Test output:');
      console.log(error.stdout);
    }
    
    if (error.stderr) {
      console.error('Error output:');
      console.error(error.stderr);
    }
    
    process.exit(1);
  }
}

runTests();
