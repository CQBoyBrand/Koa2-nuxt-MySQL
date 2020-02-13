import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Category} from "@libs/db/entity/category.entity";
import {Repository} from "typeorm";
import {CategoryInterface} from "./interface/category.interface";

@Injectable()
export class CategoryService {
    constructor(
       @InjectRepository(Category)
       private readonly categoryRepository: Repository<Category>
    ) {}

    async addCategory(params): Promise<CategoryInterface> {
        const newCategory = new Category()
        newCategory.categorydesc = params.categorydesc
        newCategory.categoryname = params.categoryname
        const addCategory = await this.categoryRepository.save(newCategory)
        return  addCategory
    }

    async getCategoryList(params): Promise<CategoryInterface[]> {
        const categoryList = await this.categoryRepository.createQueryBuilder('category')
            .skip( (params.currentPage - 1) * params.limit)
            .take(params.limit)
            .orderBy("category.cdate", "DESC")
            .getMany()
        return  categoryList
    }

    async getAllCategory(params): Promise<CategoryInterface[]> {
        const allCategory = await this.categoryRepository.createQueryBuilder('category')
            .getMany()
        return  allCategory
    }
    async getCategoryCount():Promise<number> {
        const categoryCount = await this.categoryRepository.createQueryBuilder().getCount()

        return categoryCount
    }

    async editCategpry(params): Promise<any>{
        await this.categoryRepository.update(params.id, {
            categoryname: params.categoryname,
            categorydesc: params.categorydesc
        })
    }
    async delCategory(params): Promise<any>{
        await this.categoryRepository.update(params.id, {
            status: params.status
        })
    }
}
