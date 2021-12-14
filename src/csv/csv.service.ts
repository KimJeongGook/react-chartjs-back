import { Injectable } from '@nestjs/common';
import { join } from 'path';

const fs = require('fs')

// file encoding check
const chardet = require('chardet')
const csv = require('csvtojson') // csv --> json 변경
const iconv = require('iconv-lite') //인코딩 파일을 특정 인코딩 파일로 변경

@Injectable()
export class CsvService {
    async getCsv() {
        const filePath = join(__dirname, 'bus_2019.csv');
        console.log(filePath);
        const encoding = await chardet.detectFile(filePath);
        let csvData = fs.readFileSync(filePath);
        if (encoding !== 'UTF-8') {
            csvData = iconv.decode(csvData, encoding);
        }
        const result = await csv({ output: 'json' }).fromString(csvData);

        return result;
    }
}
