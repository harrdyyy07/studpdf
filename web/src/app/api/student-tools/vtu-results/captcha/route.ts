import { NextResponse } from 'next/server';

// VTU server certificates often have missing intermediate certificates causing leaf signature errors in Node fetch.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Dynamically discover subpage index path for a given exam cycle index page
async function getIndexPageForCycle(cycleFile: string): Promise<string> {
  const agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
  
  const res = await fetch(`https://results.vtu.ac.in/${cycleFile}`, {
    headers: { 'User-Agent': agent }
  });

  const html = await res.text();
  // Search for the first CBCS/index subpage link, e.g. D25J26Ecbcs/index.php
  const cbcsMatch = html.match(/window\.open\s*\(\s*['"]([a-zA-Z0-9_]+\/index\.php)['"]\s*,\s*['"]result['"]/i);
  if (cbcsMatch) {
    return `/${cbcsMatch[1]}`;
  }

  // Fallback map if regex fails
  const fallbackMap: { [key: string]: string } = {
    'indexMJ26.php': '/MJ26cbcs/index.php',
    'indexD5J6.php': '/D25J26Ecbcs/index.php',
    'indexJJ25.php': '/JJEcbcs25/index.php',
    'indexD4J5.php': '/DJcbcs25/index.php',
    'indexJJ24.php': '/JJEcbcs24/index.php',
  };
  return fallbackMap[cycleFile] || '/MJ26cbcs/index.php';
}

// Helper to scrape the active exam paths dynamically
async function findActivePaths(targetCycle: string | null): Promise<{ indexPage: string, captchaPage: string }> {
  const defaultPath = '/MJ26cbcs/index.php';
  const agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

  try {
    let cycleFile = '';
    if (targetCycle) {
      cycleFile = `index${targetCycle}.php`;
    } else {
      // Fetch main portal index to get latest
      const res1 = await fetch('https://results.vtu.ac.in/index.php', {
        headers: { 'User-Agent': agent }
      });
      
      const html1 = await res1.text();
      const indexMatch = html1.match(/window\.open\s*\(\s*['"](index[a-zA-Z0-9]+\.php)['"]\s*,\s*['"]result['"]/i);
      cycleFile = indexMatch ? indexMatch[1] : 'indexMJ26.php';
    }

    const indexPage = await getIndexPageForCycle(cycleFile);
    return {
      indexPage: indexPage,
      captchaPage: `${indexPage.substring(0, indexPage.lastIndexOf('/') + 1)}`
    };
  } catch (e) {
    console.error('Error finding active paths:', e);
    return {
      indexPage: defaultPath,
      captchaPage: '/MJ26cbcs/'
    };
  }
}

export async function GET(req: Request) {
  const agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
  
  // Parse query parameters
  const { searchParams } = new URL(req.url);
  const cycle = searchParams.get('cycle'); // e.g. D5J6, JJ25
  
  try {
    const { indexPage } = await findActivePaths(cycle);
    console.log('Using active index page path:', indexPage);

    const res1 = await fetch(`https://results.vtu.ac.in${indexPage}`, {
      headers: { 'User-Agent': agent }
    });

    const html = await res1.text();

    // Get cookie header
    const getSetCookie = (res1.headers as any).getSetCookie ? (res1.headers as any).getSetCookie() : [];
    const setCookieHeader = res1.headers.get('set-cookie');
    const rawCookies: string[] = getSetCookie.length > 0 ? getSetCookie : (setCookieHeader ? [setCookieHeader] : []);
    const cookiesList = rawCookies.map((c: string) => c.split(';')[0]);
    const sessCookie = cookiesList.find((c: string) => c.startsWith('VISRE='));

    if (!sessCookie) {
      throw new Error('Failed to extract session cookie from VTU portal.');
    }

    // Extract Token
    const tokenMatch = html.match(/name="Token"\s+value="([^"]+)"/);
    const token = tokenMatch ? tokenMatch[1] : null;
    if (!token) {
      throw new Error('Failed to extract Token from VTU portal HTML.');
    }

    // Extract Captcha Image URL
    const captchaImgMatch = html.match(/src="([^"]*vtu_captcha\.php[^"]*)"/i) || html.match(/<img\s+src="([^"]+)"[^>]*alt="CAPTCHA/i);
    let captchaPath = captchaImgMatch ? captchaImgMatch[1] : null;
    if (!captchaPath) {
      throw new Error('Failed to extract Captcha image path from VTU portal HTML.');
    }
    while (captchaPath.includes('&amp;')) {
      captchaPath = captchaPath.replace(/&amp;/g, '&');
    }
    if (captchaPath.startsWith('../')) {
      captchaPath = captchaPath.replace('../', '/');
    }

    const captchaUrl = captchaPath.startsWith('http')
      ? captchaPath
      : captchaPath.startsWith('/')
        ? `https://results.vtu.ac.in${captchaPath}`
        : `https://results.vtu.ac.in/${captchaPath}`;

    // Fetch Captcha Image
    const res2 = await fetch(captchaUrl, {
      headers: {
        'User-Agent': agent,
        'Cookie': sessCookie,
        'Referer': `https://results.vtu.ac.in${indexPage}`
      }
    });

    const arrayBuffer = await res2.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const captchaDataUrl = `data:image/png;base64,${base64}`;

    return NextResponse.json({
      success: true,
      captcha_image: captchaDataUrl,
      token: token,
      sessionId: sessCookie,
      indexPage: indexPage
    });
  } catch (error: any) {
    console.error('Error in direct captcha route:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal server error' }, { status: 500 });
  }
}

