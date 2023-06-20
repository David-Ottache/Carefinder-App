function exportToCSV(data: string, filename: string): void {
   const csvData = new Blob([data], { type: "text/csv;charset=utf-8;" });

   const link = document.createElement("a");
   if (link.download !== undefined) {
     const url = URL.createObjectURL(csvData);
     link.setAttribute("href", url);
     link.setAttribute("download", filename);
     link.style.visibility = "hidden";
     document.body.appendChild(link);
     link.click();
     document.body.removeChild(link);
   }
}


export default exportToCSV;
