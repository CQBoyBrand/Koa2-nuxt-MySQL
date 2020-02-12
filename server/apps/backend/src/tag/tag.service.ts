import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Tag} from "@libs/db/entity/tag.entity";
import {TagInterface} from "./interface/tag.interface";

@Injectable()
export class TagService {
    constructor(
        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>
    ) {}

    async addTag(params): Promise<TagInterface> {
        const newTag = new Tag()
        newTag.tagdesc = params.tagdesc
        newTag.tagname = params.tagname
        const addTag = await this.tagRepository.save(newTag)
        return  addTag
    }

    async getTagList(params): Promise<TagInterface[]> {
        const tagList = await this.tagRepository.createQueryBuilder('tag')
            .skip( (params.currentPage - 1) * params.limit)
            .take(params.limit)
            .orderBy("tag.cdate", "DESC")
            .getMany()
        return  tagList
    }
    async getTagCount():Promise<number> {
        const tagCount = await this.tagRepository.createQueryBuilder().getCount()

        return tagCount
    }

    async editTag(params): Promise<any>{
        await this.tagRepository.update(params.id, {
            tagname: params.tagname,
            tagdesc: params.tagdesc
        })
    }
    async delTag(params): Promise<any>{
        await this.tagRepository.update(params.id, {
            status: params.status
        })
    }
}
