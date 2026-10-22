
export default interface ErrorProps{
  code:string,
  message:string,
  details?:{field:string, message:string}[]
}
