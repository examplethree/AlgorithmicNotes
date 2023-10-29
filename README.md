# Leetcode刷题笔记

## 单调栈

## 贪心

## 二分法
 * 222. Count Complete Tree Nodes(10.26)  位运算，二分法（解法启发对mid值上下取整的思考）  mid取上整可用`mid = (l+r+1)/2`或`mid = l + (r-l+1)/2`，取下整则为`mid = (l+r)/2`或`mid = l + (r-l)/2`。默认`/`符号表示向下取整，JS中使用取整函数。
  
 * 74. Search a 2D Matrix(10.27)  *二分法取整出现死循环问题（该问题出现于while的进入条件为`while(l<r)`，即不取等号；取等号的写法能避免上下取整导致的死循环问题）*  `low=mid`（即if的判断条件是`mid>target`）mid应该向上取整；`high=mid`（即判断条件`mid<target`）应该向下取整。
  * 
  
 * 240. Search a 2D Matrix II（10.28）  二维查找问题的二分法

```

```