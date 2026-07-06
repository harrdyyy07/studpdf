import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { usn, captcha } = body;

    if (!usn || !captcha) {
      return NextResponse.json({ success: false, error: 'USN and captcha are required' }, { status: 400 });
    }

    const response = await fetch('https://result.vtudeveloper.in/api/scrape_submit.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ usn, captcha }),
    });

    if (!response.ok) {
      throw new Error(`Failed to submit scrape request: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error in submit route:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal server error' }, { status: 500 });
  }
}
