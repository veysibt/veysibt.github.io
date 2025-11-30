export interface TimeSlot {
  period: number;
  start: string;
  end: string;
  isAfterBreak?: boolean;
}

export interface ScheduleData {
  [key: string]: string; // key format: "dayIndex-periodIndex", value: Course Name
}

export type Day = string;
