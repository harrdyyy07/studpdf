import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Use server-configured Google Sheet webhook URL (prevent SSRF by disallowing client-supplied URLs)
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL || "https://script.google.com/macros/s/AKfycbz2mhTGASB3y78ueo1lGov5_WyJvQ3jZbufn-VOd8DAZdbzxHn9cG5VKXvUtTyt166RBw/exec";

    if (!webhookUrl) {
      return NextResponse.json({ 
        success: false, 
        error: 'Google Sheet Webhook URL is not configured. Please check your server .env file.' 
      }, { status: 500 });
    }

    const payload = {
      timestamp: new Date().toISOString(),
      studentName: body.studentName || 'Anonymous Student',
      usn: body.usn || 'N/A',
      email: body.email || 'N/A',
      branch: body.branch || 'General Engineering',
      collegeName: body.collegeName || 'Engineering College',
      testMode: body.testMode || 'Placement Mock Test',
      companyFilter: body.companyFilter || 'All Companies',
      score: body.score ?? 0,
      totalMarks: body.totalMarks ?? 0,
      percentage: body.percentage ?? 0,
      timeTakenSeconds: body.timeTakenSeconds ?? 0,
      resultStatus: body.percentage >= 60 ? 'PASSED 🚀' : 'NEEDS IMPROVEMENT 📈',
      details: body.categoryBreakdown || {}
    };

    // Forward score to Google Sheet Apps Script webhook endpoint
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Google Apps Script returned HTTP status ${response.status}`);
    }

    let resultData: any = {};
    try {
      resultData = await response.json();
    } catch {
      resultData = { success: true };
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Score successfully recorded in Google Sheet! 🎉',
      data: resultData 
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error recording aptitude score to Google Sheet:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Server error while submitting score to Google Sheet' 
    }, { status: 500 });
  }
}
