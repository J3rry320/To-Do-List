$(document).ready(()=>{
    let eventArray=[];
    let counter=0
const emptyValue=()=>{
    $("#EventName").val("")
    $("#DateEvent").val("")
    $("#from").val("")
    $("#to").val("")
    $("#textarea").val("")
}
    $("#AddEvent").bind("click",()=>{
    emptyValue()
   $("#EventModal").modal()
    })
    $("#SaveEvent").bind("click",()=>{
eventArray.push({event:{name:$("#EventName").val(),
date:$("#DateEvent").val(),
from:$("#from").val(),
to:$("#to").val(),
Description:$("#textarea").val()






}})
console.log(eventArray)
$("#EventModal").modal("hide")
    })

})