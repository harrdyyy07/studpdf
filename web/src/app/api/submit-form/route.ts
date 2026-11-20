import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Specifically use the Notes Upload Webhook URL
    const webhookUrl =
      process.env.NOTES_GOOGLE_SHEET_WEBHOOK_URL ||
      "https://script.google.com/macros/s/AKfycbxMcAAgcAZfPldSYOW63dBZBCO7u7zkLNs2RaGecM9oI7HMQXM_K-EgQGJKwbx3epf7/exec";

    const rawFiles = Array.isArray(body.files) ? body.files : [];
    const fileUrls = rawFiles.map((f: any) => f?.url || f).filter(Boolean).join('\n');
    const fileNames = rawFiles.map((f: any) => f?.name || '').filter(Boolean).join(', ');
    
    const materialTypesArray = Array.isArray(body.materialTypes)
      ? body.materialTypes
      : body.materialTypes ? [body.materialTypes] : [];
    const materialTypesStr = materialTypesArray.join(', ');

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
      materialTypes: materialTypesArray,
      materialTypesString: materialTypesStr,
      materials: materialTypesStr,
      files: rawFiles,
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

    if (!response.ok) {
      console.error('[submit-form] Webhook returned non-200 status:', response.status, responseText);
      return NextResponse.json({ 
        success: false, 
        error: `Google Sheets returned HTTP ${response.status}`,
        details: responseText
      }, { status: 502 });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Submission recorded successfully in Google Sheets',
      data 
    }, { status: 200 });

  } catch (error: any) {
    console.error('[submit-form] Error during submission:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Server error during submission' 
    }, { status: 500 });
  }
}
