import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import { USERS, URLS } from '../test-data/users';

test.describe('Login Functionality', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test('Debe realizar login exitoso y validar API', async ({ page }) => {

    await test.step('Navegar a la página de login', async () => {
      await loginPage.goto();
    });

    let statusCode: number;

    await test.step('Interceptar API y completar formulario', async () => {
      statusCode = await loginPage.loginAndCaptureResponse(USERS.VALID);
    });

    await test.step('Validar status code de la respuesta del servidor', async () => {
      expect(statusCode).toBe(200);
    });

    await test.step('Validar que el usuario llega a la URL correcta', async () => {
      await expect(page).toHaveURL(URLS.DASHBOARD);
    });

  });
});
