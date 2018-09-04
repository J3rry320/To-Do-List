$(document).ready(() => {
    const date = new Date();
    const regExForTime = /[^:]\d/g;
    let eventArray = [];

    let suffix = date.getDate() < 10 || date.getMonth() + 1 <= 9 ? "0" : "";

    let day = date.getFullYear().toString() + "-" + suffix + (date.getMonth() + 1).toString() + "-" + suffix + date.getDate().toString();
    const AssignUnique = (selector, idBegin) => {
        $.each($(selector), function (ind) {
            $(this).attr('id', idBegin + parseInt(ind + 1));
        });
    }
    const setCookie = (arr) => {
        if (localStorage) {
            localStorage.setItem("Events", JSON.stringify(arr))
        } else {
            alert("Fuck Off Upgrade Your Browser Bitch")
        }
    }
    const checkCokkie = () => {
        let cookie = JSON.parse(localStorage.getItem("Events"))
        if (cookie != null) {
            console.log(cookie)
            cookie.forEach((ele, ind) => {
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
            })

        }
    }
    $("#form").on("submit", () => {
        console.log(submit)
    })
    const emptyValue = () => {
        $("#EventName").val("").removeClass("is-valid")
        $("#DateOfEvent").val("").removeClass("is-valid")
        $("#from").val("").removeClass("is-valid")
        $("#to").val("").removeClass("is-valid")
        $("#textarea").val("").removeClass("is-valid")
        $("#eventKind").val("").removeClass("is-valid")
    }
    const checkAgain = () => {
        let string = [];
        let counter = 0,
            invalid = 0;
        $("#form :input").each(function () {

            string.push($(this).attr("class"))

        })
        string.forEach(ele => {

            if (ele === "form-control is-valid") {
                counter += 1



            } else {
                invalid += 1

            }

        })
        return {
            valid: counter,
            invalid: invalid
        }
    }
const DateValidator=(dateVal,day)=>{



  return  (parseInt(dateVal.match(/[^-]\d/g).join("")) < parseInt(day.match(/[^-]\d/g).join("")))
}
    const checker = () => {


        $("#EventName").bind('input', function () {
            let name = $("#EventName").val()

            let addClassForName = name === "" || name === undefined || name === null ? "is-invalid" : "is-valid"

            addClassForName === "is-invalid" ? $("#EventName").removeClass("is-valid") : $("#EventName").removeClass("is-invalid")


            $("#EventName").addClass(addClassForName);
            checkAgain().invalid !== 0 ? $("#SaveEvent").attr("disabled", true) : $("#SaveEvent").attr("disabled", false)
        });
        $("#DateOfEvent").bind('input', function () {
            let name = $("#DateOfEvent").val()
            let addClassForName = name === "" || name === undefined || name === null ||DateValidator(name,day)  ? "is-invalid" : "is-valid"

            addClassForName === "is-invalid" ? $("#DateOfEvent").removeClass("is-valid") : $("#DateOfEvent").removeClass("is-invalid")


            $("#DateOfEvent").addClass(addClassForName);
            checkAgain().invalid !== 0 ? $("#SaveEvent").attr("disabled", true) : $("#SaveEvent").attr("disabled", false)

        });
        $("#from").bind('input', function () {
            let name = $("#from").val()

            let milisecond = date.getTime();
            let time = new Date(milisecond)
            let timeNow = time.toLocaleTimeString()
            DateValidator($("#DateOfEvent").val(),day)
            let addClassForName = parseInt(name.match(regExForTime).join("")) < parseInt(timeNow.match(regExForTime).join("").substring(0, 4)) || name === "" || name === undefined || name === null ? "is-invalid" : "is-valid"

            addClassForName === "is-invalid" ? $("#from").removeClass("is-valid") : $("#from").removeClass("is-invalid")


            $("#from").addClass(addClassForName);
            checkAgain().invalid !== 0 ? $("#SaveEvent").attr("disabled", true) : $("#SaveEvent").attr("disabled", false)

        });
        $("#to").bind('input', function () {

            let name = $("#to").val();
            let from = $("#from").val();


            let addClassForName = parseInt(name.match(regExForTime).join("")) <= parseInt(from.match(regExForTime).join("")) || name === "" || name === undefined || name === null ? "is-invalid" : "is-valid"

            addClassForName === "is-invalid" ? $("#to").removeClass("is-valid") : $("#to").removeClass("is-invalid")


            $("#to").addClass(addClassForName);
            checkAgain().invalid !== 0 ? $("#SaveEvent").attr("disabled", true) : $("#SaveEvent").attr("disabled", false)

        });
        $("#textarea").bind('input', function () {
            let name = $("#textarea").val()

            let addClassForName = name === "" || name === undefined || name === null ? "is-invalid" : "is-valid"

            addClassForName === "is-invalid" ? $("#textarea").removeClass("is-valid") : $("#textarea").removeClass("is-invalid")


            $("#textarea").addClass(addClassForName);

            checkAgain().invalid !== 0 ? $("#SaveEvent").attr("disabled", true) : $("#SaveEvent").attr("disabled", false)
        });
        $("#eventKind").bind("input", () => {
            let name = $("#eventKind").val()


            let addClassForName = name === "" || name === undefined || name === null ? "is-invalid" : "is-valid"

            addClassForName === "is-invalid" ? $("#eventKind").removeClass("is-valid") : $("#eventKind").removeClass("is-invalid")


            $("#eventKind").addClass(addClassForName);

            checkAgain().invalid !== 0 ? $("#SaveEvent").attr("disabled", true) : $("#SaveEvent").attr("disabled", false)
        })




    }


    $("#AddEvent").bind("click", () => {
        emptyValue();
        $("#SaveEvent").attr("disabled", true);
        $("#EventModal").modal();

        checker()
    })
    var i = 1;

    $("#SaveEvent").bind("click", function (event) {



        let name = $("#EventName").val();
        let date = $("#DateOfEvent").val();
        let from = $("#from").val();
        let to = $("#to").val();
        let desc = $("#textarea").val();
        let value = $("#eventKind").val();


        eventArray.push({
            index: i,
            name: name,
            date: date,
            from: from,
            to: to,
            value: value,
            Description: desc
        })
        i++
        setCookie(eventArray)
        checkCokkie()
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

    console.log()


})