/* eslint-disable prettier/prettier */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class ZentracloudService {
    private apkiKey: string = process.env.ZENTRACLOUD_API_KEY || "b1392e55a94c85915ec262791c39cf5560bd6f76"

    constructor(private httpSerivce: HttpService) { }

    getSensorData(params: any) {
        const url = 'https://zentracloud.com/api/v3/get_readings';
        const headers = { Authorization: `Token ${this.apkiKey}` };

        return this.httpSerivce.get(url, { headers, params }).pipe(map(response => response.data));
    }
}
