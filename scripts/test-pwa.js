#!/usr/bin/env node

/**
 * PWA Test Script
 *
 * This script tests if all PWA files are accessible and correctly configured.
 * Run after starting the dev or production server.
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';
const USE_HTTPS = BASE_URL.startsWith('https');
const requester = USE_HTTPS ? https : http;

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
    console.log(colors[color] + message + colors.reset);
}

function checkFile(filePath) {
    const fullPath = path.join(__dirname, '..', 'public', filePath);
    return fs.existsSync(fullPath);
}

function testUrl(url, expectedContentType, description) {
    return new Promise((resolve) => {
        const fullUrl = BASE_URL + url;
        log(`\n🔍 Testing: ${description}`, 'cyan');
        log(`   URL: ${fullUrl}`, 'blue');

        requester.get(fullUrl, (res) => {
            const { statusCode, headers } = res;
            const contentType = headers['content-type'] || '';

            if (statusCode === 200) {
                log(`   ✅ Status: ${statusCode}`, 'green');
            } else {
                log(`   ❌ Status: ${statusCode}`, 'red');
            }

            if (expectedContentType && contentType.includes(expectedContentType)) {
                log(`   ✅ Content-Type: ${contentType}`, 'green');
            } else if (expectedContentType) {
                log(`   ⚠️  Content-Type: ${contentType} (expected: ${expectedContentType})`, 'yellow');
            } else {
                log(`   ℹ️  Content-Type: ${contentType}`, 'blue');
            }

            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                const dataLength = data.length;
                if (dataLength > 0) {
                    log(`   ✅ Content Length: ${dataLength} bytes`, 'green');
                } else {
                    log(`   ⚠️  Content Length: 0 bytes`, 'yellow');
                }

                resolve({
                    url: fullUrl,
                    status: statusCode,
                    contentType,
                    dataLength,
                    success: statusCode === 200 && dataLength > 0,
                });
            });
        }).on('error', (err) => {
            log(`   ❌ Error: ${err.message}`, 'red');
            resolve({
                url: fullUrl,
                status: 0,
                error: err.message,
                success: false,
            });
        });
    });
}

async function runTests() {
    log('\n╔══════════════════════════════════════╗', 'cyan');
    log('║     PWA Test Suite for Naqlah      ║', 'cyan');
    log('╚══════════════════════════════════════╝\n', 'cyan');

    log(`Testing server at: ${BASE_URL}\n`, 'blue');

    // File existence checks
    log('📁 Checking Local Files:', 'cyan');
    const filesToCheck = [
        'sw.js',
        'manifest.json',
        'assets/icons/icon-192x192.png',
        'assets/icons/icon-512x512.png',
    ];

    filesToCheck.forEach((file) => {
        const exists = checkFile(file);
        if (exists) {
            log(`   ✅ ${file}`, 'green');
        } else {
            log(`   ❌ ${file} (not found)`, 'red');
        }
    });

    // Wait a moment for server to be ready
    await new Promise(resolve => setTimeout(resolve, 1000));

    // URL accessibility checks
    log('\n🌐 Checking URL Accessibility:', 'cyan');

    const tests = [
        { url: '/', contentType: 'text/html', description: 'Home Page' },
        { url: '/sw.js', contentType: 'javascript', description: 'Service Worker' },
        { url: '/manifest.json', contentType: 'json', description: 'PWA Manifest' },
        { url: '/offline', contentType: 'text/html', description: 'Offline Page' },
        { url: '/assets/icons/icon-192x192.png', contentType: 'image', description: 'App Icon 192x192' },
        { url: '/assets/icons/icon-512x512.png', contentType: 'image', description: 'App Icon 512x512' },
    ];

    const results = [];
    for (const test of tests) {
        const result = await testUrl(test.url, test.contentType, test.description);
        results.push(result);
    }

    // Summary
    log('\n╔══════════════════════════════════════╗', 'cyan');
    log('║          Test Summary               ║', 'cyan');
    log('╚══════════════════════════════════════╝\n', 'cyan');

    const passed = results.filter((r) => r.success).length;
    const failed = results.filter((r) => !r.success).length;

    log(`✅ Passed: ${passed}`, 'green');
    log(`❌ Failed: ${failed}`, failed > 0 ? 'red' : 'green');
    log(`📊 Total: ${results.length}`, 'blue');

    if (failed === 0) {
        log('\n🎉 All PWA tests passed! Your PWA is ready! 🎉\n', 'green');
    } else {
        log('\n⚠️  Some tests failed. Please check the output above.\n', 'yellow');
    }

    // Additional checks
    log('\n📋 Additional Recommendations:', 'cyan');
    log('   • Test on a real mobile device over HTTPS', 'blue');
    log('   • Run Lighthouse audit in Chrome DevTools', 'blue');
    log('   • Test offline functionality', 'blue');
    log('   • Verify install prompt appears (wait 3 seconds)', 'blue');
    log('   • Check service worker registration in DevTools', 'blue');

    log('\n💡 To test with a different URL:', 'yellow');
    log('   TEST_URL=https://your-domain.com node scripts/test-pwa.js\n', 'yellow');
}

// Run tests
runTests().catch((err) => {
    log(`\n❌ Fatal error: ${err.message}\n`, 'red');
    process.exit(1);
});

