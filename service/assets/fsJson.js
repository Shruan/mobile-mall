// 数据过滤

const fs = require('fs')
fs.readFile('./goods.json', 'utf8', function(err, data){
  let newData= JSON.parse(data)
  let i=0
  let pushData=[]
  newData.RECORDS.map(function(item,index){
      if(item.IMAGE1!=null){
          i++
          console.log(item.NAME)
          pushData.push(item)
      }
  })
  console.log(i)
  console.log(pushData)

  fs.writeFile('./newGoods.json',JSON.stringify(pushData),function(err){
    if(err) console.log('写文件操作失败');
    else console.log('写文件操作成功');
  });
});
