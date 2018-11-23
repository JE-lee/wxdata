export default function(v){
  return Object.prototype.toString.call(v).slice(8, -1).toLowerCase()
}