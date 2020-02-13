import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Article} from "@libs/db/entity/article.entity";
import {Repository} from "typeorm";

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article)
        private readonly articleRepository: Repository<Article>
    ) {}

    async addArticle(params): Promise<any>{
        const currentTime = new Date().getTime()
        const newArticle = new Article()
        newArticle.id = currentTime
        newArticle.artTitle = params.artTitle
        newArticle.abstract = params.abstract
        newArticle.category = params.category
        newArticle.content = params.content
        newArticle.tag = params.tag
        newArticle.thumbnail = params.thumbnail
        newArticle.cdate = currentTime
        newArticle.editdate = currentTime
        newArticle.pv = 0
        newArticle.discuss = 0
        newArticle.status = 0
        return await this.articleRepository.save(newArticle).then(res => {
            return 'success'
        }).catch( err => {
            return 'fail'
        })
    }

    async editArticle(params): Promise<any>{
        console.log('params=',params)
        const currentTime = new Date().getTime()
        return await this.articleRepository.update(params.id, {
            artTitle: params.artTitle,
            abstract: params.abstract,
            category: params.category,
            content: params.content,
            tag: params.tag,
            thumbnail: params.thumbnail,
            editdate: currentTime,
        }).then(res => {
            console.log('res==', res)
            return 'success'
        }).catch( err => {
            console.log('res==', err)
            return 'fail'
        })
    }

    async getArtList(params): Promise<any>{
        const artList = await this.articleRepository.createQueryBuilder('article')
            .skip( (params.currentPage - 1) * params.limit)
            .take(params.limit)
            .orderBy("article.cdate", "DESC")
            .getMany()
        return artList
    }
    async getArticleDetail(params): Promise<any>{
        const articleDetail = await this.articleRepository.
            createQueryBuilder('article').
            where('article.id= :id',{id: params.id}).getOne()
        return articleDetail
    }

    async getArtCount():Promise<number> {
        return await this.articleRepository.createQueryBuilder().getCount()
    }

    async deleteArticle(params): Promise<any> {
        return await this.articleRepository.update(params.id, {
            status: params.status
        }).then( res => {
            const affectedRows = res.raw.affectedRows
            if(affectedRows > 0){
                return 'success'
            } else {
                return 'fail'
            }
        })

    }
}
