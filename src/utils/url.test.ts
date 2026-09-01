import { describe, expect, it } from 'vitest';

import { ensureTrailingSlash, joinUrl, stripTrailingSlash } from './url';

const PAGES = 'https://beingmesunil.github.io/mypersonalwebsite';
const ROOT = 'https://lumenstudio.example.com';

describe('joinUrl', () => {
  it('keeps the base path of a project site', () => {
    expect(joinUrl(PAGES, '/portfolio')).toBe(`${PAGES}/portfolio`);
  });

  it('renders the home page as the base with a trailing slash', () => {
    expect(joinUrl(PAGES, '/')).toBe(`${PAGES}/`);
    expect(joinUrl(PAGES, '')).toBe(`${PAGES}/`);
  });

  it('works for a domain served from the root', () => {
    expect(joinUrl(ROOT, '/blog/one-light')).toBe(`${ROOT}/blog/one-light`);
  });

  it('does not double up slashes', () => {
    expect(joinUrl(`${PAGES}/`, '/contact')).toBe(`${PAGES}/contact`);
  });
});

describe('ensureTrailingSlash', () => {
  it('adds a missing slash and leaves an existing one alone', () => {
    expect(ensureTrailingSlash('/mypersonalwebsite')).toBe('/mypersonalwebsite/');
    expect(ensureTrailingSlash('/mypersonalwebsite/')).toBe('/mypersonalwebsite/');
  });
});

describe('stripTrailingSlash', () => {
  it('strips a trailing slash for use as a router basename', () => {
    expect(stripTrailingSlash('/mypersonalwebsite/')).toBe('/mypersonalwebsite');
  });

  it('keeps the root as a single slash', () => {
    expect(stripTrailingSlash('/')).toBe('/');
  });
});
