export function mapJSONL(arr, selectKeys, delim) {
    return arr.map(obj => selectKeys.map(k => obj[k]).join(delim))
}
// ignore extremely jank unit test 
function tests() {
    const res = joinObjectArray([{ name: "john", age: 12, city: "nyc" }, { name: "kate", age: 10, city: "sf" }], ['name', 'city'], ':')
    console.log('testJoinObjectArray passes', res[0] === "john:nyc" && res[1] === "kate:sf")
}
