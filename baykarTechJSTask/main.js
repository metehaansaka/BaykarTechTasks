$(document).ready(function () {
  let questions;
  let questionOrder = 1;
  let countDown = 30;
  let result = [];
  $.get("https://jsonplaceholder.typicode.com/posts", function (data) {
    questions = data;
    getQuestion();
    $(".spinner-border").addClass("d-none");
    $(".border").removeClass("d-none");
    $("#countdown").removeClass("d-none");
  });

  function getQuestion() {
    if (questionOrder == 11) {
      getTable();
    }
    $('#next-queston').prop('disabled', true);
    $('input:radio').prop('disabled', true);
    countDown = 30;
    $("#countdown").html(countDown);
    $("#question-order").html("(10 sorudan " + questionOrder + ". soru)");
    $("#question").html(questions[questionOrder - 1].title);
    $('input:radio').prop('checked', false);
    let answers = questions[questionOrder - 1].body.split("\n");
    setAnswers(answers);
  }

  function setAnswers(answers) {
    $("#answer-a").html(answers[0]);
    $("#answer-b").html(answers[1]);
    $("#answer-c").html(answers[2]);
    $("#answer-d").html(answers[3]);
    $("#exampleRadios1").val("A-) " + answers[0]);
    $("#exampleRadios2").val("B-) " + answers[1]);
    $("#exampleRadios3").val("C-) " + answers[2]);
    $("#exampleRadios4").val("D-) " + answers[3]);
  }

  $("#next-queston").on("click", function () {
    if (result[questionOrder - 1] == undefined) {
        let tmp = { question: $("#question").html(), answer: "Boş Bırakıldı" };
        result.push(tmp);
      }
    questionOrder++;
    getQuestion();
  });

  $("input:radio").on("click", function () {
    let tmp = { question: $("#question").html(), answer: $(this).val() };
    result.push(tmp);
  });

  let interval = setInterval(function () {
    $("#countdown").html(countDown);
    countDown--;
    if(countDown < 20 ){
      $('#next-queston').prop('disabled', false);
      $('input:radio').prop('disabled', false);
    }
    if (countDown == 0) {
      if (result[questionOrder - 1] == undefined) {
        let tmp = { question: $("#question").html(), answer: "Boş Bırakıldı" };
        result.push(tmp);
      }
      questionOrder++;
      getQuestion();
    }
  }, 1000);

  function getTable() {
    clearInterval(interval);
    $("#countdown").addClass("d-none");
    $(".border").addClass("d-none");
    $.each(result, function (index, value) {
      let str =
        "<tr>" +
        '<th scope="row">' +
        (index + 1) +
        "</th>" +
        "<td>" +
        value.question +
        "</td>" +
        "<td>" +
        value.answer +
        "</td>" +
        "</tr>";
      $("#table-body").append(str);
    });

    $("table").removeClass("d-none");
  }
});
