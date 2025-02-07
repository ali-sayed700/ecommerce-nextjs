import { Resend } from "resend";
import { EmailTemplate } from "../../_components/email-template";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API);

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [body.email],
      subject: "Orders From Learning Tech",
      react: EmailTemplate({ body }),
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
