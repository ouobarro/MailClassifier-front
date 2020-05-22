export class BroadcastList {
  id: number;
  libelle: string;
}

export class AttachType {
  id: number;
  attachTypeName: string;
}

export class Attachment {
  id: number;
  attachPath: string;
  name: string;
  mailId: number;
  attachTypeDto: AttachType;
}

export class Link {
  id: number;
  url: string;
  mailId: number;
}

export class Person {
  id: number;
  name: string;
  emailListDto: Array<Email>;
}

export class PersonMoral {
  id: number;
  name: string;
  emailListDto: Array<Email>;
}

export class Email {
  id: number;
  eaddress: string;
  signature: string;
  personDto: Person;
  personMoralDto: PersonMoral;
  bclDto: BroadcastList;
  mailDtoList: Array<Mail>;
}

export class Mail {
  id: number;
  subject: string;
  content: string;
  sendDate: Date;
  attachListDto: Array<Attachment>;
  linkListDto: Array<Link>;
  emailDto: Email;
  receiverList: Array<Email>;
  receiverCcList: Array<Email>;
}

export class PersonMail {
  email: string;
  mailList: Array<Mail>;
}

export class PersonMoralMail {
  email: string;
  mailList: Array<Mail>;
}

export class DataCount {
  attachCount: number;
  bclCount: number;
  linkCount: number;
  personCount: number;
  personMoralCount: number;
  emailCount: number;
  mailCount: number;
}
