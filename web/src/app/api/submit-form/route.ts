import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

    if (!webhookUrl || webhookUrl === 'your_apps_script_web_app_url_here') {
      return NextResponse.json({ 
        success: false, 
        error: 'GOOGLE_SHEET_WEBHOOK_URL is not configured on the server. Please check your .env file.' 
      }, { status: 500 });
    }
    
    // Send form data to Google Sheet Apps Script endpoint
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: body.fullName,
        collegeName: body.collegeName,
        email: body.email,
        phone: body.phone,
        scheme: body.scheme,
        branch: body.branch,
        semester: body.semester,
        subjectCode: body.subjectCode,
        subjectName: body.subjectName,
        hallOfFame: body.hallOfFame,
        materialTypes: body.materialTypes,
        files: body.files,
      }),
    });

    if (!response.ok) {
      throw new Error(`Google Apps Script returned HTTP status ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Unknown error occurred in Google Apps Script');
    }
    
    return NextResponse.json({ success: true, message: 'Submission recorded successfully in Google Sheets' }, { status: 201 });
  } catch (error: any) {
    console.error('Google Sheets submission error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Server error during submission' }, { status: 500 });
  }
}
