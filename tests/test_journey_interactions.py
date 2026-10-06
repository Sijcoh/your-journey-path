"""Live checks for explicit, reversible Connect My Life permission and the route preview."""
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright, expect

OUTPUT = Path('/tmp/browser/restored-release')

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1280, "height": 1800})
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        for name, size in [('desktop', {'width': 1280, 'height': 1800}), ('phone', {'width': 390, 'height': 844})]:
            await page.set_viewport_size(size)
            await page.goto('http://localhost:8080', wait_until='networkidle')
            assert await page.title() == 'Build Your Journey — Discover, create and connect AI-led journeys'
            await page.screenshot(path=str(OUTPUT / f'{name}-hero.png'))
            toggle = page.locator('.permission-toggle')
            assert await toggle.get_attribute('aria-pressed') == 'false', 'Connections must start off'
            assert ' '.join((await page.locator('.map-core strong').inner_text()).split()) == 'Connect My Life'
            await toggle.click()
            assert await toggle.get_attribute('aria-pressed') == 'true', 'Explicit permission must activate connections'
            await toggle.click()
            assert await toggle.get_attribute('aria-pressed') == 'false', 'Permission must be reversible'
            await page.locator('#goal').fill('Help my family understand our next health appointment')
            await page.get_by_role('button', name='Create guided route').click()
            await expect(page.locator('.route-head')).to_have_text('Your first route')
            assert await page.locator('.route-step').count() == 3
            for section in ['start', 'connect-my-life', 'journeys', 'builders', 'partner', 'close']:
                await page.locator(f'#{section}').scroll_into_view_if_needed()
                await page.wait_for_timeout(850)
                await page.screenshot(path=str(OUTPUT / f'{name}-{section}.png'))
            await page.locator('.story-health').scroll_into_view_if_needed()
            await page.wait_for_timeout(850)
            await page.screenshot(path=str(OUTPUT / f'{name}-health.png'))
            assert await page.locator('img').evaluate_all('(images) => images.every(i => i.complete && i.naturalWidth > 0)'), 'Images must load'
            assert await page.evaluate('document.documentElement.scrollWidth <= window.innerWidth'), 'Page must fit the viewport'
            if name == 'phone':
                await page.get_by_role('button', name='Toggle navigation').click()
                await page.locator('.mobile-nav').get_by_role('link', name='Connect My Life').click()
                assert await page.locator('.mobile-nav').count() == 0
            else:
                await page.locator('.desktop-nav').get_by_role('link', name='Connect My Life').click()
            await page.wait_for_timeout(800)
            assert page.url.endswith('#connect-my-life')
            print(f'{name}: permission defaults, consent, reversal, route preview, navigation, images and viewport passed')
        assert not errors, errors
        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
