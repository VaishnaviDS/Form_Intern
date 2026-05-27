import nodemailer from "nodemailer";
import dns from "dns";

dns.setDefaultResultOrder("ipv4first");

export const sendEmail = async (to, subject, text) => {

  try {

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,

      port: Number(process.env.SMTP_PORT),

      secure: true,

      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },

      connectionTimeout: 10000,
    });

    await transporter.verify();

    console.log("SMTP Connected");

    await transporter.sendMail({
      from: `"Support" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
    });

    console.log("Mail Sent");

  } catch (error) {

    console.log("MAIL ERROR:");
    console.log(error);

    throw error;
  }
};
