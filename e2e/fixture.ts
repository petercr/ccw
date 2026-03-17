import { PlaywrightAiFixture, type PlayWrightAiFixtureType } from '@midscene/web/playwright';
import { test as base } from '@playwright/test';

export const test = base.extend<PlayWrightAiFixtureType>(
  PlaywrightAiFixture({ waitForNetworkIdleTimeout: 2000 }),
);

export { expect } from '@playwright/test';
