import { NextResponse } from 'next/server';
import ejs from 'ejs';
import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

export async function POST(req) {
  try {
    const body = await req.json();
    const { format } = body;

    if (!['pdf', 'jpg'].includes(format)) {
      return NextResponse.json({ error: 'Invalid format specified' }, { status: 400 });
    }

    const templatePath = path.resolve('templates', 'bill-template.ejs');
    if (!fs.existsSync(templatePath)) {
      return NextResponse.json({ error: 'Template not found' }, { status: 500 });
    }

    const html = await ejs.renderFile(templatePath, body);

    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    await page.setContent(html);

    let buffer;
    if (format === 'pdf') {
      buffer = await page.pdf({ format: 'A4' });
    } else {
      buffer = await page.screenshot({ type: 'jpeg', quality: 100, fullPage: true });
    }

    await browser.close();

    const resHeaders = new Headers();
    resHeaders.set('Content-Type', format === 'pdf' ? 'application/pdf' : 'image/jpeg');
    resHeaders.set('Content-Disposition', `inline; filename="bill.${format}"`);

    return new NextResponse(buffer, {
      status: 200,
      headers: resHeaders,
    });
  } catch (err) {
    console.error('❌ Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
