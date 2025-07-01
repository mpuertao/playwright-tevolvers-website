import { test, expect } from '@playwright/test';

test.describe('T-Evolvers Website Validation', () => {
  test('should load T-Evolvers website, accept cookies and validate page rendering', async ({ page }) => {
    // Step 1: Navigate to T-Evolvers website
    await page.goto('https://www.t-evolvers.com');
    
    // Step 2: Verify page title
    await expect(page).toHaveTitle('T-Evolvers');
    
    // Step 3: Accept cookies dialog if present
    const cookiesDialog = page.locator('dialog');
    if (await cookiesDialog.isVisible()) {
      await page.getByRole('button', { name: 'Aceptar' }).click();
    }
    
    // Step 4: Verify main heading is visible
    await expect(page.locator('h1').filter({ hasText: 'Transformación y Evolución' })).toBeVisible();
    
    // Step 5: Verify navigation menu is present and contains expected links
    const navigation = page.locator('nav');
    await expect(navigation).toBeVisible();
    
    // Verify navigation links - focus on the main navigation in header
    await expect(page.locator('nav a[href="/home"]')).toBeVisible();
    await expect(page.locator('nav').locator('text=Servicios')).toBeVisible();
    await expect(page.locator('nav a[href="/home#clientes"]')).toBeVisible();
    await expect(page.locator('nav a[href="/home#we"]')).toBeVisible();
    await expect(page.locator('nav a[href="/jobs"]')).toBeVisible();
    await expect(page.locator('nav a[href="/home#contactanos"]')).toBeVisible();
    
    // Step 6: Verify key content sections
    await expect(page.locator('h3').filter({ hasText: 'Implementamos las mejores prácticas' })).toBeVisible();
    await expect(page.locator('text=Automatización y desarrollo de software')).toBeVisible();
    
    // Step 7: Verify company information sections
    await expect(page.locator('h2').filter({ hasText: 'Nosotros' })).toBeVisible();
    await expect(page.locator('h4').filter({ hasText: 'Misión' })).toBeVisible();
    await expect(page.locator('h4').filter({ hasText: 'Valores' })).toBeVisible();
    await expect(page.locator('h4').filter({ hasText: 'Visión' })).toBeVisible();
    
    // Step 8: Verify contact form is present
    await expect(page.locator('h2').filter({ hasText: 'Conversemos' })).toBeVisible();
    
    // Wait for form to load
    await page.waitForTimeout(2000);
    
    // Verify form fields by their labels and text content
    await expect(page.locator('text=Nombre y Apellidos:')).toBeVisible();
    await expect(page.locator('text=WhatsApp:')).toBeVisible();
    await expect(page.locator('text=Correo Electrónico:')).toBeVisible();
    await expect(page.locator('text=Empresa:')).toBeVisible();
    await expect(page.locator('text=Ciudad:')).toBeVisible();
    await expect(page.locator('text=Temas de Interés:')).toBeVisible();
    await expect(page.locator('text=Mensaje:')).toBeVisible();
    await expect(page.locator('button').filter({ hasText: 'Enviar PQRS' })).toBeVisible();
    
    // Step 9: Verify footer with social links
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    // Verify social media links in footer
    await expect(page.locator('a[href*="linkedin.com"]')).toBeVisible();
    await expect(page.locator('a[href*="instagram.com"]')).toBeVisible();
    await expect(page.locator('a[href*="facebook.com"]')).toBeVisible();
    await expect(page.locator('a[href*="youtube.com"]')).toBeVisible();
    
    // Step 10: Verify footer content
    await expect(page.locator('footer h4').filter({ hasText: 'Servicios' })).toBeVisible();
    await expect(page.locator('footer h4').filter({ hasText: 'Links' })).toBeVisible();
    await expect(page.locator('footer h4').filter({ hasText: 'Contacto' })).toBeVisible();
    await expect(page.locator('text=Medellín, Colombia')).toBeVisible();
    await expect(page.locator('footer').locator('text=info@t-evolvers.com')).toBeVisible();
    await expect(page.locator('text=© T-Evolvers')).toBeVisible();
    
    // Step 11: Take screenshot for documentation
    await page.screenshot({ 
      path: 'tests/screenshots/t-evolvers-validation.png', 
      fullPage: true 
    });
    
    // Additional validation: Verify page loaded successfully
    await expect(page.url()).toContain('t-evolvers.com');
  });
  
  test('should verify basic interactivity and form elements', async ({ page }) => {
    // Navigate to the website
    await page.goto('https://www.t-evolvers.com');
    
    // Accept cookies if dialog is present
    const cookiesDialog = page.locator('dialog');
    if (await cookiesDialog.isVisible()) {
      await page.getByRole('button', { name: 'Aceptar' }).click();
    }
    
    // Wait for page to load
    await page.waitForTimeout(3000);
    
    // Verify main content is loaded
    await expect(page.locator('h1').filter({ hasText: 'Transformación y Evolución' })).toBeVisible();
    
    // Verify we can scroll to different sections
    await page.locator('h2').filter({ hasText: 'Nosotros' }).scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    
    // Verify contact form is accessible
    await page.locator('h2').filter({ hasText: 'Conversemos' }).scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    
    // Verify contact form is visible
    await expect(page.locator('h2').filter({ hasText: 'Conversemos' })).toBeVisible();
  });
});
