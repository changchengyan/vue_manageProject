/**
 *
 *  针对 json 格式的  数据请求封装
 *
 */
import axios from 'axios';


let token = sessionStorage.getItem('__token__');

export default function fetch(options,context){
    return new Promise((resolve,reject)=>{
        const  INSTACE = axios.create({
            headers:{
                'Content-type':'application/json',
                '__token__':token
            },
            timeout:30*1000,
            withCredentials: true
        });
        let promise=null;
        let method = options.method.toLowerCase();

        if( method==='get'){
            promise = INSTACE.get(options.url,{ params : options.params });
        }else if(method==='post'){
            promise = INSTACE.post(options.url,options.params);
        }else if(method==='delete'){
            promise = INSTACE.delete(options.url,options.params);
        }

        promise.then(res=>{

            if (res.data.msg == '操作失败') {
                context.$message.error('服务错误!');
                return;
            }

            if(res.status==400){
                window.location.href = window.DSE.base_api_url+'/#/login';
                return;
            }

            if (res.data.msg == 'no user') {
                window.location.href = window.DSE.base_api_url+'/#/login';
                return;
            }

            if(res.status===200||res.status===1){
                resolve(res.data);
            }else{
              context.$message.error(res.msg);
            }

            resolve(res);
        }).catch(error=>{

            if(context){
                context.$message.error('业务逻辑错误！');
            }
            console.log(error);

			reject(error);
        });
    });
}
