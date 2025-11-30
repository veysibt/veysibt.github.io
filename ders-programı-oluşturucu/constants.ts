import { TimeSlot, Day } from './types';

export const DAYS: Day[] = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'];

// Configuration based on requirements:
// Lesson: 40 mins
// Start: 08:10
// Break 1: 15 mins (after Period 1)
// Break Others: 10 mins
// Lunch: 12:25 - 13:00 (Between Period 5 and 6)

export const TIME_SLOTS: TimeSlot[] = [
  { period: 1, start: '08:10', end: '08:50' }, 
  // Break: 15m -> 08:50 - 09:05
  { period: 2, start: '09:05', end: '09:45', isAfterBreak: true }, 
  // Break: 10m -> 09:45 - 09:55
  { period: 3, start: '09:55', end: '10:35' },
  // Break: 10m -> 10:35 - 10:45
  { period: 4, start: '10:45', end: '11:25' },
  // Break: 10m -> 11:25 - 11:35
  { period: 5, start: '11:35', end: '12:15' },
  // Lunch: 12:25 - 13:00 (User specified range)
  // Logic: Period 5 ends 12:15. There is technically a 10 min break until 12:25, then lunch until 13:00.
  // We will treat the gap between 5 and 6 as the lunch block.
  { period: 6, start: '13:00', end: '13:40' },
  // Break: 10m -> 13:40 - 13:50
  { period: 7, start: '13:50', end: '14:30' },
  // Break: 10m -> 14:30 - 14:40
  { period: 8, start: '14:40', end: '15:20' },
];

export const LUNCH_BREAK_INDEX = 5; // After period 5
