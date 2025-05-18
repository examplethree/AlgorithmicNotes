function quickSort(arr, left, right){
    if(left >= right) return;
    let pivotIdx = partition(arr, left, right);

    quickSort(arr, left, pivotIdx-1);
    quickSort(arr, pivotIdx+1, right);

    return arr;
}

function partition(nums, left, right){
    let pivot = nums[right];
    let i=left; // i 指向比 pivot 小的区域的右边界

    for(let j=left; j<right; j++){
        if(nums[j] < pivot){
            [nums[j], nums[i]] = [nums[i], nums[j]];
            i++; // 扩展 "小于 pivot" 区域的边界
        }
    }
    // 将基准值放到正确位置 (即 i 位置)
    [nums[i], nums[right]] = [nums[right], nums[i]];
    return i; // 返回基准值所在位置
}

let nums=[3, 6, 8, 10, 1, 2, 1];
quickSort(nums, 0, nums.length-1);
console.log(nums)

