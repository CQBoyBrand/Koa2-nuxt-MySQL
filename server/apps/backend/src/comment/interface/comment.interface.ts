/**
 * Author：Brand
 * Email：brandhuang@qq.com
 * CreateTime: 2020/2/10 21:03
 * Description:
 */

export interface CommentInterface {
    id: number;
    artId: number;
    content: any;
    from_uname: string;
    from_uemail: string;
    from_uavatar: string;
    from_uweb: string;
    cdate: number;
    to_uname: string;
    to_uavatar: string;
    to_uemail: string;
    to_uweb: string;
    oldContent: string;
    oldCdate: number;
    oldId: number;
    isChecked: number;
}
