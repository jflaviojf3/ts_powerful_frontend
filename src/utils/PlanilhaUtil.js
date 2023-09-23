import * as XLSX from "xlsx/xlsx.mjs";

export function gerarPlanilhaExcel(dados, relatorio) {
    const wb = XLSX.utils.book_new();

    wb.props = {
      Title: relatorio.title,
      Subject: relatorio.subject,
      Author: relatorio.author,
      CreatedDate: new Date(),
    };

    wb.SheetNames.push(relatorio.sheetName);

    const ws = XLSX.utils.aoa_to_sheet(dados);

    wb.Sheets[relatorio.tabName] = ws;

    XLSX.writeFile(wb, relatorio.nameFile, { bookType: "xlsx", type: "binary" });
}