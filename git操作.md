[git rebase 用法详解与工作原理](https://waynerv.com/posts/git-rebase-intro/)

rebase的使用注意点
* 执行rebase变基后，此时如果你的本地分支已经被推到了远程，你需要在变基后强制推。这将用您的本地分支的最新重新定基和更新的版本替换旧的远程版本。
`git push -f`

#### rebase的使用场景
1. 更简洁的提交记录，对于分支复杂且需要频繁从主分支拉取代码的项目，省去大量额外的commit记录

2. 有更清晰的提交顺序和更改时间，有利于定位哪一次commit引入了bug