// Precisamos deste arquivo, pois o sequelize com o parametro raw da erro para os related
// https://stackoverflow.com/questions/40875170/sequelize-js-include-and-raw
// https://github.com/sequelize/sequelize/issues/6334
// Aguardando para corrção do sequelize
import dateUtil from 'date-and-time';

function datefy(obj){
    if(typeof obj === 'object' && obj !== undefined && obj !== null){
        Object.keys(obj).forEach(function(item){
            if(typeof obj[item] === 'object' || typeof obj[item] === 'array') return datefy(obj[item])
            try{
                const newDate = dateUtil.preparse(obj[item], 'YYYY-MM-DD[T]hh:mm:ss[.000Z]')
                if(dateUtil.isValid(newDate)){
                    obj[item] = dateUtil.parse(obj[item], 'YYYY-MM-DD[T]hh:mm:ss[.000Z]', true)
                }
            }catch{
                
            }
        });
    }  
    if(typeof obj === 'array') {
        const len = obj.length();
        for(let i = 0 ; i < len; i += 1){
            obj[i] = datefy(obj[i])
        }
    }

    return obj;
}

export default function toJson(query){
    const jsoned = JSON.parse(JSON.stringify(query))
    return datefy(jsoned);
}