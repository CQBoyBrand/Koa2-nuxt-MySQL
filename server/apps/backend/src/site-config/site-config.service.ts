import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Config} from "@libs/db/entity/config.entity";
import {Repository} from "typeorm";
import {CustomException} from "@common/common/common/http.decoration";

@Injectable()
export class SiteConfigService {
    constructor(
        @InjectRepository(Config)
        private readonly configRepository: Repository<Config>
    ) {}

    async addConfig(params): Promise<any> {
        return await this.configRepository.query(`
            insert into config set discussStatus = ${params.discussStatus}, icp = '${params.icp}' ,psr = '${params.psr}';
        `).then( res => {
            return '操作成功'
        }).catch((err) => {
            console.log('add-err==', err)
            throw new CustomException('操作失败')
        })
    }

    async editConfig(params): Promise<any> {
        return await this.configRepository.query(`
            update config set discussStatus = ${params.discussStatus}, icp = '${params.icp}', psr = '${params.psr}' where id = ${params.id};
        `).then( res => {
            return '操作成功'
        }).catch((err) => {
            console.log('edit-err==', err)
            throw new CustomException('操作失败')
        })
    }

    async getConfig(): Promise<any> {
        const config = await this.configRepository.query(`
            select id, discussStatus, icp, psr from config;
        `)
        return config[0]
    }
}
