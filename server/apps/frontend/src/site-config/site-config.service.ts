import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Config} from "@libs/db/entity/config.entity";
import {Repository} from "typeorm";

@Injectable()
export class SiteConfigService {
    constructor(
        @InjectRepository(Config)
        private readonly configRepo: Repository<Config>
    ) {}

    async getConfig(): Promise<any>{
        const config = await this.configRepo.query(`
            select * from config
        `)
        return config[0]
    }
}
