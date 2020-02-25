import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Link} from "@libs/db/entity/link.entity";
import {Repository} from "typeorm";
import {LinkInterface} from "./interface/link.interface";
import {CustomException} from "@common/common/common/http.decoration";

@Injectable()
export class LinkService {
    constructor(
        @InjectRepository(Link)
        private readonly linkRepository: Repository<Link>
    ) {}

    async addLink(params): Promise<any> {
        let link = new Link()
        link.siteName = params.siteName
        link.siteUrl = params.siteUrl
        return this.linkRepository.save(link).then(() => {
            return '操作成功'
        }).catch( (err) => {
            console.log('addLink-err=', err)
            throw new CustomException('操作失败')
        })
    }
    async getLinkCount (): Promise<number> {
        return await this.linkRepository.createQueryBuilder('link').getCount()
    }
    async getLinkList (params): Promise<LinkInterface[]>{
        const linkList = await this.linkRepository.createQueryBuilder('link')
            .skip( (params.currentPage - 1) * params.limit)
            .take(params.limit)
            .orderBy("link.cdate", "DESC")
            .getMany()
        return  linkList
    }

    async updateLink (params): Promise<any> {
        return await this.linkRepository.update(params.id, {
            siteName: params.siteName,
            siteUrl: params.siteUrl
        }).then(() => {
            return '操作成功'
        }).catch( (err) => {
            console.log('updateLink-err=', err)
            throw new CustomException('操作失败')
        })
    }

    async deleteLink(params):Promise<any> {
        return await this.linkRepository.update(params.id, {
            status: params.status
        }).then(() => {
            return '操作成功'
        }).catch( (err) => {
            console.log('deleteLink-err=', err)
            throw new CustomException('操作失败')
        })
    }

}
