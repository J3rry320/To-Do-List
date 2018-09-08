$(document).ready(() => {
    //localStorage.clear();
    $(document).off("click")
    const date = new Date();
    const regExForTime = /[^:]\d/g;
    const regExForDate = /[^-]\d/g;
    let eventArray = [];

    let suffix = date.getDate() < 10 || date.getMonth() + 1 <= 9 ? "0" : "";

    let day = date.getFullYear().toString() + "-" + suffix + (date.getMonth() + 1).toString() + "-" + suffix + date.getDate().toString();
    const iconCreator = (iconKind) => {
        return iconKind === "Emergency" ? "fas fa-exclamation-triangle" : iconKind === "Family" ? "far fa-kiss-wink-heart" : iconKind === "Work" ? "fas fa-user-tie" : iconKind === "Hobby" ? "fas fa-headphones" : iconKind === "Leisure" ? "fas fa-coffee" : null
    }
    const DateUpdate = (date) => {
        let datee = date.match(regExForDate);
        let updatedYear = datee.slice(0, 2).join("");

        let newDate = [datee[3], datee[2], updatedYear]
        return newDate.join("-")
    }
    const ListCreator = (arr) => {
        arr.forEach((ele, ind) => {



            let span = "<span class=float-right>" + "<button type=button class=button-learn>" + "Learn <i class=learn-icon></i>" + "</button>" + "<button type=button class=button>" + "Remove <i class=remove-icon></i>" + "</button>" + "<button type=button class=button-edit>" + "Edit <i class=edit-icon></i>" + "</button>" + "</span>"

            $("<li />", {
                    "class": "border-bottom pt-5 mt-1 pb-4 media",
                    id: "list" + ind
                })
                .append($("<i class=descriptor-icon></i>" + "<div class=media-body>" + " <h5 class=mt-0 mb-1>" + ele.name + "</h5>" + "<i class=date-icon></i>" + DateUpdate(ele.date) + "</div>"))
                .append($(span, {
                    "class": "hello",
                    id: "button" + ind
                }))
                .appendTo("#listOfEvents");

            $(".date-icon").addClass("fas fa-calendar-alt pr-2");
            $(".learn-icon").addClass("fas fa-info");
            $(".remove-icon").addClass("fas fa-calendar-minus");
            $(".edit-icon").addClass("fas fa-edit");
            $(".float-right").addClass("col-md-4 col-sm-12")
            $(".button").addClass("ml-2 mr-2 mt-2 btn btn-danger");
            $(".button-edit").addClass(" mt-2 btn btn-success");
            $(".button-learn").addClass("mt-2 btn btn-primary");


        })
        for (let ind = 0; ind < arr.length; ind++) {

            $(`#list${ind}`).find("i.descriptor-icon").addClass(`${iconCreator(arr[ind].value)} pt-1 pl-3 pr-3`)
        }


        AssignUnique(".button-learn", "learn-");
        AssignUnique(".button", "remove-");
        AssignUnique(".button-edit", "edit-");
        AssignUnique(".remove-icon", "remove-icon");
        AssignUnique(".edit-icon", "edit-icon");
        AssignUnique(".learn-icon", "learn-icon")
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
    const listDetailViewer = (e) => {
        let index = eventArray[e.target.id.charAt(e.target.id.length - 1) - 1];
        console.log(index)
        $("#DisplayName").text(index.name);
        $("#DisplayDate").text(index.date);
        $("#toText").text(index.to);
        $("#fromText").text(index.from);
        $("#DetailsText").text(index.Description);
        $("#toIcon").removeClass()
        $("#fromIcon").removeClass()

        $("#toIcon").addClass(`descriptor-icon pt-1 wi wi-time-${index.to.substring(0,2)>12?(index.to.substring(0,2)-12)<10?index.to.substring(1,2)-2:index.to.substring(0,2)-12:index.to.substring(1,2)}`)
        $("#fromIcon").addClass(`descriptor-icon pt-1 wi wi-time-${index.from.substring(0,2)>12?(index.from.substring(0,2)-12)<10?index.from.substring(1,2)-2:index.from.substring(0,2)-12:index.from.substring(1,2)}`)

        $("#icon").removeClass();
        $("#icon").addClass(`${iconCreator(index.value)} descriptor-icon`);

        $("#details-modal").modal()

    }
    const checkAgain = (id) => {
        let checkForClass = id ? "#form" : "#EditForm"
        let string = [];
        let counter = 0,
            invalid = 0;
        $(`${checkForClass} :input`).each(function () {

            string.push($(this).attr("class"))

        })
        console.log(string, checkForClass)
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



        return (parseInt(dateVal.match(regExForDate).join("")) < parseInt(day.match(regExForDate).join("")))
    }

    const checker = (element) => {
        let Eventname = element ? "#EventName" : "#EditEventName";
        let DateOfEvent = element ? "#DateOfEvent" : "#EditDateOfEvent";
        let from = element ? "#from" : "#Editfrom";
        let to = element ? "#to" : "#Editto";
        let kind = element ? "#eventKind" : "#EditeventKind";
        let text = element ? "#textarea" : "#Edittextarea";
        let button = element ? "#SaveEvent" : "#EditSaveEvent";



        $(Eventname).bind('input', function () {
            let name = $(Eventname).val()

            let addClassForName = name === "" || name === undefined || name === null ? "is-invalid" : "is-valid"

            addClassForName === "is-invalid" ? $(Eventname).removeClass("is-valid") : $(Eventname).removeClass("is-invalid")


            $(Eventname).addClass(addClassForName);
            checkAgain(element).invalid !== 0 ? $(button).attr("disabled", true) : $(button).attr("disabled", false)
        });
        $(DateOfEvent).bind('input', function () {
            let name = $(DateOfEvent).val()

            let addClassForName = name === "" || name === undefined || name === null || DateValidator(name, day) ? "is-invalid" : "is-valid"

            addClassForName === "is-invalid" ? $(DateOfEvent).removeClass("is-valid") : $(DateOfEvent).removeClass("is-invalid")


            $(DateOfEvent).addClass(addClassForName);
            checkAgain(element).invalid !== 0 ? $(button).attr("disabled", true) : $(button).attr("disabled", false)

        });
        $(from).bind('input', function () {
            let name = $(from).val()
            let addClassForName;

            let milisecond = date.getTime();
            let time = new Date(milisecond)
            let timeNow = time.toLocaleTimeString()

            if (DateValidator(day, $(DateOfEvent).val()) === true) {
                addClassForName = "is-valid"

            } else {
                addClassForName = parseInt(name.match(regExForTime).join("")) < parseInt(timeNow.match(regExForTime).join("").substring(0, 4)) || name === "" || name === undefined || name === null ? "is-invalid" : "is-valid"
            }


            addClassForName === "is-invalid" ? $(from).removeClass("is-valid") : $(from).removeClass("is-invalid")


            $(from).addClass(addClassForName);
            checkAgain(element).invalid !== 0 ? $(button).attr("disabled", true) : $(button).attr("disabled", false)

        });
        $(to).bind('input', function () {

            let name = $(to).val();
            let fromm = $(from).val();



            let addClassForName = parseInt(name.match(regExForTime).join("")) <= parseInt(fromm.match(regExForTime).join("")) || name === "" || name === undefined || name === null ? "is-invalid" : "is-valid"



            addClassForName === "is-invalid" ? $(to).removeClass("is-valid") : $(to).removeClass("is-invalid")


            $(to).addClass(addClassForName);
            checkAgain(element).invalid !== 0 ? $(button).attr("disabled", true) : $(button).attr("disabled", false)

        });
        $(text).bind('input', function () {
            let name = $(text).val()

            let addClassForName = name === "" || name === undefined || name === null||name.length<25 ? "is-invalid" : "is-valid"

            addClassForName === "is-invalid" ? $(text).removeClass("is-valid") : $(text).removeClass("is-invalid")


            $(text).addClass(addClassForName);

            checkAgain(element).invalid !== 0 ? $(button).attr("disabled", true) : $(button).attr("disabled", false)
        });
        $(kind).bind("input", () => {
            let name = $(kind).val()


            let addClassForName = name === "" || name === undefined || name === null ? "is-invalid" : "is-valid"

            addClassForName === "is-invalid" ? $(kind).removeClass("is-valid") : $(kind).removeClass("is-invalid")


            $(kind).addClass(addClassForName);

            checkAgain(element).invalid !== 0 ? $(button).attr("disabled", true) : $(button).attr("disabled", false)
        })




    }

    $("#AddEvent").bind("click", () => {
        emptyValue();
        $("#SaveEvent").attr("disabled", true);
        $("#EventModal").modal();

        checker(true)
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



        let id = e.target.id.charAt(e.target.id.length - 1) - 1
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
        $("#EditSaveEvent").attr("disabled", true);


        checker(false)
        Update(id, index);
    }

    const Update = (id, index) => {
        $("#EditSaveEvent").unbind().on("click", () => {
            console.log("Recieved", index);

            index.name = $("#EditEventName").val();
            index.date = $("#EditDateOfEvent").val();
            index.from = $("#Editfrom").val();
            index.to = $("#Editto").val();
            index.Description = $("#Edittextarea").val();
            index.value = $("#EditeventKind").val()
            setCookie(eventArray)
            $("#EventEditModal").modal("hide")


            $(`#list${ id}`).empty().append($("<i class=descriptor-icon></i>" + "<div class=media-body>" + " <h5 class=mt-0 mb-1>" + index.name + "</h5>" + "<i class=date-icon></i>" + DateUpdate(index.date) + "</div>"))
                .append($("<span class=float-right>" + "<button type=button class=button-learn>" + "Learn <i class=learn-icon></i>" + "</button>" + "<button class=button>" + "Remove <i class=remove-icon></i>" + "</button>" + "<button class=button-edit>" + "Edit <i class=edit-icon></i>" + "</button>" + "</span>"));
            $(`#list${id}`).find("i.descriptor-icon").addClass(`${iconCreator(index.value)} pt-1 pl-3 pr-3`)
            $(".date-icon").addClass("fas fa-calendar-alt pr-2");
            $(".learn-icon").addClass("fas fa-info");
            $(".remove-icon").addClass("fas fa-calendar-minus");
            $(".edit-icon").addClass("fas fa-edit");
            $(".float-right").addClass("col-md-4 col-sm-12")
            $(".button").addClass("ml-2 mr-2 mt-2 btn btn-danger");
            $(".button-edit").addClass(" mt-2 btn btn-success");
            $(".button-learn").addClass("mt-2 btn btn-primary");


            //eventArray.splice(index,1)
            AssignUnique(".button-learn", "learn-");
            AssignUnique(".button", "remove-");
            AssignUnique(".button-edit", "edit-");
            AssignUnique(".remove-icon", "remove-icon");
            AssignUnique(".edit-icon", "edit-icon");
            AssignUnique(".learn-icon", "learn-icon")

        })
    }


    //console.log()
    $("body").on("click", ".button", remove)
    $("body").on("click", ".button-edit", Edit)
    $("body").on("click", ".button-learn", listDetailViewer)
    // $(".button-edit").off("click").on("click", Edit)
})