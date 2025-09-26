import { TableData } from '../types';

function escapeCsvCell(cell: any): string {
    const cellStr = String(cell ?? '');
    if (/[",\n\r]/.test(cellStr)) {
        return `"${cellStr.replace(/"/g, '""')}"`;
    }
    return cellStr;
}

export function exportToCSV(data: TableData, headers: string[] | undefined, filename: string): void {
    if (!data || data.length === 0) {
        console.warn("No data to export.");
        return;
    }

    const displayHeaders = headers && headers.length > 0 ? headers : Object.keys(data[0]);

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += displayHeaders.map(escapeCsvCell).join(',') + '\r\n';

    data.forEach(row => {
        const rowContent = displayHeaders.map(header => escapeCsvCell(row[header])).join(',');
        csvContent += rowContent + '\r\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    
    link.click();
    
    document.body.removeChild(link);
}
