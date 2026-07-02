import dayjs from "dayjs";

/**
 * Handles weird datetime format in world cup data.
 *
 * ('2026-06-16','15:00 UTC-4') => '2026-06-16T19:00:00.000Z'
 */
export function handleSplitDateTime(dateStr: string, timeStr: string) {
  // Normalize "UTC-4" or "UTC-4:30" to standard "UTC-04:00" or "UTC-04:30"
  const normalizedTimeStr = timeStr.replace(
    /UTC([+-])(\d{1,2})(:\d{2})?$/,
    (match, sign, hours, minutes) => {
      // Pad single-digit hours with a 0, and default missing minutes to :00
      return `UTC${sign}${hours.padStart(2, "0")}${minutes || ":00"}`;
    },
  );

  return dayjs(`${dateStr} ${normalizedTimeStr}`, "YYYY-MM-DD HH:mm [UTC]Z");
}

// --- FILE-LOCAL TESTS ---
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it("parses valid world cup datetime strings correctly", () => {
    const result = handleSplitDateTime("2026-06-16", "15:00 UTC-4");
    expect(result.toISOString()).toBe("2026-06-16T19:00:00.000Z");
  });

  it("handles timezones with missing minutes", () => {
    const result = handleSplitDateTime("2026-06-16", "15:00 UTC-4");
    expect(result.toISOString()).toBe("2026-06-16T19:00:00.000Z");
  });

  it("handles timezones with existing minutes (e.g., India)", () => {
    const result = handleSplitDateTime("2026-06-16", "15:00 UTC+5:30");
    // 15:00 in +05:30 is 09:30 UTC
    expect(result.toISOString()).toBe("2026-06-16T09:30:00.000Z");
  });
}
