// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
  // Hour of day 24hour
  const currHour = dayjs().format("H");

  // adding more numbers to array will alow to the code to work for 24hour day.
  const timeBlocks = ["09", "10", "11", "12", "13", "14", "15", "16", "17"];
  const containerEL = $(".container-fluid");

  $("#currentDay").text(dayjs().format("dddd, MMMM YYYY"));
  //  Dynamically loadloads HTML content
  $.each(timeBlocks, function (index, value) {
    const timeBlockEL = $(`<div id="hour-${value}" class="row time-block">
    <div class="col-2 col-md-1 hour text-center py-3">${dayjs()
      .hour(timeBlocks[index])
      .format("h : A")}</div>
    <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
    <button class="btn saveBtn col-2 col-md-1" aria-label="save">
      <i class="fas fa-save" aria-hidden="true"></i>
    </button>
  </div>`);

    // Append dynamically load content to HTML
    containerEL.append(timeBlockEL);
    // end of html load
  });
  // add color
  $(".time-block").each(function () {
    // Gets id stored html to be used to compare current time
    const schedulerHour = $(this).attr("id").split("-")[1];
    if (currHour === schedulerHour) {
      $(this).addClass("present");
    } else if (currHour < schedulerHour) {
      $(this).addClass("future");
    } else if (currHour > schedulerHour) {
      $(this).addClass("past");
    }
  });

  // Save schedul to local storage

  $(".time-block").on("click", ".saveBtn", function (event) {
    const timeEL = $(this).parent();
    const id = timeEL.attr("id");
    const toDo = timeEL.find("textarea").val();
    // save to local storage
    localStorage.setItem(id, toDo);
  });

  // retrive data from local storage

  $(".time-block .description").each(function () {
    const id = $(this).parent().attr("id");
    $(this).val(localStorage.getItem(id));
  });
});
