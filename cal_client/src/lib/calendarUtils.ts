// lib/calendarUtils.ts

/**
 * Get the number of days in a specific month
 */
export const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
};

/**
 * Get the day of the week for the first day of the month
 * (0 = Sunday, 1 = Monday, etc.)
 */
export const getFirstDayOfMonth = (year: number, month: number): number => {
    return new Date(year, month, 1).getDay();
};

/**
 * Get an array of dates for the previous month that should appear in the calendar
 */
export const getPreviousMonthDates = (year: number, month: number): Date[] => {
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    if (firstDayOfMonth === 0) return []; // Sunday, no previous month dates needed

    const previousMonth = month === 0 ? 11 : month - 1;
    const previousMonthYear = month === 0 ? year - 1 : year;
    const daysInPreviousMonth = getDaysInMonth(previousMonthYear, previousMonth);

    const dates: Date[] = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
        const day = daysInPreviousMonth - firstDayOfMonth + i + 1;
        dates.push(new Date(previousMonthYear, previousMonth, day));
    }

    return dates;
};

/**
 * Get an array of dates for the current month
 */
export const getCurrentMonthDates = (year: number, month: number): Date[] => {
    const daysInMonth = getDaysInMonth(year, month);
    const dates: Date[] = [];

    for (let day = 1; day <= daysInMonth; day++) {
        dates.push(new Date(year, month, day));
    }

    return dates;
};

/**
 * Get an array of dates for the next month that should appear in the calendar
 */
export const getNextMonthDates = (
    year: number,
    month: number,
    currentMonthDates: Date[],
    previousMonthDates: Date[]
): Date[] => {
    const totalDaysDisplayed = currentMonthDates.length + previousMonthDates.length;
    const daysNeeded = 42 - totalDaysDisplayed; // 6 rows of 7 days = 42 cells

    if (daysNeeded <= 0) return [];

    const nextMonth = month === 11 ? 0 : month + 1;
    const nextMonthYear = month === 11 ? year + 1 : year;

    const dates: Date[] = [];
    for (let day = 1; day <= daysNeeded; day++) {
        dates.push(new Date(nextMonthYear, nextMonth, day));
    }

    return dates;
};

/**
 * Format a date to a readable string
 */
export const formatDate = (date: Date | null, format: 'full' | 'short' | 'monthYear' = 'full'): string => {
    if (!date) return '';

    const options: Record<string, Intl.DateTimeFormatOptions> = {
        full: {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        },
        short: {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        },
        monthYear: {
            month: 'long',
            year: 'numeric',
        },
    };

    return date.toLocaleDateString('en-US', options[format] || options.full);
};

/**
 * Check if a date is today
 */
export const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
};

/**
 * Check if two dates are the same day
 */
export const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
    );
};