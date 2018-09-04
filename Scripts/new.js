$(document).ready(() => {
    let eventArray = [];
    const AssignUnique = (selector, idBegin) => {
        $.each($(selector), function (ind) {
            $(this).attr('id', idBegin + parseInt(ind + 1));
        });
    }
    $("#form").on("submit", () => {
        console.log(submit)
    })
    const emptyValue = () => {
        $("#EventName").val("")
        $("#DateOfEvent").val("")
        $("#from").val("")
        $("#to").val("")
        $("#textarea").val("")
    }
    $("#EventName").bind('input', function () {
        let name = $("#EventName").val()

        let addClassForName = name === "" || name === undefined || name === null ? "is-invalid" : "is-valid"

        addClassForName === "is-invalid" ? $("#EventName").removeClass("is-valid") : $("#EventName").removeClass("is-invalid")

        addClassForName === "is-invalid" ? $("#SaveEvent").attr("disabled", true) : $("#SaveEvent").attr("disabled", false)
        $("#EventName").addClass(addClassForName);



    });


    $("#AddEvent").bind("click", () => {
        emptyValue()
        $("#EventModal").modal()
    })
    var i = 1;

    $("#SaveEvent").bind("click", function (event) {


        let counter = 0
        let name = $("#EventName").val();
        let date = $("#DateOfEvent").val();
        let from = $("#from").val();
        let to = $("#to").val();
        let desc = $("#textarea").val();
        let checker = checkForm()


        console.log(checker);

        if (checker === true) {
            eventArray.push({
                index: i,
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

                let span = "<span class=float-right>" + "<button type=button class=button>" + "<i class=fas fa-calendar-minus></i>" + "</button>" + "<button type=button class=button-edit>" + "<i class=fas fa-edit></i>" + "</button>" + "</span>"

                $("<li />", {
                        "class": "border-bottom media",
                        id: "list" + ind
                    })
                    .append($("<img class=mr-3 alt=Generic placeholder image>" + "<div class=media-body>" + " <h5 class=mt-0 mb-1>" + ele.name + "</h5>" + ele.date + "<br/>" + ele.from + ele.to + "</div>"))
                    .append($(span, {
                        "class": "hello",
                        id: "button" + ind
                    }))
                    .appendTo("#listOfEvents");
                $(".button").addClass(" btn btn-danger")
                $(".button-edit").addClass("ml-2 btn btn-info")


            })
            AssignUnique(".button", "remove-");
            AssignUnique(".button-edit", "edit-")
            $(".button").unbind().on("click", remove)
            $(".button-edit").unbind().on("click", Edit)
        } else {
            $("EventModal").modal()
        }







    })
    const remove = (e) => {
        e.preventDefault()
        let id = e.target.id.charAt(e.target.id.length - 1) - 1
        //TODO ALert
        $(`#list${id}`).remove()

    }

    const Edit = (e) => {
        e.preventDefault()
        let id = e.target.id.charAt(e.target.id.length - 1) - 1
        let index = null;

        index = eventArray[e.target.id.charAt(e.target.id.length - 1) - 1]
        console.log("Before", index)
        $("#EditEventName").val(index.name);
        $("#EditDateOfEvent").val(index.date);
        $("#Editfrom").val(index.from);
        $("#Editto").val(index.to);
        $("#Edittextarea").val(index.Description);
        $("#EventEditModal").modal();

        Update(id, index);
    }

    const Update = (id, index) => {
        $("#EditSaveEvent").unbind().on("click", () => {
            console.log("Recieved", index);

            //eventArray.splice(e.target.id.charAt(e.target.id.length - 1) - 1,1)
            index.name = $("#EditEventName").val();
            index.date = $("#EditDateOfEvent").val();
            index.from = $("#Editfrom").val();
            index.to = $("#Editto").val();
            index.desc = $("#Edittextarea").val();

            $("#EventEditModal").modal("hide")


            $(`#list${ id}`).empty().append($("<img class=mr-3 alt=Generic placeholder image>" + "<div class=media-body>" + " <h5 class=mt-0 mb-1>" + $("#EditEventName").val() + "</h5>" + $("#EditDateOfEvent").val() + "<br/>" + $("#Editfrom").val() + $("#Editto").val() + "</div>"))
                .append($("<span class=float-right>" + "<button class=button>" + "<i class=fas fa-calendar-minus></i>" + "</button>" + "<button class=button-edit>" + "<i class=fas fa-edit></i>" + "</button>" + "</span>"));
            $(".button").addClass(" btn btn-danger");
            $(".button-edit").addClass("ml-2 btn btn-info");

        })
    }




})