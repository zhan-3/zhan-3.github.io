import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import test from 'node:test';

const data = JSON.parse(readFileSync(new URL('../data.json', import.meta.url), 'utf8'));
const retainedOriginalNames = [
  'GitHub', 'Visual Studio Code', 'CC Switch', 'firecrawl', 'Google Play', 'Telegram',
  'Chrome', 'Cloudflare', '缺失的计算机基础', '语雀', 'WinRAR', 'Everything', '格式工厂',
  '图吧工具箱', 'Windows 文件管理器', 'ZArchiver', 'Microsoft Authenticator',
  'Internet Download Manager', 'PotPlayer',
];

test('recommendations have valid unique HTTPS links, categories and local icons', () => {
  const categories = new Set(data.categories.map(category => category.id));
  const names = new Set();
  const urls = new Set();
  for (const item of data.items) {
    assert.ok(item.name && item.desc && item.tags.length);
    assert.ok(categories.has(item.cat), item.name);
    assert.equal(new URL(item.url).protocol, 'https:');
    assert.ok(!names.has(item.name.toLowerCase()), `Duplicate name: ${item.name}`);
    const canonical = new URL(item.url).href.replace(/\/$/, '');
    assert.ok(!urls.has(canonical), `Duplicate URL: ${item.url}`);
    names.add(item.name.toLowerCase());
    urls.add(canonical);
    if (item.icon) assert.ok(existsSync(new URL(`../${item.icon}`, import.meta.url)), item.icon);
  }
});

test('original recommendations are retained except user-requested removals', () => {
  const removed = new Set(['酷安', 'f-droid', 'opencode', 'tailscale']);
  const names = new Set(data.items.map(item => item.name.toLowerCase()));
  for (const name of retainedOriginalNames) assert.ok(names.has(name.toLowerCase()), name);
  for (const name of removed) assert.ok(!names.has(name), name);
  assert.ok(!('external' in data));
  assert.ok(!('notes' in data));
});

test('supplementary tools are promoted into searchable categories without duplicate lists', () => {
  for (const [name, url] of Object.entries({
    'Clash Verge Rev': 'https://github.com/clash-verge-rev/clash-verge-rev',
    'res-downloader': 'https://github.com/putyy/res-downloader',
  })) {
    assert.equal(data.items.find(item => item.name === name)?.url, url);
  }
  assert.equal(data.items.find(item => item.name === 'Clash Verge Rev')?.cat, 'network');
  assert.equal(data.items.find(item => item.name === 'res-downloader')?.cat, 'sys');
});

test('verified icons have a software identity, official source and matching local hash', () => {
  const sources = JSON.parse(readFileSync(new URL('../icons/sources.json', import.meta.url), 'utf8'));
  for (const [path, source] of Object.entries(sources)) {
    assert.equal(source.status, 'verified');
    assert.equal(new URL(source.sourceUrl).protocol, 'https:');
    assert.ok(source.verifiedAt && source.transform);
    assert.equal(data.items.find(item => item.icon === path)?.name, source.software);
    const hash = createHash('sha256').update(readFileSync(new URL(`../${path}`, import.meta.url))).digest('hex');
    assert.equal(hash, source.sha256, path);
  }
});

test('base utilities are not added just because they were scanned', () => {
  const names = new Set(data.items.map(item => item.name.toLowerCase()));
  for (const name of ['Git', 'GitHub CLI', 'Windows Terminal', 'ripgrep', 'jq']) {
    assert.ok(!names.has(name.toLowerCase()), name);
  }
});

test('new additions use reviewed official destinations', () => {
  const official = {
    '7-Zip': 'https://www.7-zip.org/',
    PixPin: 'https://pixpin.cn/',
    Pi: 'https://pi.dev/',
    Playwright: 'https://playwright.dev/',
    'Browser Use': 'https://browser-use.com/',
    'Chrome DevTools': 'https://developer.chrome.com/docs/devtools/',
    PCL2: 'https://github.com/Meloong-Git/PCL',
    PowerToys: 'https://learn.microsoft.com/zh-cn/windows/powertoys/',
    Obsidian: 'https://obsidian.md/',
    Anki: 'https://apps.ankiweb.net/',
    'OBS Studio': 'https://obsproject.com/',
    'Thorium Reader': 'https://thorium.edrlab.org/en/',
    UniGetUI: 'https://devolutions.net/unigetui/',
  };
  for (const [name, url] of Object.entries(official)) {
    assert.equal(data.items.find(item => item.name === name)?.url, url);
  }
});
