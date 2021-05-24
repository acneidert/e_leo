export function dateMask(format = 'DD/MM/YYYY'){
  const tokens = ['D', 'M', 'Y', 'H', 'm', 's'];
  const regex = /[0-9]/;
  const arrFormat = format.split('')
  return arrFormat.map(char => {
    if(tokens.includes(char)){
      return regex
    }
    return char;
  })
}