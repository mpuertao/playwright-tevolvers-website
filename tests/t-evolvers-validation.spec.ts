

import { test, expect, Page } from '@playwright/test';


async function acceptCookiesIfVisible(page: Page) {
  const cookieButton = page.getByRole('button', { name: 'Aceptar' });
  try {
    await cookieButton.waitFor({ state: 'visible', timeout: 3000 });
    await cookieButton.click();
  } catch {
  }
}

test.describe('Navegación y Estructura General', () => {

  test('1.1 - Carga Inicial de la Página Principal', async ({ page }) => {

    await page.goto('https://www.t-evolvers.com', { waitUntil: 'domcontentloaded' });

    await expect(page).toHaveTitle('T-Evolvers - Desarrollo de Software & DevSecOps en Medellín | Soluciones a Medida');

    await expect(page.getByText('Aliado Estratégico en Transformación Digital')).toBeVisible();

    await page.waitForSelector('nav', { state: 'visible' });
    
    await expect(page.locator('nav a[href="/home"]')).toBeVisible();
    await expect(page.locator('nav a[href="/empleos"]')).toBeVisible();

    await acceptCookiesIfVisible(page);
  });

  test('1.2 - Aceptación de Banner de Cookies', async ({ page }) => {
    await page.goto('https://www.t-evolvers.com', { waitUntil: 'domcontentloaded' });
    
    await expect(page.getByText('Aliado Estratégico en Transformación Digital')).toBeVisible();
    
    const cookieButton = page.getByRole('button', { name: 'Aceptar' });
    const isCookieBannerVisible = await cookieButton.isVisible().catch(() => false);
    
    if (isCookieBannerVisible) {
      await expect(page.getByText('Cookies: Este sitio utiliza cookies')).toBeVisible();
      
      await cookieButton.click();
      
      await expect(cookieButton).not.toBeVisible();
    }
    
    await expect(page.getByText('Aliado Estratégico en Transformación Digital')).toBeVisible();
  });

  test('1.3 - Navegación a través del Menú Principal - Home', async ({ page }) => {
    await page.goto('https://www.t-evolvers.com', { waitUntil: 'domcontentloaded' });
    
    await acceptCookiesIfVisible(page);
    
    await page.getByRole('link', { name: 'Home' }).click();
    
    await expect(page).toHaveURL(/.*\/home/);
    
    await expect(page.getByText('Aliado Estratégico en Transformación Digital')).toBeVisible();
  });

  test('1.4 - Navegación a través del Menú Principal - Empleos', async ({ page }) => {
    await page.goto('https://www.t-evolvers.com', { waitUntil: 'domcontentloaded' });
    
    await acceptCookiesIfVisible(page);
    
    await page.getByRole('navigation').getByRole('link', { name: 'Empleos' }).click();
    
    await expect(page).toHaveURL(/.*\/empleos/);
    
    await expect(page.getByText('Transformamos el proceso de software')).toBeVisible();
    
    await expect(page.getByRole('button', { name: 'Portal de empleos' })).toBeVisible();
  });

  test('1.5 - Navegación a través del Botón Contáctenos', async ({ page }) => {
    await page.goto('https://www.t-evolvers.com', { waitUntil: 'domcontentloaded' });
    
    await acceptCookiesIfVisible(page);
    
    await page.getByRole('button', { name: 'Contáctenos' }).click();
    
    await expect(page).toHaveURL(/.*#contactanos/);
    
    await expect(page.getByRole('heading', { name: 'Conversemos' })).toBeVisible();
    
    await expect(page.getByRole('textbox', { name: 'Nombre y Apellidos:' })).toBeVisible();
    
    await expect(page.getByRole('textbox', { name: 'WhatsApp:' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Correo Electrónico:' })).toBeVisible();
  });

});
