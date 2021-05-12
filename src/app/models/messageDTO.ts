export class MessageDTO {
  messageBody: string;
  timeStamp: string;
  senderUserName: string;
  senderPic: string;

  constructor(messageBody: string, timeStamp: string, senderUserName: string, senderPic: string) {
    this.messageBody = messageBody;
    this.timeStamp = timeStamp;
    this.senderUserName = senderUserName;
    this.senderPic = senderPic;
  }
}
