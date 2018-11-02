/**  
      * 过滤字符串函数  
      **/ 
export function filterStr(str)  
{  
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%+_]");  
    var specialStr = "";  
    for(var i=0;i<str.length;i++)  
    {  
        specialStr += str.substr(i, 1).replace(pattern, '');   
    }  
    return specialStr;  
}