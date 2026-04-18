'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const {
  stripAiStandardsBlock,
  stripSectionCreBlocks,
  stripAllMachineBlocks,
} = require('../../scripts/opencre-enrich/markers');
const { verifyManualContentPreserved } = require('../../scripts/opencre-enrich/checkpoints');
const {
  makeInjectedBlock,
  injectTopicAiStandards,
  applyTopicAiEnrichment,
} = require('../../scripts/opencre-enrich/injection');
const { makeSectionCreBlock } = require('../../scripts/opencre-enrich/section-cre-inject');

const fixturesDir = path.join(__dirname, 'fixtures');

function readFixture(name) {
  return fs.readFileSync(path.join(fixturesDir, name), 'utf-8');
}

describe('opencre-enrich / markers', () => {
  it('stripAiStandardsBlock removes only the bounded machine block', () => {
    const md = readFixture('sample-with-machine-block.md');
    const stripped = stripAiStandardsBlock(md);
    assert.match(stripped, /Keep this manual line/);
    assert.doesNotMatch(stripped, /OPENCRE_AI_STANDARDS_START/);
  });

  it('stripSectionCreBlocks removes OPENCRE_SECTION_CRE pair', () => {
    const md = readFixture('sample-section-cre.md');
    const stripped = stripSectionCreBlocks(md);
    assert.doesNotMatch(stripped, /OPENCRE_SECTION_CRE/);
    assert.match(stripped, /Manual bullet stays/);
  });

  it('stripAllMachineBlocks strips both marker kinds', () => {
    const combined = `${readFixture('sample-with-machine-block.md')}\n${readFixture('sample-section-cre.md')}`;
    const stripped = stripAllMachineBlocks(combined);
    assert.doesNotMatch(stripped, /OPENCRE_/);
  });
});

describe('opencre-enrich / checkpoints', () => {
  it('verifyManualContentPreserved passes when only machine regions change', () => {
    const before = readFixture('sample-with-machine-block.md');
    const standards = [{ label: 'New A', url: 'https://example.com/a' }];
    const after = applyTopicAiEnrichment(before, standards);
    const v = verifyManualContentPreserved(before, after);
    assert.equal(v.ok, true);
  });

  it('verifyManualContentPreserved fails if manual lines are altered', () => {
    const before = readFixture('sample-with-references.md');
    const mangled = before.replace('Manual paper one', 'TAMPERED');
    const v = verifyManualContentPreserved(before, mangled);
    assert.equal(v.ok, false);
    assert.match(v.reason, /diverges/);
  });
});

describe('opencre-enrich / injection', () => {
  it('applyTopicAiEnrichment preserves all manual reference lines from fixture', () => {
    const original = readFixture('sample-with-references.md');
    const standards = [
      { label: 'Std One', url: 'https://owaspai.org/go/x/' },
      { label: 'Std Two', url: 'https://owaspai.org/go/y/' },
    ];
    const next = applyTopicAiEnrichment(original, standards);
    assert.match(next, /Manual paper one/);
    assert.match(next, /Manual OpenCRE link/);
    assert.match(next, /ISO 27002 control example/);
    assert.match(next, /OPENCRE_AI_STANDARDS_START/);
  });

  it('does not inject under **References on …** (only exact **References** line)', () => {
    const md = [
      '**References on AI security testing**:',
      '- [Manual only](https://example.org/m)',
      '',
      '**References**',
      '- [Second block manual](https://example.org/s)',
    ].join('\n');
    const standards = [{ label: 'T', url: 'https://t/' }];
    const out = injectTopicAiStandards(md, standards);
    assert.equal((out.match(/OPENCRE_AI_STANDARDS_START/g) || []).length, 1);
    assert.match(out, /Manual only/);
  });

  it('applyTopicAiEnrichment is idempotent when standards unchanged', () => {
    const original = readFixture('sample-with-references.md');
    const standards = [{ label: 'S', url: 'https://s/' }];
    const once = applyTopicAiEnrichment(original, standards);
    const twice = applyTopicAiEnrichment(once, standards);
    assert.equal(once, twice);
  });

  it('throws MANUAL_CONTENT_CHECKPOINT if result would change stripped manual text', () => {
    const original = readFixture('sample-with-references.md');
    const standards = [{ label: 'S', url: 'https://s/' }];
    const good = applyTopicAiEnrichment(original, standards);
    const bad = good.replace('Manual paper one', 'BROKEN');
    assert.throws(
      () => {
        const { verifyManualContentPreserved } = require('../../scripts/opencre-enrich/checkpoints');
        const v = verifyManualContentPreserved(original, bad);
        if (!v.ok) {
          const e = new Error(v.reason);
          e.code = 'MANUAL_CONTENT_CHECKPOINT';
          throw e;
        }
      },
      (e) => e.code === 'MANUAL_CONTENT_CHECKPOINT'
    );
  });

  it('makeInjectedBlock produces parseable marker boundaries', () => {
    const block = makeInjectedBlock([{ label: 'L', url: 'https://u/' }]);
    assert.match(block, /<!-- OPENCRE_AI_STANDARDS_START -->/);
    assert.match(block, /<!-- OPENCRE_AI_STANDARDS_END -->/);
    const round = stripAiStandardsBlock(`prefix\n${block}\nsuffix`);
    assert.doesNotMatch(round, /OPENCRE_AI_STANDARDS/);
    assert.match(round, /prefix/);
    assert.match(round, /suffix/);
  });

  it('empty standards list strips prior machine block and passes checkpoint', () => {
    const before = readFixture('sample-with-machine-block.md');
    const after = applyTopicAiEnrichment(before, []);
    assert.doesNotMatch(after, /OPENCRE_AI_STANDARDS_START/);
    const v = verifyManualContentPreserved(before, after);
    assert.equal(v.ok, true);
  });
});

describe('opencre-enrich / section CRE injection', () => {
  it('stripSectionCreBlocks does not swallow blank lines after the machine block', () => {
    const md = [
      '**References**',
      '<!-- OPENCRE_SECTION_CRE_START slug=x -->',
      '- [OpenCRE: Test](https://staging.opencre.org/cre/1)',
      '<!-- OPENCRE_SECTION_CRE_END slug=x -->',
      '',
      '- manual',
    ].join('\n');
    const stripped = stripSectionCreBlocks(md);
    assert.match(stripped, /\*\*References\*\*\n\n- manual/);
  });

  it('injectTopicAiStandards inserts topic:ai block after SECTION_CRE when both present', () => {
    const md = [
      '**References**',
      '<!-- OPENCRE_SECTION_CRE_START slug=x -->',
      '- [OpenCRE: T](https://staging.opencre.org/cre/1)',
      '<!-- OPENCRE_SECTION_CRE_END slug=x -->',
      '',
      '- [Manual](https://example.org/m)',
    ].join('\n');
    const standards = [{ label: 'Topic', url: 'https://example.org/topic' }];
    const out = injectTopicAiStandards(md, standards);
    const idxRef = out.split('\n').findIndex((l) => /^\s*\*\*References\*\*/.test(l));
    const lines = out.split('\n');
    assert.ok(idxRef >= 0);
    assert.match(lines[idxRef + 1], /OPENCRE_SECTION_CRE_START/);
    assert.match(lines[idxRef + 4], /OPENCRE_AI_STANDARDS_START/);
  });

  it('makeSectionCreBlock matches fixture-style CRE link pattern', async () => {
    const block = await makeSectionCreBlock(
      'ratelimit',
      [{ id: '187-083', name: 'Rate limiting', tags: [] }],
      'https://staging.opencre.org',
      async () => null
    );
    assert.match(
      block,
      /\[OpenCRE: Rate limiting\]\(https:\/\/staging\.opencre\.org\/cre\/187-083\)/
    );
  });

  it('makeSectionCreBlock omits OWASP AI Exchange linked standards and dedupes by Standard id', async () => {
    const etsiDoc = {
      doctype: 'Standard',
      id: 'ETSI:dup:Limit:https://etsi.example/x.pdf',
      name: 'ETSI',
      section: '6.3.3',
      hyperlink: 'https://etsi.example/x.pdf',
      tags: ['source:etsi'],
    };
    const mockFetch = async (creId) => {
      if (creId === 'cre-a') {
        return {
          doctype: 'CRE',
          id: 'cre-a',
          links: [
            {
              document: {
                doctype: 'Standard',
                id: 'OWASP AI Exchange:ratelimit:RL:https://owaspai.org/go/ratelimit/',
                name: 'OWASP AI Exchange',
                section: 'Rate limit',
                sectionID: 'ratelimit',
                hyperlink: 'https://owaspai.org/go/ratelimit/',
                tags: ['source:owasp_ai_exchange'],
              },
              ltype: 'Linked To',
            },
            { document: etsiDoc, ltype: 'Linked To' },
          ],
        };
      }
      if (creId === 'cre-b') {
        return {
          doctype: 'CRE',
          id: 'cre-b',
          links: [{ document: etsiDoc, ltype: 'Linked To' }],
        };
      }
      return null;
    };
    const block = await makeSectionCreBlock(
      'slug',
      [
        { id: 'cre-a', name: 'A' },
        { id: 'cre-b', name: 'B' },
      ],
      'https://staging.opencre.org',
      mockFetch
    );
    assert.doesNotMatch(block, /owaspai\.org\/go\/ratelimit/);
    assert.equal((block.match(/etsi\.example\/x\.pdf/g) || []).length, 1);
    assert.match(block, /referring to:/);
    assert.match(block, /^    - \[ETSI: 6\.3\.3\]/m);
  });
});
