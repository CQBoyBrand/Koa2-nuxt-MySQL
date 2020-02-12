import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Link} from "@libs/db/entity/link.entity";
import {Repository} from "typeorm";
import {LinkInterface} from "./interface/link.interface";

@Injectable()
export class LinkService {
    constructor(
        @InjectRepository(Link)
        private readonly linkRepository: Repository<Link>
    ) {}

    async addLink(params): Promise<Link> {
        let link = new Link()
        link.siteName = params.siteName
        link.siteUrl = params.siteUrl
        return this.linkRepository.save(link)
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
        await this.linkRepository.update(params.id, {
            siteName: params.siteName,
            siteUrl: params.siteUrl
        })
    }

    async deleteLink(params):Promise<any> {
        await this.linkRepository.update(params.id, {
            status: params.status
        })
    }

}
