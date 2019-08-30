let FileDownloadUtil = {
    //下载文件 res:blob类型的文件 fileNm:文件名称
    downloadFile(res,fileNm){
        const blob = new Blob([res]);
        const fileName = fileNm;
        if ('download' in document.createElement('a')) { // 非IE下载
            const elink = document.createElement('a');
            elink.download = fileName;
            elink.style.display = 'none';
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href); // 释放URL 对象
            document.body.removeChild(elink);
        } else { // IE10+下载
            navigator.msSaveBlob(blob, fileName);
        }
    }
};



export  default FileDownloadUtil;


