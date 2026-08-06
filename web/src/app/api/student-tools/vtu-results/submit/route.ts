import { NextResponse } from 'next/server';

export const dynamic = 'force-static';
import https from 'https';

interface SubjectResult {
  subject_code: string;
  subject_name: string;
  internal: string;
  external: string;
  total: string;
  result: string;
  grade: string;
}

function request(options: https.RequestOptions, postData: string | null = null): Promise<{ statusCode?: number, headers: any, body: Buffer }> {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data: Buffer[] = [];
      res.on('data', (chunk) => data.push(chunk));
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: Buffer.concat(data)
        });
      });
    });
    req.on('error', reject);
    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

function cleanText(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

function parseVtuHtml(html: string): any {
  // Extract USN and Student Name
  const usnMatch = html.match(/University Seat Number<\/b><\/div>\s*<div[^>]*>\s*([^<]+)/i);
  const nameMatch = html.match(/Student Name<\/b><\/div>\s*<div[^>]*>\s*([^<]+)/i);

  const usn = usnMatch ? usnMatch[1].trim() : '';
  const name = nameMatch ? nameMatch[1].trim() : '';

  if (!usn || !name) {
    // Check if there is an alert or error message on the page
    const alertMatch = html.match(/alert\(['"]([^'"]+)['"]\)/i) || html.match(/<div class="alert[^>]*>([\s\S]*?)<\/div>/i);
    if (alertMatch) {
      throw new Error(cleanText(alertMatch[1]));
    }
    throw new Error('Invalid captcha or student details not found.');
  }

  // Determine branch from USN
  let branch = 'VTU Student';
  if (usn.length >= 7) {
    const code = usn.substring(5, 7).toUpperCase();
    const branchMap: { [key: string]: string } = {
      'CS': 'COMPUTER SCIENCE & ENGINEERING',
      'IS': 'INFORMATION SCIENCE & ENGINEERING',
      'EC': 'ELECTRONICS & COMMUNICATION ENGINEERING',
      'EE': 'ELECTRICAL & ELECTRONICS ENGINEERING',
      'ME': 'MECHANICAL ENGINEERING',
      'CV': 'CIVIL ENGINEERING',
      'AI': 'ARTIFICIAL INTELLIGENCE & MACHINE LEARNING',
      'AD': 'ARTIFICIAL INTELLIGENCE & DATA SCIENCE',
      'BT': 'BIOTECHNOLOGY',
      'CH': 'CHEMICAL ENGINEERING',
      'AE': 'AERONAUTICAL ENGINEERING',
      'TE': 'TELECOMMUNICATION ENGINEERING',
      'AS': 'AEROSPACE ENGINEERING',
    };
    branch = branchMap[code] || `${code} BRANCH`;
  }

  // Split HTML into semester blocks
  const semParts = html.split(/Semester\s*:\s*/gi);
  const semesters: { [semester: string]: SubjectResult[] } = {};

  for (let i = 1; i < semParts.length; i++) {
    const part = semParts[i];
    const semNumberMatch = part.match(/^(\d+)/);
    if (!semNumberMatch) continue;

    const semNum = semNumberMatch[1];
    const rowSegments = part.split(/<div\s+class="divTableRow"[^>]*>/gi);
    const subjectResults: SubjectResult[] = [];
    
    for (let j = 1; j < rowSegments.length; j++) {
      const rowHtml = rowSegments[j];
      const cellRegex = /<div\s+class="divTableCell"[^>]*>([\s\S]*?)<\/div>/gi;
      const cells: string[] = [];
      let cellMatch;
      while ((cellMatch = cellRegex.exec(rowHtml)) !== null) {
        cells.push(cleanText(cellMatch[1]));
      }

      if (cells.length >= 6) {
        const code = cells[0];
        const subName = cells[1];
        const internal = cells[2];
        const external = cells[3];
        const total = cells[4];
        const result = cells[5];
        
        if (code.toLowerCase().includes('subject code') || code.toLowerCase().includes('code')) {
          continue;
        }

        if (/^[A-Z0-9-]{3,10}$/i.test(code)) {
          subjectResults.push({
            subject_code: code,
            subject_name: subName,
            internal: internal,
            external: external,
            total: total,
            result: result,
            grade: '' // Derived on client side
          });
        }
      }
    }

    if (subjectResults.length > 0) {
      semesters[semNum] = subjectResults;
    }
  }

  return {
    student: {
      name: name,
      usn: usn,
      branch: branch,
      batch: ''
    },
    semesters: semesters
  };
}

export async function POST(req: Request) {
  const agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
  try {
    const body = await req.json();
    const { usn, captcha, token, sessionId, indexPage } = body;

    if (!usn || !captcha || !token || !sessionId) {
      return NextResponse.json({ success: false, error: 'USN, captcha, token, and sessionId are required' }, { status: 400 });
    }

    const folderPath = indexPage ? indexPage.replace('index.php', '') : '/MJ26cbcs/';
    const resultPagePath = `${folderPath}resultpage.php`;

    const year = new Date().getFullYear();
    const jsToken = Buffer.from(`student_access_${year}`).toString('base64');

    const postData = `js_token=${encodeURIComponent(jsToken)}&Token=${encodeURIComponent(token)}&lns=${encodeURIComponent(usn.toUpperCase())}&captchacode=${encodeURIComponent(captcha)}`;

    console.log('Submitting request to official VTU path:', resultPagePath);
    const res = await request({
      hostname: 'results.vtu.ac.in',
      port: 443,
      path: resultPagePath,
      method: 'POST',
      headers: {
        'User-Agent': agent,
        'Cookie': sessionId,
        'Referer': `https://results.vtu.ac.in${indexPage || '/MJ26cbcs/index.php'}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      },
      rejectUnauthorized: false
    }, postData);

    const html = res.body.toString();
    const parsedData = parseVtuHtml(html);

    return NextResponse.json({
      success: true,
      source: 'scrape',
      data: parsedData
    });
  } catch (error: any) {
    console.error('Error in submit route:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal server error' }, { status: 500 });
  }
}
