import nodemailer from 'nodemailer';
import handlebarsMailTemplate from './HandlebarsMailTemplate';

interface IMailContact {
  name: string;
  email: string;
}


interface ITemplateVariables {
  [key: string]: string | number;
}

interface IparseMailTemplate {
  file: string;
  variables: ITemplateVariables;
}

interface IsendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IparseMailTemplate;
}

export default class EtherealMail {
   static async sendMail({ to, from, subject, templateData }: IsendMail): Promise<void> {
      const account = await nodemailer.createTestAccount();

      const mailTemplate = new handlebarsMailTemplate();

      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      })

      const message = await transporter.sendMail({
        from: {
          name: from?.name || 'Equipe API Vendas',
          address: from?.email || 'equipe@apivendas.com.br'
        },
        to: {
          name: to.name,
          address: to.email
        },
        subject,
        html: await mailTemplate.parse(templateData)
      });

      console.log('Message sent: %s', message.messageId)
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
   }
}
