export default async function scrap(req, res, next) {
  console.log(req.body);
  const { pattern } = req.body;
  const url = 'https://intelligence.weforum.org/topics?tab=publications'

  fetch(url).then(res => {
    if (!res.ok) {
      throw new Error(`Network res was not ok: ${res.statusText}`);
    }
    return res.text();
  })
  .then(content => {
    const duplicatedMachine = content.match(pattern) || [];
    const noDuplicatedMachine = [...new Set(duplicatedMachine)];
    console.log(noDuplicatedMachine);
  })
  .catch(error => {
    console.error('Error:', error);
  });

  // console.log("resultado", result);

  res.status(200).send('hey there')
}
