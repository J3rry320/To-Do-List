$(document).ready(() => {
    let eventArray = [];
const AssignUnique=(selector,idBegin)=>{
    $.each($(selector), function(ind) {
        $(this).attr('id', idBegin + parseInt(ind + 1));
     });
}
    const emptyValue = () => {
        $("#EventName").val("")
        $("#DateOfEvent").val("")
        $("#from").val("")
        $("#to").val("")
        $("#textarea").val("")
    }
    $("#AddEvent").bind("click", () => {
        emptyValue()
        $("#EventModal").modal()
    })
    var i = 1;
    $("#SaveEvent").bind("click", function () {
        let counter = 0
        let name = $("#EventName").val();
        let date = $("#DateOfEvent").val();
        let from = $("#from").val();
        let to = $("#to").val();
        let desc = $("#textarea").val();



        eventArray.push(  {
            index:i,
            name: name,
            date: date,
            from: from,
            to: to,
            Description: desc
        })
        i++

        $("#listOfEvents").empty()

        $("#EventModal").modal("hide")
        eventArray.forEach((ele, ind) => {

            let span="<span class=float-right>" + "<button class=button>" + "<i class=fas fa-calendar-minus></i>" + "</button>" + "<button class=button-edit>" + "<i class=fas fa-edit></i>" + "</button>" + "</span>"

            $("<li />", {
                    "class": "border-bottom media",
                    id: "list"+ind
                })
                .append($("<img class=mr-3 alt=Generic placeholder image>" + "<div class=media-body>" + " <h5 class=mt-0 mb-1>" + ele.name + "</h5>" + ele.date + "<br/>" + ele.from + ele.to + "</div>"))
                .append($(span,{"class":"hello",id:"button"+ind}))
                .appendTo("#listOfEvents");
                $(".button").addClass(" btn btn-danger")
                $(".button-edit").addClass("ml-2 btn btn-info")


        })
        AssignUnique(".button","remove-");
        AssignUnique(".button-edit","edit-")
        $(".button").bind("click", (e) => {



            console.log(e,)
                                let id = e.target.id.charAt(e.target.id.length - 1)
                                $(`#list${id}`).remove()

                            })
                            $(".button-edit").bind("click",(e)=>{
            console.log(e.target.id)
            console.log(eventArray[e.target.id.charAt(e.target.id.length - 1)-1])
                            })






    })






})