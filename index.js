const puppeteer = require('puppeteer');
const axios = require('axios');


function formatJavaCode(javaCode) {
	let lines = javaCode.split("\n").map(line => line.trim());
	const firstLineSpaces = lines[0].match(/^\s*/)[0].length;

	return lines.map(line => {
		const leadingSpaces = line.match(/^\s*/)[0].length;
		const spacesToAdd = leadingSpaces - firstLineSpaces;
		return " ".repeat(4) + line.trim().slice(spacesToAdd);
	}).join("\n");
}

(async () => {
	const browser = await puppeteer.launch({ headless: false });

	const page = await browser.newPage();



	try {
		await page.goto('https://www.hackerrank.com/auth/login', { waitUntil: 'networkidle2' });

		await page.type('input[aria-label="Your username or email"]', 'damibe1498@lapeds.com');
	await page.type('input[aria-label="Your password"]', 'Password@123');

	await page.waitForSelector('button.c-cUYkx-dshqME-variant-primary[type="button"]');
			await page.click('button.c-cUYkx-dshqME-variant-primary[type="button"]');
		await page.waitForNavigation({ waitUntil: 'networkidle2' });


	const response = await axios.get('https://backend-hackerrank.santhosh-toorpu.workers.dev/get');

		const problemLinks = response.data;

		for (let i of problemLinks) {

			if (!i.code) {
				console.log('Skipping problem:', i.Problem);

				continue;
			}

			console.log('Processing problem:', i.Problem);
await page.goto(i.Problem, { waitUntil: 'networkidle2' });


			await page.waitForSelector('.monaco-editor.no-user-select.showUnused.showDeprecated.vs');


const languageDropdownSelector = '.css-1fv400i-control input[type="text"]';

await page.waitForSelector(languageDropdownSelector);
const isJavaSelected = await page.evaluate(() => {

				const dropdownInput = document.querySelector('.css-1fv400i-control input[type="text"]');
				const selectedLanguage = dropdownInput.value.trim();
return selectedLanguage.toLowerCase().includes('java');
			});

if (!isJavaSelected) {

await page.click('.css-1fv400i-control');
await page.waitForSelector('.css-1j2eamm div[role="option"]');
				const javaOptions = await page.$$('.css-1j2eamm div[role="option"]');

				for (let j of javaOptions) {
const optionText = await j.evaluate(node => node.textContent.toLowerCase());
if (optionText.includes('java')) {
	await j.click();
	break;

						}
				}
			}

	console.log('Original code:', i.code);
			const formattedCode = formatJavaCode(i.code);

	await page.evaluate((code) => {
	window.monaco.editor.getModels()[0].setValue(code);
}, formattedCode);


console.log('Formatted code typed in Monaco editor:', formattedCode);
			await page.waitForSelector('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled');
await page.click('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled');

console.log('Clicked "Run Code" button');

await new Promise(resolve => setTimeout(resolve, 5000));

await page.waitForSelector('.monaco-editor.no-user-select.showUnused.showDeprecated.vs');

	console.log('Code execution completed.');
await new Promise(resolve => setTimeout(resolve, 5000));
		}

	} catch (error) {

console.error('Error:', error);
	} finally {

await browser.close();
	}
})();
