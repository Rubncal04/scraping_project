// @ts-check
// import { chromium } from 'playwright';
import wiki from 'wikipedia';

/**
 * @param {{ body: { pattern: any; }; }} req
 * @param {{ status: (arg0: number) => { (): any; new (): any; send: { (arg0: { vendor: string; url: string; }[]): void; new (): any; }; }; }} res
 * @param {undefined} [next]
 */
// export default async function scrap(req, res, next) {
//   try {
//     console.log(req.body);
//     const { pattern } = req.body;
//     const keyword = pattern;
//     const shops = [
//       {
//         vendor: 'Intelligence',
//         url: 'https://intelligence.weforum.org/topics?tab=publications',
//         checkStock: async ({ page }) => {
//           const content = await page.textContent('.gWia-DG');
//           const result = await page.evaluate((keyword) => {
//             const elements = Array.from(document.querySelectorAll('h4'));
//             const filteredElements = elements.filter(element => element?.textContent?.includes(keyword));
//             return filteredElements.map(element => element.textContent);
//           }, keyword);
//           console.log(result);
//           return content?.includes(pattern) === true;
//         }
//       }
//     ]
//     const pagesFounded = []

//       ; (async () => {
//         const browser = await chromium.launch();


//         for (const shop of shops) {
//           const { checkStock, url, vendor } = shop
//           const page = await browser.newPage();
//           await page.goto(url);

//           const hasStock = await checkStock({ page });
//           console.log(`${vendor}: ${hasStock ? 'in stock' : 'out of stock'}`);
//           if (hasStock) {
//             const responses = {
//               vendor,
//               url
//             }
//             pagesFounded.push(responses);
//           }
//           await page.close();
//         }

//         res.status(200).send(pagesFounded);
//         await browser.close();
//       })()

//   } catch (error) {
//     console.log(error);
//   }
// }

/**
 * @param {{ body: { pattern: any; }; }} req
 * @param {{ status: (arg0: number) => { (): any; new (): any; send: { (arg0: { vendor: string; url: string; }[]): void; new (): any; }; }; }} res
 */
export default async function scrap(req, res) {
  try {
    const { keyword } = req.body;
    (async () => {
      //example
      // const page = await wiki.search(keyword);
      const page = await wiki.page(keyword);
      const summary = await page.summary();
      const response = {
        title: summary?.title,
        url: page?.fullurl,
        summary: summary?.extract,
        content: await page?.content()
      }
      res.status(200).send(response)
    })();

  } catch (error) {
    console.log(error);
    res.status(500).send(error)
  }
}
