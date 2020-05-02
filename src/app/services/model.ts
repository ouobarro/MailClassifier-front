export class BroadcastList {
  id: number;
  libelle: string;
}

export class Attachment {
  id: number;
  attachPath: string;
  name: string;
  mailId: number;
}

export class Link {
  id: number;
  url: string;
  libelle: string;
  target: string;
  mailId: number;
}

export class Person {
  id: number;
  name: string;
  emailAddress: string;
}

export class Mail {
  id: number;
  subject: string;
  content: string;
  sendDate: Date;
  bclDto: BroadcastList;
  attachListDto: Array<Attachment>;
  linkListDto: Array<Link>;
  sender: Person;
  receiverList: Array<Person>;
}
