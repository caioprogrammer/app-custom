//@ts-ignore
export const toMoney = function (e) {
  //@ts-ignore
  return (parseInt(e).toFixed() * 0.01).toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  })
}
