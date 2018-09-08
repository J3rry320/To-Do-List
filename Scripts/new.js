$(document).ready(() => {
    //localStorage.clear();
    $(document).off("click")
    const date = new Date();
    const regExForTime = /[^:]\d/g;
    let eventArray = [];

    let suffix = date.getDate() < 10 || date.getMonth() + 1 <= 9 ? "0" : "";

    let day = date.getFullYear().toString() + "-" + suffix + (date.getMonth() + 1).toString() + "-" + suffix + date.getDate().toString();
    const iconCreator = (iconKind) => {
        return iconKind === "Emergency" ? "fas fa-exclamation-triangle" : iconKind === "Family" ? "far fa-kiss-wink-heart" : iconKind === "Work" ? "fas fa-user-tie" : iconKind === "Hobby" ? "fas fa-headphones" : iconKind === "Leisure" ? "fas fa-coffee" : null
    }
    const ListCreator = (arr) => {
        arr.forEach((ele, ind) => {
            console.log(ele)

            let span = "<span class=float-right>" + "<button type=button class=button>" + "<i class=remove-icon></i>" + "</button>" + "<button type=button class=button-edit>" + "<i class=edit-icon></i>" + "</button>" + "</span>"

            $("<li />", {
                    "class": "border-bottom pt-5 mt-1 pb-4 media",
                    id: "list" + ind
                })
                .append($("<i class=descriptor-icon></i>" + "<div class=media-body>" + " <h5 class=mt-0 mb-1>" + ele.name + "</h5>" + ele.date + "<br/>" + ele.from + ele.to + "</div>"))
                .append($(span, {
                    "class": "hello",
                    id: "button" + ind
                }))
                .appendTo("#listOfEvents");


            $(".remove-icon").addClass("fas fa-calendar-minus");
            $(".edit-icon").addClass("fas fa-edit");
            $(".button").addClass(" btn btn-danger");
            $(".button-edit").addClass("ml-2 btn btn-info");


        })
        for(let ind=0;ind<arr.length;ind++){

            $(`#list${ind}`).find("i.descriptor-icon").addClass(`${iconCreator(arr[ind].value)} pt-3 pl-3 pr-3`)
        }


        AssignUnique(".button", "remove-");
        AssignUnique(".button-edit", "edit-")
        AssignUnique(".remove-icon","remove-icon")
        AssignUnique(".edit-icon","edit-icon")
    }

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

            cookie.forEach(ele => {
                eventArray.push(ele)
            })
            ListCreator(eventArray)




        }

    }
    checkCokkie()
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

    const DateValidator = (dateVal, day) => {



        return (parseInt(dateVal.match(/[^-]\d/g).join("")) < parseInt(day.match(/[^-]\d/g).join("")))
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
            let addClassForName = name === "" || name === undefined || name === null || DateValidator(name, day) ? "is-invalid" : "is-valid"

            addClassForName === "is-invalid" ? $("#DateOfEvent").removeClass("is-valid") : $("#DateOfEvent").removeClass("is-invalid")


            $("#DateOfEvent").addClass(addClassForName);
            checkAgain().invalid !== 0 ? $("#SaveEvent").attr("disabled", true) : $("#SaveEvent").attr("disabled", false)

        });
        $("#from").bind('input', function () {
            let name = $("#from").val()
            let addClassForName;

            let milisecond = date.getTime();
            let time = new Date(milisecond)
            let timeNow = time.toLocaleTimeString()
            if (DateValidator(day, $("#DateOfEvent").val()) === true) {
                addClassForName = "is-valid"

            } else {
                addClassForName = parseInt(name.match(regExForTime).join("")) < parseInt(timeNow.match(regExForTime).join("").substring(0, 4)) || name === "" || name === undefined || name === null ? "is-invalid" : "is-valid"
            }


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

        $("#listOfEvents").empty()

        $("#EventModal").modal("hide")
        ListCreator(eventArray)

        $(".button").unbind().on("click", remove)
        $(".button-edit").unbind().on("click", Edit)








    })
    const remove = (e) => {
        e.preventDefault()
        let id = e.target.id.charAt(e.target.id.length - 1) - 1
        //TODO ALert
        eventArray.splice(id, 1)
        setCookie(eventArray)
        $(`#list${id}`).remove()

    }

    const Edit = (e) => {



        let id = e.target.id.charAt(e.target.id.length - 1)-1
        console.log(id)
        let index = null;

        index = eventArray[e.target.id.charAt(e.target.id.length - 1) - 1]
        console.log("Before", index)
        $("#EditEventName").val(index.name);
        $("#EditDateOfEvent").val(index.date);
        $("#Editfrom").val(index.from);
        $("#Editto").val(index.to);
        $("#Edittextarea").val(index.Description);
        $("#EditeventKind").val(index.value);

        $("#EventEditModal").modal();

        Update(id, index);
    }

    const Update = (id, index) => {
        $("#EditSaveEvent").unbind().on("click", () => {
            console.log("Recieved", index);

            index.name = $("#EditEventName").val();
            index.date = $("#EditDateOfEvent").val();
            index.from = $("#Editfrom").val();
            index.to = $("#Editto").val();
            index.desc = $("#Edittextarea").val();
            index.value=$("#EditeventKind").val()
            setCookie(eventArray)
            $("#EventEditModal").modal("hide")


            $(`#list${ id}`).empty().append($("<i class=descriptor-icon></i>" + "<div class=media-body>" + " <h5 class=mt-0 mb-1>" + index.name + "</h5>" + index.date+ "<br/>" + index.from + index.to + "</div>"))
                .append($("<span class=float-right>" + "<button class=button>" + "<i class=remove-icon></i>" + "</button>" + "<button class=button-edit>" + "<i class=edit-icon></i>" + "</button>" + "</span>"));
   $(`#list${id}`).find("i.descriptor-icon").addClass(`${iconCreator(index.value)} pt-3 pl-3 pr-3`)
                $(".remove-icon").addClass("fas fa-calendar-minus");
            $(".edit-icon").addClass("fas fa-edit")
            $(".button").addClass(" btn btn-danger");
            $(".button-edit").addClass("ml-2 btn btn-info");

            //eventArray.splice(index,1)
            AssignUnique(".button", "remove-");
            AssignUnique(".button-edit", "edit-")
            AssignUnique(".remove-icon","remove-icon")
            AssignUnique(".edit-icon","edit-icon")

        })
    }


    //console.log()
$("body").on("click",".button",remove)
$("body").on("click",".button-edit",Edit)

   // $(".button-edit").off("click").on("click", Edit)
})