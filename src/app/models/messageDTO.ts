export class MessageDTO {
  sender: string;
  messageBody: string;
  date: string;

  constructor(sender: string, messageBody: string, date: string) {
    this.sender = sender;
    this.messageBody = messageBody;
    this.date = date;
  }
}
