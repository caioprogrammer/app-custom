export default function getFormattedPrice(price?: string | number): string {
  if (!price) {
    return '0'
  }
  price = price || 0
  price = price.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return `R$ ${price}`
}
