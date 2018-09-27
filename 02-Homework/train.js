// Initialize Firebase
var config = {
    apiKey: "AIzaSyC_2IkxfkNJdYqtdQC6PaSGhY_Po2HfrOE",
    authDomain: "train-scedule-7367d.firebaseapp.com",
    databaseURL: "https://train-scedule-7367d.firebaseio.com",
    projectId: "train-scedule-7367d",
    storageBucket: "",
    messagingSenderId: "627943243429"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    var empTrainName = $("#train-name=input").val().trim();
    var empDestination = $("#Destination").val().trim();
    var empFirstTime = $("#first-time").val().trim();
    var empFrequency = $("#Frequency").val().trim();

    var newTrain = {
        name: empTrainName,
        destination: empDestination,
        firstTime: empFirstTime,
        frequency: empFrequency,
    };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTime);
    console.log(newTrain.frequency);

    alert("Train Schedule Succesfully Updated");

    $("#train-name-input").val("");
    $("#Destination").val("");
    $("#first-time").val("");
    $("#Frequency").val("");
});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    var empTrainName = childSnapshot.val().name;
    var empDestination = childSnapshot.val().destination;
    var empFirstTime = childSnapshot.val().firstTime;
    var empFrequency = childSnapshot.val().frequency;

    console.log(empTrainName);
    console.log(empDestination);
    console.log(empFirstTime);
    console.log(empFrequency);

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted)

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var remainder = diffTime % frequency;
    console.log(remainder);

    var minutesTill = frequency - remainder;
    console.log("MINUTES TIll TRAIN: " + minutesTill);

    var nextTrain = moment().add(minutesTill, "minutes");
    console.lof("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

    var newRow = $("<tr>").append(
        $("<td>").text(empTrainName),
        $("<td>").text(empDestination),
        $("<td>").text(empFirstTime),
        $("<td>").text(empFrequency),
        $("<td>").text(nextTrain),
        $("<td>").text(minutesTill),
        $("<td>").text(remainder),
        $("<td>").text(empTrainName),

    );

    $("#train-table > tbody").append(newRow);

});

