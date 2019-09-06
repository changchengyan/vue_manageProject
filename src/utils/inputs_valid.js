/**
 * 基本表单的校验
 */


export default class Valid{

    // 判断是否是数字 或者带有小数点的浮点数
    isNumber(val){
        let  temp =val;
        if(!val) return ;
        let reg =  /^[0-9]+\.?[0-9]+?$/;
        return  reg.test(temp);
    }
    // 手机号
    isPhone(val){
        let  temp =val;
        if(!val) return ;
        let reg = /^1\d{10}$/;
        return  reg.test(temp);
    }
    // 固定手机号
    isTel(val){
        let  temp =val;
        if(!val) return ;
        let reg = /^0\d{2,3}-?\d{7,8}$/;
        return  reg.test(temp);
    }
    // 判断是否是邮箱
    isEmail(val){
        let temp  = val;
        if(!val) return ;
        let reg = /^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[.][a-z]{2,3}([.][a-z]{2})?$/i;
        return  reg.test(temp);
    }
    //  判断是否是 正整数
    isInt(val){
        if(!val) return ;
        let re = /^[0-9]+$/;
        return  re.test(val);
    }
    // 判断是否是 正的浮点数
    isFloat(val){
        if(!val) return ;
        let re = /^\d+\.\d+$/;
        return re.test(val);
    }
    // 只包含 字母和数字
    isNotHan(val){
        if(!val) return ;
        let re = /^[a-zA-Z_\-0-9]+$/;
        return re.test(val);
    }
    // 验证经度
    isLgtd(val){
        if(!val) return ;
        let re = /^-?((0|1?[0-7]?[0-9]?)(([.][0-9]{1,6})?)|180(([.][0]{1,6})?))$/;
        return re.test(val);
    }
    // 验证维度
    isLttd(val){
        if(!val) return ;
        let re = /^-?((0|[1-8]?[0-9]?)(([.][0-9]{1,6})?)|90(([.][0]{1,6})?))$/;
        return re.test(val);
    }

}
