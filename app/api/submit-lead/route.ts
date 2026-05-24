import { NextRequest, NextResponse } from 'next/server';

const WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/u1wGvQAHeabFrjX36spu/webhook-trigger/5a6c0a61-6dfb-48b6-a134-da8599fce972';
const QUALIFIED_POSITION = 'CEO/Owner';

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    // Server-side safeguard: Verify lead is qualified
    if (!payload.position || payload.position.trim() !== QUALIFIED_POSITION) {
      return NextResponse.json(
        { success: false, error: 'Not qualified' },
        { status: 400 }
      );
    }

    // Send to webhook
    const webhookResponse = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        position: payload.position,
        companyType: payload.companyType,
        jobsPerMonth: payload.jobsPerMonth,
        annualRevenue: payload.annualRevenue,
        marketingBudget: payload.marketingBudget,
        fullName: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        submittedAt: payload.submittedAt || new Date().toISOString(),
      }),
    });

    if (!webhookResponse.ok) {
      console.error('Webhook error:', webhookResponse.status, await webhookResponse.text());
      return NextResponse.json(
        { success: false, error: 'Webhook submission failed' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
