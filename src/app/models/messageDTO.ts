export class MessageDTO {
  sender: string;
  messageBody: string;
  date: Date;

  constructor(sender: string, messageBody: string, date: Date) {
    this.sender = sender;
    this.messageBody = messageBody;
    this.date = date;
  }
}
