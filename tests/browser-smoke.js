// Optional, manually invoked smoke check. No viewport matrix or automatic screenshots.
async (page) => {
  const origin = 'http://127.0.0.1:4321';
  const checks = [];
  function assert(value, message) {
    if (!value) throw new Error(message);
    checks.push(message);
  }
  await page.goto(origin + '/');
  const entries = page.locator('.journal-entry');
  assert(await page.locator('h1').count() === 1, 'Homepage has one main heading');
  assert(await page.locator('.preview-note, #journal-help, .nav-github').count() === 0, 'Removed header and keyboard prompts stay removed');
  assert(await page.locator('.footer-meta').count() === 0, 'Footer slogans and deployment notice stay removed');
  if (await entries.count() === 0) {
    assert(await page.locator('.journal-header, .note-level-guide, .journal-empty').count() === 0, 'Empty homepage adds no headings or filler prompts');
    await page.locator('#main').focus();
    await page.keyboard.press('ArrowDown');
    assert(await entries.count() === 0, 'Keyboard selection handles an empty journal');
  } else {
    const href = await entries.first().getAttribute('href');
    await page.locator('#main').focus();
    await page.keyboard.press('ArrowDown');
    assert(await entries.first().evaluate(element => element === document.activeElement), 'Keyboard enters article list');
    await page.keyboard.press('Enter');
    await page.waitForURL(origin + href);
    assert(await page.locator('.post').isVisible(), 'Handwritten article opens');
    await page.keyboard.press('Escape');
    await page.waitForURL(/\/#entry-/);
  }
  const removed = await page.request.get(origin + '/posts/new-computer-starter/');
  assert(removed.status() === 404, 'Withdrawn agent article route is unavailable');
  await page.goto(origin + '/toolbox/');
  const tools = page.locator('.tool-item');
  const total = await tools.count();
  assert(total === 34, 'Toolbox has 34 approved tools');
  assert(await page.locator('.archive-section, .archive-details').count() === 0, 'Supplementary section stays removed');
  assert(await page.locator('.tool-title img').count() === 3, 'Only provenance-verified icons are displayed');
  for (const name of ['酷安', 'F-Droid', 'OpenCode', 'Tailscale']) {
    assert(await page.getByRole('heading', { name, exact: true }).count() === 0, `${name} stays removed`);
  }
  for (const name of ['Clash Verge Rev', 'res-downloader']) {
    await page.locator('#tool-search').fill(name);
    assert(await page.locator('.tool-item:visible').count() === 1, `${name} is searchable`);
  }
  await page.locator('#tool-search').fill('nonexistent-check-term');
  assert(await page.locator('#empty-state').isVisible(), 'Empty search has a recovery action');
  await page.locator('#reset-filters').click();
  assert(await page.locator('.tool-item:visible').count() === total, 'Reset restores tools');
  await page.goto(origin + '/');
  return { passed: checks.length, checks };
}
