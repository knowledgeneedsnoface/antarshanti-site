// app/api/order/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const orderId = "AS-" + crypto.randomBytes(4).toString("hex").toUpperCase();
    const payload = { ...body, orderId, createdAt: new Date().toISOString() };

    const SENDGRID_KEY = process.env.SENDGRID_API_KEY;
    const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL;
    if (SENDGRID_KEY && NOTIFY_EMAIL) {
      const msg = {
        personalizations: [{ to: [{ email: NOTIFY_EMAIL }] }],
        from: { email: "orders@antarshanti.com", name: "AntarShanti Orders" },
        subject: `New AntarShanti Order ${orderId}`,
        content: [{ type: "text/plain", value: `New order:\n\n${JSON.stringify(payload, null, 2)}` }],
      };
      await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: { Authorization: `Bearer ${SENDGRID_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify(msg),
      });
    } else {
      console.log("ORDER RECEIVED:", JSON.stringify(payload, null, 2));
    }

    return NextResponse.json({ orderId }, { status: 200 });
  } catch (err: any) {
    console.error("ORDER ERROR", err);
    return NextResponse.json({ message: err.message || "Failed" }, { status: 500 });
  }
}
