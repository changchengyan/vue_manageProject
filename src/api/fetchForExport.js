/**
 *
 *  @desc 针对 导出 文件流的 处理封装
 *
 */

import axios from 'axios';

let token = sessionStorage.getItem('__token__');

export default function fetch2(options,context){
    return new Promise((resolve,reject)=>{
        const  INSTACE = axios.create({
            headers:{
                'Content-type':'application/json',
                '__token__':token
            },
            responseType: 'blob',//设置responseType，解决导出乱码问题
            timeout:30*1000,
            withCredentials: true
        });
        let promise=null;
        let method = options.method.toLowerCase();

        if( method==='get'){
            promise = INSTACE.get(options.url,{ params : options.params });
        }else if(method==='post'){
            promise = INSTACE.post(options.url,options.params);
        }

        promise.then(res=>{

            if (res.data.msg == '操作失败') {
                context.$message.error('服务错误!');
                return;
            }
            if (res.data.msg == 'no user') {
                window.location.href = `${window.DSE.base_api_url}/jump.jsp?jumpUrl=${window.DSE.baseURL}?id=${window.id}`;
                return;
            }
            if(res.status===200||res.status===1){
                resolve(res.data);
            }else{
              context.$message.error(res.msg);
            }
        }).catch(error=>{

            if(context){
                context.$message.error('业务逻辑错误！');
            }
            console.log(error);
        });
    });
}
