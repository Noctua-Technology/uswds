import { assert } from '@open-wc/testing';

import { filenameFromResponse } from './filename.js';

describe('filenameFromResponse', () => {
  it('parses filename* with charset and percent-encoding from a Response', () => {
    const res = new Response(null, {
      headers: { 'content-disposition': "attachment; filename*=UTF-8''photo%20new.jpg" },
    });

    assert.equal(filenameFromResponse(res), 'photo new.jpg');
  });

  it('parses quoted filename from a Response', () => {
    const res = new Response(null, { headers: { 'content-disposition': 'attachment; filename="photo.jpg"' } });
    assert.equal(filenameFromResponse(res), 'photo.jpg');
  });

  it('parses unquoted filename from a Response', () => {
    const res = new Response(null, { headers: { 'content-disposition': 'attachment; filename=photo.jpg' } });
    assert.equal(filenameFromResponse(res), 'photo.jpg');
  });

  it('returns fallback when no filename present in Response', () => {
    const res = new Response(null, { headers: { 'content-disposition': 'attachment; foo=bar' } });
    assert.equal(filenameFromResponse(res), 'downloaded-file');
  });
});
