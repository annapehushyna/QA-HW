import { test, expect } from '../../fixtures/base.fixture';

test.describe('Test Case 7: Verify Test Cases Page', () => {
  test('should navigate to the test cases page', async ({
    homePage,
    testCasesPage,
  }) => {
    await homePage.open();
    await homePage.navbar.openTestCases();
    await testCasesPage.expectLoaded();

    await expect(testCasesPage.page).toHaveURL(/\/test_cases\/?$/);
    await expect(testCasesPage.pageTitle).toBeVisible();
    await expect(testCasesPage.firstTestCaseLink).toBeVisible();
  });
});

test.describe('Test Case 18: View Category Products', () => {
  test('should navigate to category pages via the sidebar', async ({
    homePage,
    categoryPage,
  }) => {
    await homePage.open();

    await homePage.expectCategorySidebarVisible();

    await homePage.expandWomenCategory();
    await homePage.clickWomenSubcategory('Dress');
    await categoryPage.expectLoaded();
    await categoryPage.expectHeadingContains('Women');
    await expect(categoryPage.page).toHaveURL(/\/category_products\//);

    await categoryPage.categorySidebar.locator('a[href="#Men"]').click();
    await categoryPage.categorySidebar.locator('#Men .panel-body a').first().click();
    await categoryPage.expectLoaded();
    await categoryPage.expectHeadingContains('Men');
  });
});
