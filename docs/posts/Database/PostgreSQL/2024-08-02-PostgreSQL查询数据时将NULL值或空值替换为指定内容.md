---
# 文章标题
title: 【FAQ】PostgreSQL 查询数据时将 NULL 值或 ‘’ 值替换为指定内容
# 当前页面的短标题，会在导航栏、侧边栏和路径导航中作为首选。
shortTitle: PgSQL 查询数据时将空值替换为指定内容
# 当前页面内容描述。
description: 
# 当前页面的图标，建议填写
icon: PostgreSQL
# 作者
author: 昌霖学长
# 当前文章是否为原创
isOriginal: true
# 设置写作时间
date: 2024-08-02
# 分类，一个页面可以有多个分类
categories: 
  - 数据库
  - PostgreSQL
# 标签，一个页面可以有多个标签
tags: 
  - PostgreSQL
  - FAQ
  - SQL
# 页面的协议信息
license: MIT
# 置顶标记（true/false/数字），当填入数字时，数字越大，排名越靠前。
sticky: false
# 星标（true/false/数字），当填入数字时，数字越大，排名越靠前。
star: false
# 是否将该文章添加至文章列表中。
article: true
# 是否将该文章添加至时间线中。
timeline: true
# 是否开启评论
comment: false
# 预览图。请填入绝对路径。图片路径位于 .vuepress/public 下
# cover: /assets/images/cover1.jpg
# 设置横幅图片 (宽屏分享图)，请填入绝对路径。
# banner: /assets/images/cover1.jpg
---

在 PostgreSQL 数据库中查询数据时将 NULL 值或 ’’ 值替换为指定内容。

**举例**：

```sql
// 可以和其他函数配合来实现一些复杂点的功能：
// 查询学生姓名，如果学生名字为null或''则显示“姓名为空”
select case when coalesce(name,'') = '' then '姓名为空' else name end from student;
```

**原因解释**：
`COALESCE` 函数是返回参数中的第一个非 NULL 的值，它要求参数中至少有一个是非 NULL 的，如果参数都是 NULL 会报错。

```sql
select COALESCE(null,null); //报错
select COALESCE(null,null,now()::varchar,''); //结果会得到当前的时间
select COALESCE(null,null,'',now()::varchar); //结果会得到''
```
