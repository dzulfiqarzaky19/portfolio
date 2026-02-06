import { test, expect } from '@playwright/test'

test('404 Page', async ({ page }) => {
  await page.goto('/some-non-existent-page')

  await expect(page.getByText(/404 - Page Not Found/i)).toBeVisible()
  await expect(
    page.getByText(/Oops! The page you are looking for does not exist./i),
  ).toBeVisible()

  const homeLink = page.getByRole('link', { name: /go back home/i })
  await expect(homeLink).toBeVisible()

  await homeLink.click()
  await expect(page).toHaveURL('/')
})
