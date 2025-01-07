import { format, formatDistanceStrict } from "date-fns";
import vi from "date-fns/locale/vi";

export class DateUtils {
  formatNowDistance(
    date: Date | number,
    options?: {
      addSuffix?: boolean;
      unit?: "second" | "minute" | "hour" | "day" | "month" | "year";
      roundingMethod?: "floor" | "ceil" | "round";
      locale?: Locale;
    },
  ): string {
    return formatDistanceStrict(date, new Date(), {
      locale: vi,
      addSuffix: true,
      ...options,
    });
  }

  formatDateTime(date: Date | number, options?: { locale?: Locale }) {
    return format(date, "dd/MM/yyyy HH:mm", options);
  }
}
