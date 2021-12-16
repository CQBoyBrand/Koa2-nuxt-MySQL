/**
 * Author：Brand
 * Email：brandhuang@qq.com
 * CreateTime: 2020/2/13 20:26
 * Description:
 */

export interface ArticleInterface {
    id: number;
    artTitle: string;
    abstract: string;
    category: string;
    tag: string;
    thumbnail: string;
    content: string;
    cdate: number;
    editdate: number;
    pv: number;
    discuss: number;
    status: number;
}
