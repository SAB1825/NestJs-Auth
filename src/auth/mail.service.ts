

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Resend } from "resend";

@Injectable()
export class MailService {
  private readonly resend: Resend;

  constructor(private readonly configService: ConfigService){
    this.resend = new Resend(
      this.configService.getOrThrow<string>('RESEND_API_KEY')
    )
  } 

  async sendPasswordResetEmail(to: string, resetUrl: string): Promise<void> {
    const from = this.configService.getOrThrow<string>('EMAIL_FROM')

    await this.resend.emails.send({
      from,
      to,
      subject: 'Reset your password',
      html: `
        <p><a href="${resetUrl}"> Click here to reset your password </p>
      `
    })
  }
}
