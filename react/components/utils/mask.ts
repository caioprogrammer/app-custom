export const MASK_CEP = (e: any) => {
  const input = e.target
  let value = e.target.value
  input.setAttribute('minlength', 9)
  input.setAttribute('maxlength', 9)
  value = value.replace(/D/g, '') //Remove tudo o que não é dígito
  value = value.replace(/^(\d{5})(\d)/, '$1-$2') //Esse é tão fácil que não merece explicações
  return (input.value = value)
}
