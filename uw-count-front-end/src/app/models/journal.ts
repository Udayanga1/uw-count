import { JournalLine } from "./journal-line";

export interface Journal {
  id?: number;
  narration: string;
  date: string;
  jeLines: JournalLine[];
}