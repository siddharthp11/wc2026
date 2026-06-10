type Row = Record<string, string>;

function pad(str: string, width: number) {
  return str + " ".repeat(width - str.length);
}

export function renderTable(headers: string[], rows: Row[]): string {
  const colWidths = headers.map((h) =>
    Math.max(h.length, ...rows.map((r) => (r[h] ?? "").length)),
  );

  const separator =
    "+" + colWidths.map((w) => "-".repeat(w + 2)).join("+") + "+";
  const formatRow = (cells: string[]) =>
    "| " + cells.map((c, i) => pad(c, colWidths[i])).join(" | ") + " |";

  const lines = [
    separator,
    formatRow(headers),
    separator,
    ...rows.map((r) => formatRow(headers.map((h) => r[h] ?? ""))),
    separator,
  ];

  return lines.join("\n");
}
