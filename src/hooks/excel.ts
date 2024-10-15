import excelJs from "exceljs";

export const downloadExcel = () => {
    const url = './template.xlsx';
    const a = document.createElement('a');
    a.href = url;
    a.download = 'template.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
}

export const readExcel = async (file: File) => {
    return new Promise((resolve, reject) => {
        const buffer = new FileReader();
        buffer.readAsArrayBuffer(file);
        buffer.onload = async () => {
            const workbook = new excelJs.Workbook();
            const read = await workbook.xlsx.load(buffer.result as ArrayBuffer);
            resolve(transformToJson(read.worksheets[0]));
        }
        buffer.onerror = (error) => reject(error);
    });
}

const transformToJson = (worksheet: excelJs.Worksheet) => {
    const result: any = [];
    const keys: any = [];
    worksheet.eachRow((row, rowNumber) => {
        const data: any = {};
        row.eachCell((cell, colNumber) => {
            if (rowNumber == 1) {
                keys.push(cell.value);
            } else {
                data[keys[colNumber - 1]] = formatData(keys[colNumber - 1], cell.value);
            }
        });
        if (rowNumber > 1) {
            result.push(data);
        }
    });
    return result;
}

const formatData = (key: any, data: any) => {
    // 成绩转换
    const scoreMap: any = {
        A: 95,
        B: 85,
        C: 75,
        D: 65,
    }
    if (key === '成绩' && scoreMap[data]) {
        return scoreMap[data];
    }
    if (!isNaN(data)) {
        return Number(data);
    }

    // 数字转换
    if ((key === '学分' || key === '绩点') && !isNaN(data)) {
        return Number(data);
    }
    return data;
}