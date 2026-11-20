const https = require('https');
https.get('https://seal-pdf.com', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const fonts = data.match(/fonts\.googleapis\.com[^"']+/g);
    console.log('Google Fonts:', fonts);
    const cssLinks = data.match(/href=["'][^"']+\.css[^"']*["']/g);
    console.log('CSS links:', cssLinks);
    const fontFamilies = data.match(/font-family:[^;}]+/g);
    console.log('inline font-family:', fontFamilies);
  });
}).on('error', err => console.log('Err:', err.message));
