const puppeteer = require('puppeteer');

test('should select john and emily and then output places to go and avoid', async () => {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  await page.goto(
    'http://127.0.0.1:8080/'
  );

  await page.click('#john');
  await page.click('#emily');
  await page.click('#submit');

  await page.waitForSelector('.go');
  await page.waitForSelector('.avoid');

  //results should be:
  //places to go: El Cantina, Wagamama, Spirit House
  //places to avoid: The York, The Three Johns, Sultan Sofrasi, Banana Tree
  //as John Doe can't eat anything at any of these places
  const firstPlaceToGo = await page.evaluate(() => document.querySelectorAll('.go li')[0].textContent);
  const secondPlaceToGo = await page.evaluate(() => document.querySelectorAll('.go li')[1].textContent);
  const thirdPlaceToGo = await page.evaluate(() => document.querySelectorAll('.go li')[2].textContent);
  
  expect(firstPlaceToGo).toBe('El Cantina');
  expect(secondPlaceToGo).toBe('Wagamama');
  expect(thirdPlaceToGo).toBe('Spirit House');

  const firstPlaceToAvoid = await page.evaluate(() => document.querySelectorAll('.avoid li')[0].textContent);
  const firstPlaceToAvoidReason = await page.evaluate(() => document.querySelectorAll('.avoid li')[1].textContent);
  const secondPlaceToAvoid = await page.evaluate(() => document.querySelectorAll('.avoid li')[2].textContent);
  const secondPlaceToAvoidReason = await page.evaluate(() => document.querySelectorAll('.avoid li')[3].textContent);
  const thirdPlaceToAvoid = await page.evaluate(() => document.querySelectorAll('.avoid li')[4].textContent);
  const thirdPlaceToAvoidReason = await page.evaluate(() => document.querySelectorAll('.avoid li')[5].textContent);
  const fourthPlaceToAvoid = await page.evaluate(() => document.querySelectorAll('.avoid li')[6].textContent);
  const fourthPlaceToAvoidReason = await page.evaluate(() => document.querySelectorAll('.avoid li')[7].textContent);
  
  expect(firstPlaceToAvoid).toBe('The York');
  expect(firstPlaceToAvoidReason).toBe('There is nothing for John Doe to eat');
  expect(secondPlaceToAvoid).toBe('The Three Johns');
  expect(secondPlaceToAvoidReason).toBe('There is nothing for John Doe to eat');
  expect(thirdPlaceToAvoid).toBe('Sultan Sofrasi');
  expect(thirdPlaceToAvoidReason).toBe('There is nothing for John Doe to eat');
  expect(fourthPlaceToAvoid).toBe('Banana Tree');
  expect(fourthPlaceToAvoidReason).toBe('There is nothing for John Doe to eat');

}, 20000);