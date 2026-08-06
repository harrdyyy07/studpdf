import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const usn = searchParams.get('usn');

    if (!usn) {
      return NextResponse.json({ success: false, error: 'USN is required' }, { status: 400 });
    }

    const response = await fetch(`https://result.vtudeveloper.in/api/get_student.php?usn=${encodeURIComponent(usn)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch student data: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error in check route:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal server error' }, { status: 500 });
  }
}
