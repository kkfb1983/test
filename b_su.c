/***
*  @name           Status insertBTree(BTree &T, Record e)
*  @description    插入实现元素的插入
*  @return         成功返回OK,如果存在则返回FALSE，否则返回ERROR
*  @notice
***/
Status insertBTree(BTree &T, Record e)
{
    BTree p;
    int index, temp;
    Status find_flag;
    if (NULL == T)//考虑B树为空树的情况
    {
        T = (BTree)malloc(BTLEN);
        if (NULL == T) return OVERFLOW;
        T->keynum = 1;
        T->parent = NULL;
        for (index = 0;index <= m; ++index)
        {
            T->ptr[index] = NULL;
            T->key[index] = 0;
        }
        T->key[1] = e.key;
        return OK;
    }
    find_flag = findBTree(T, p, temp, e.key);//寻找插入节点
    if (find_flag == TRUE)
    {
        return FALSE;
    }
    if (find_flag == FALSE)
    {                                //不管怎样先直接插入
        p->keynum++;
        for (index = p->keynum;index > temp;--index)
        {
            p->key[index] = p->key[index - 1];
            p->ptr[index] = p->ptr[index - 1];
        }
        p->ptr[temp] = NULL;
        p->key[temp] = e.key;
        if (p->keynum == m)      //这种情况得分裂
        {
            splitBTree(p);
        }
        renewParent(T);
        return OK;
    }
    return ERROR;
}
