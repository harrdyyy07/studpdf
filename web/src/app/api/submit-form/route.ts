import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const webhookUrl =
      process.env.GOOGLE_SHEET_WEBHOOK_URL ||
      "https://script.google.com/macros/s/AKfycbz2mhTGASB3y78ueo1lGov5_WyJvQ3jZbufn-VOd8DAZdbzxHn9cG5VKXvUtTyt166RBw/exec";

    if (!webhookUrl) {
      return NextResponse.json({ 
        success: false, 
        error: 'GOOGLE_SHEET_WEBHOOK_URL is not configured on the server. Please check your .env file.' 
      }, { status: 500 });
    }

    const fileList = Array.isArray(body.files) ? body.files : [];
    const fileUrls = fileList.map((f: any) => f?.url || f).filter(Boolean).join('\n');
    const fileNames = fileList.map((f: any) => f?.name || '').filter(Boolean).join(', ');
    const materialTypesStr = Array.isArray(body.materialTypes) 
      ? body.materialTypes.join(', ') 
      : (body.materialTypes || '');

    const payload = {
      timestamp: new Date().toISOString(),
      fullName: body.fullName || '',
      collegeName: body.collegeName || '',
      email: body.email || '',
      phone: body.phone || '',
      scheme: body.scheme || '',
      branch: body.branch || '',
      semester: body.semester || '',
      subjectCode: body.subjectCode || '',
      subjectName: body.subjectName || '',
      hallOfFame: body.hallOfFame || '',
      materialTypes: materialTypesStr,
      materials: materialTypesStr,
      files: fileList,
      fileUrls: fileUrls,
      fileNames: fileNames,
    };
    
    // Send form data to Google Sheet Apps Script endpoint
    const response = await fetch(webhookUrl, {
      method: 'POST',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();
    let data: any = {};
    try {
      data = JSON.parse(responseText);
    } catch {
      data = { result: responseText };
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Submission recorded successfully in Google Sheets',
      data 
    }, { status: 200 });

  } catch (error: any) {
    console.error('Google Sheets submission error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Server error during submission' 
    }, { status: 500 });
  }
}
