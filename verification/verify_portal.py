from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to home
        page.goto("http://localhost:3000")

        # Wait for the Portal text to confirm loading
        expect(page.get_by_text("Enter Your 10-Minute Sanctuary")).to_be_visible(timeout=10000)

        # Wait a bit for the canvas to render (Three.js can take a moment)
        page.wait_for_timeout(3000)

        # Take a screenshot
        page.screenshot(path="verification/portal_verification.png")

        browser.close()

if __name__ == "__main__":
    run()
