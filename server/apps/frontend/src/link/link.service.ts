import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Link} from "@libs/db/entity/link.entity";
import {Repository} from "typeorm";

@Injectable()
export class LinkService {
    constructor(
        @InjectRepository(Link)
        private readonly linkRepo: Repository<Link>
    ) {}

    async getLink(): Promise<any>{
        return await this.linkRepo.query(`
            select siteName, siteUrl from link where status = 1;
        `)
    }
}
