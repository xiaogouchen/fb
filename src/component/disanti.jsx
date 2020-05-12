/**
 * 第三题的优化思路(个人理解)
 *  
 * let table = []
 * for(let i , i <= 3, i++) {
 *  table.push({
 *    title: `标题${i}`,
 *    key: i,
 *    render: item => <a href = (`http://xxxx.com/` + i)>item${i}</a>
 * })
 * }
 */