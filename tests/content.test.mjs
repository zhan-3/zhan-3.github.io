import { readFileSync, readdirSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';
import test from 'node:test';

const postsDirectory = new URL('../src/content/posts/', import.meta.url);

test('handwritten notes may be empty; existing notes have required metadata', () => {
  const files = readdirSync(postsDirectory).filter(file => file.endsWith('.md'));
  for (const file of files) {
    const content = readFileSync(new URL(file, postsDirectory), 'utf8');
    const metadata = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    assert.ok(metadata, file);
    for (const field of ['title', 'date', 'topic', 'description', 'draft']) {
      assert.match(metadata[1], new RegExp(`^${field}:`, 'm'), `${file}: ${field}`);
    }
    assert.match(metadata[1], /^date: "\d{4}-\d{2}-\d{2}"$/m);
  }
});

test('withdrawn agent draft stays outside the public article collection', () => {
  assert.ok(!existsSync(new URL('new-computer-starter.md', postsDirectory)));
});

test('local exam, reference drafts and raw inventory are not public assets', () => {
  function walk(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const url = new URL(entry.name + (entry.isDirectory() ? '/' : ''), directory);
      if (entry.isDirectory()) walk(url);
      else {
        assert.ok(!entry.name.toLowerCase().endsWith('.pdf'), 'Local source PDF is not published');
        assert.ok(!entry.name.includes('software-inventory'), 'Local installation inventory is not published');
        assert.ok(!entry.name.includes('agent-draft'), 'Reference manuscript is not published');
      }
    }
  }
  walk(new URL('../public/', import.meta.url));
});
