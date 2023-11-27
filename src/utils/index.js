export const parseCSVData = (csvData) => {
  const [headerRow, ...dataRows] = csvData.split("\n");
  const headers = headerRow.split(",");
  const rows = [];
  dataRows.slice(0, -1).forEach((line, rowIndex) => {
    const column = line.split(",");
    const row = {};
    row.key = rowIndex;
    headers.forEach((header, columnIndex) => {
      row[header] = columnIndex < column.length ? column[columnIndex] : null;
    });
    rows.push(row);
  });
  return rows;
};

export const setDynamicTitle = (title) => {
  const TITLE_PLACEHOLDER = "Run you SQL queries on Insights";
  if (!title) {
    title = "Insights";
  }
  document.title = `${title} | ${TITLE_PLACEHOLDER}`;
};
