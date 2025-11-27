import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/Create TanStack App/i) // Update this if title changed
  })

  test('renders hero section', async ({ page }) => {
    await expect(page.getByText(/Hi, I'm Zaky/i)).toBeVisible()
    await expect(page.getByText(/I Build Scalable JavaScript Apps/i)).toBeVisible()
  })

  test('renders projects section', async ({ page }) => {
    await expect(page.getByText(/Featured Projects/i)).toBeVisible()
  })

  test('toggles theme', async ({ page }) => {
    const toggleButton = page.getByRole('button', { name: /toggle theme/i })
    await expect(toggleButton).toBeVisible()

    // Check initial state (assuming light or system default, but we can check attribute change)
    const html = page.locator('html')
    const initialTheme = await html.getAttribute('data-theme')

    await toggleButton.click()
    
    // Wait for attribute to change
    await expect(html).not.toHaveAttribute('data-theme', initialTheme || 'none')
  })
})
