export interface EmailSenderBase {
    fullName: string;
    email: string;
    phone: string;
    message: string;
}

export type EmailSenderResponse = EmailSenderBase