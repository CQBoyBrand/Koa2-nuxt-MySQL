import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Article} from "@libs/db/entity/article.entity";
import {Repository} from "typeorm";

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article)
        private readonly articleRepo: Repository<Article>
    ) {
    }

    async getArticleDetail(params): Promise<any> {
        const sqlQuery = await this.articleRepo.query(`
            select A.id, A.artTitle, A.abstract, 
            (SELECT categoryname FROM category where status = 1 and FIND_IN_SET(A.category, id) ) as category, 
            GROUP_CONCAT(T.tagname) as tag, 
            A.thumbnail, A.pv, 
            (SELECT COUNT(*) FROM comment where artId = A.id ) as discuss, 
             A.content, 
            FROM_UNIXTIME(A.cdate/1000,'%Y-%m-%d %H:%i') as cdate  
            from article as A
            left join tag as T 
            on FIND_IN_SET(T.id , A.tag)
            where A.status = 1 and A.id = ${params.id}
             group by A.id 
        `)
        let articleDetail = sqlQuery[0]
        if(articleDetail.pv){
            const newPv = articleDetail.pv + 1
            articleDetail.pv = newPv
            return await this.articleRepo.update(articleDetail.id, {
                pv: newPv
            }).then( () => {
                return articleDetail
            })
        }

    }

    async getHotArticleList(): Promise<any> {
        const artList = await this.articleRepo.createQueryBuilder('article')
            .where('article.status = :status', {status: 1})
            .take(10)
            .orderBy("article.pv", "DESC")
            .getMany()
        return artList
    }

    async getArchive(): Promise<any> {
        const archiveList = await this.articleRepo.query(`
            select A.id, A.artTitle, A.abstract, 
            (SELECT categoryname FROM category where status = 1 and FIND_IN_SET(A.category, id) ) as category, 
            GROUP_CONCAT(T.tagname) as tag, 
             A.thumbnail,
             A.pv, 
            (SELECT COUNT(*) FROM comment where artId = A.id ) as discuss, 
             A.content, 
            FROM_UNIXTIME(A.cdate/1000,'%Y-%m-%d') as cdate 
            FROM article as A
            left join tag as T 
            on FIND_IN_SET(T.id , A.tag)
            WHERE A.status = 1 
            group by A.id  
            ORDER BY A.cdate DESC;
        `)
        const archiveCount = await this.articleRepo.createQueryBuilder('article')
            .where('article.status = :status',{status: 1})
            .getCount()

        function getDateArr(arr) {
            let year_obj = {};
            let month_obj = {}
            for (var i = 0, len = arr.length; i < len; i++) {
                let Year_index = arr[i].cdate.indexOf('-');
                let year_date = arr[i].cdate.substr(0, Year_index);
                if (!year_obj[year_date]) {
                    year_obj[year_date] = [];
                    year_obj[year_date].push(arr[i])
                } else {
                    year_obj[year_date].push(arr[i])
                }

            }
            return year_obj
        }

        let result = {
            list: getDateArr(archiveList),
            total: archiveCount,
        }
        return result
    }

    async getArticleListAll(params): Promise<any> {
        const artList = await this.articleRepo.query(`
            select 
            A.id, A.artTitle, A.abstract, 
            (SELECT categoryname FROM category where status = 1 and FIND_IN_SET(A.category, id) ) as category, 
            GROUP_CONCAT(T.tagname) as tag, 
            A.thumbnail, A.pv, 
            (SELECT COUNT(*) FROM comment where artId = A.id ) as discuss, 
            A.content, 
            FROM_UNIXTIME(A.cdate/1000,'%Y-%m-%d %H:%i') as cdate  
            from article as A
            left join tag as T 
            on FIND_IN_SET(T.id , A.tag)
            where A.status = 1
            group by A.id    
            ORDER BY A.cdate desc 
            limit ${(params.currentPage - 1) * params.limit}, ${params.limit};
        `)
        let artCount = await this.articleRepo.createQueryBuilder('article')
            .where('article.status = :status',{status: 1})
            .getCount()

        let result = {
            list: artList,
            total: artCount,
        }
        return result
    }

    async getArtListByTag(params): Promise<any>{
        const artListByTag = await this.articleRepo.query(`
            select 
            A.id, A.artTitle,
            (SELECT categoryname FROM category where status = 1 and FIND_IN_SET(A.category, id) ) as category, 
            GROUP_CONCAT(T.tagname) as tag, 
            FROM_UNIXTIME(A.cdate/1000, '%Y-%m-%d %H:%i') as cdate,
            A.abstract, A.thumbnail,
            (SELECT COUNT(*) FROM comment where artId = A.id ) as discuss, 
            A.pv
            from article as A 
            left join tag as T 
            on FIND_IN_SET(T.id, A.tag) 
            where A.status = 1
            AND FIND_IN_SET('${params.tagid}', A.tag) 
            group by A.id 
            ORDER BY A.cdate DESC 
            limit ${(params.currentPage - 1) * params.limit}, ${params.limit};
        `)
        let artCount = await this.articleRepo.query(`
            SELECT COUNT(*) as total FROM article where status = 1 and FIND_IN_SET('${params.tagid}', tag);
        
        `)
        let result = {
            list: artListByTag,
            total: Number(artCount[0].total),
        }
        return result
    }

    async getArtListByCategory(params): Promise<any>{
        const artListByCategory = await this.articleRepo.query(`
            select 
            A.id, A.artTitle,
            (SELECT categoryname FROM category where status = 1 and FIND_IN_SET(A.category, id) ) as category, 
            GROUP_CONCAT(T.tagname) as tag, 
            FROM_UNIXTIME(A.cdate/1000, '%Y-%m-%d %H:%i') as cdate,
            A.abstract, A.thumbnail, A.pv, 
            (SELECT COUNT(*) FROM comment where artId = A.id ) as discuss
            from article as A 
            left join tag as T 
            on FIND_IN_SET(T.id, A.tag) 
            where A.status = 1
            AND FIND_IN_SET('${params.categoryid}', A.category) 
            group by A.id 
            ORDER BY A.cdate DESC 
            limit ${(params.currentPage - 1) * params.limit}, ${params.limit};
        `)
        let artCount = await this.articleRepo.query(`
            SELECT COUNT(*) as total FROM article where status = 1 and FIND_IN_SET('${params.categoryid}', category);
        
        `)
        let result = {
            list: artListByCategory,
            total: Number(artCount[0].total),
        }
        return result
    }

    async getArtListByKeywords(params): Promise<any>{
        const artListByCategory = await this.articleRepo.query(`
            select
            A.id, A.artTitle,
            (SELECT categoryname FROM category where status = 1 and FIND_IN_SET(A.category, id) ) as category,
            GROUP_CONCAT(T.tagname) as tag,
            FROM_UNIXTIME(A.cdate/1000, '%Y-%m-%d %H:%i') as cdate,
            A.abstract, A.thumbnail, A.pv, 
            (SELECT COUNT(*) FROM comment where artId = A.id ) as discuss
            from article as A
            left join tag as T
            on FIND_IN_SET(T.id, A.tag)
            where (
                A.artTitle like "%${params.keyword}%"
                or
                A.content like "%${params.keyword}%"
                or
                A.abstract like "%${params.keyword}%"
            )
            AND A.status = 1
            group by A.id
            ORDER BY A.cdate DESC
            limit ${(params.currentPage - 1) * params.limit}, ${params.limit};
        `)
        let artCount = await this.articleRepo.query(`
            SELECT COUNT(*) as total FROM article where
            (
                artTitle like "%${params.keyword}%"
                or
                content like "%${params.keyword}%"
                or 
                abstract like "%${params.keyword}%"
            )
            and status = 1 ;
        
        `)
        let result = {
            list: artListByCategory,
            total: Number(artCount[0].total),
        }
        return result
    }
}
