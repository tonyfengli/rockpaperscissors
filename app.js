
// Initialize Firebase
var config = {
    apiKey: "AIzaSyACO2EtwM2IQoefwdOMK8YWqqmewXDDg2g",
    authDomain: "rockpaperscissors-acb2e.firebaseapp.com",
    databaseURL: "https://rockpaperscissors-acb2e.firebaseio.com",
    projectId: "rockpaperscissors-acb2e",
    storageBucket: "rockpaperscissors-acb2e.appspot.com",
    messagingSenderId: "443979730949"
  };
  firebase.initializeApp(config);


var dataRef = firebase.database();
var connectedRef = dataRef.ref(".info/connected");
var connectionsRef = dataRef.ref("connections");
var playersRef = dataRef.ref("/players");
var chatRef = dataRef.ref("chat");
var playerNumber = 0;



$(document).ready(function() {

    playersRef.once("value", function(snap) {
        $("#player-1-wins").html("Wins: " + snap.val()[1].wins)
        $("#player-1-losses").html("Losses: " + snap.val()[1].losses)
        $("#player-2-wins").html("Wins: " + snap.val()[2].wins)
        $("#player-2-losses").html("Losses: " + snap.val()[2].losses)

    });



/* 
    connectedRef.on("value", function(snap) {
        
        // If they are connected..
        if (snap.val()) {
      

          var con = connectionsRef.push(true);
            
          con.onDisconnect().child("/players").remove();
          
        }

        function getParent(snapshot) {
            // You can get the reference (A Firebase object) from a snapshot
            // using .ref().
            var ref = snapshot.ref();
            // Now simply find the parent and return the name.
            return ref.parent().name();
          }

      }); */



    $("#submit").on("click", function(event) {
        event.preventDefault();
        var name = $("#player-input").val();

/*         var player = {
            name: name,
            losses: 0,
            wins: 0,
            choice: "paper",
            turn: true
        };

        playersRef.child(1).set(player); */

        });

    

    $("#send").on("click", function(event) {
            event.preventDefault();
            var chatText = $("#chat").val();
            chatRef.push(chatText);



    });

    var chatDiv = $("<div>");
    
    chatRef.on("child_added", function(snapshot) {
        console.log(snapshot.val());
        var chatText = snapshot.val();        
        var chatRow = $("<p>").text(chatText);
        chatDiv.append(chatRow);
        $("#chatbox").html(chatDiv);

    });



        connectionsRef.once("value", function(snap) {
        
            keys = Object.keys(snap.val());
            playersRef.child(1).update({
                key: keys[0]
            });

            playersRef.child(2).update({
                key: keys[1]
            });

    

    });


    $(".choice1").on("click", function(event) {
        event.preventDefault();
        var choice = $(this).attr("value");

        playersRef.once("value", function(snap) {
            if (snap.val()[1].turn === true) {
                playersRef.child(1).update({choice: choice});
                $("#chosen1").text(choice);
                $("#chosen1").show();
                $(".choice1").hide();
                playersRef.child(1).update({turn: false});
                playersRef.child(2).update({turn: true});
                $("#announcement").text("Game Start!");

            }

        });


    }); 

    $(".choice2").on("click", function(event) {

        event.preventDefault();
        var choice = $(this).attr("value");

        playersRef.once("value", function(snap) {
            var losses2 = snap.val()[2].losses
            var wins2 = snap.val()[2].wins
            var losses1 = snap.val()[1].losses
            var wins1 = snap.val()[1].wins

            var reset = setTimeout(function () {
                $("#chosen1").hide();
                $("#chosen2").hide();
                $(".choice1").show();
                $(".choice2").show();
                $("#announcement").hide();
            }, 2000);

            if (snap.val()[2].turn === true) {
                playersRef.child(2).update({choice: choice});
                $("#chosen2").text(choice);
                $("#chosen2").show();
                $(".choice2").hide();
                playersRef.child(2).update({turn: false});
                playersRef.child(1).update({turn: true});
                


            }

            if (snap.val()[1].choice === "paper" && choice === "rock" && snap.val()[2].turn === true) {
                losses2++
                $("#player-2-losses").html("Losses: " + losses2);
                wins1++
                $("#player-1-wins").html("Wins: " + wins1);
                $("#announcement").show();
                $("#announcement").text("Player 1 Wins");
                playersRef.child(2).update({losses: losses2});
                playersRef.child(1).update({wins: wins1});
                reset();
                
            } 

            if (snap.val()[1].choice === "paper" && choice === "paper" && snap.val()[2].turn === true) {
                alert("tie");
                reset();
                
                
            } 

            if (snap.val()[1].choice === "paper" && choice === "scissors" && snap.val()[2].turn === true) {
                losses1++
                $("#player-1-losses").html("Losses: " + losses1);
                wins2++
                $("#player-2-wins").html("Wins: " + wins2);
                $("#announcement").show();
                $("#announcement").text("Player 2 Wins");
                playersRef.child(1).update({losses: losses1});
                playersRef.child(2).update({wins: wins2});
                reset();
            } 

            if (snap.val()[1].choice === "rock" && choice === "rock" && snap.val()[2].turn === true) {
                $("#announcement").show();
                $("#announcement").text("Tie.");
                reset();
            } 

            if (snap.val()[1].choice === "rock" && choice === "paper" && snap.val()[2].turn === true) {
                losses1++
                $("#player-1-losses").html("Losses: " + losses1);
                wins2++
                $("#player-2-wins").html("Wins: " + wins2);
                $("#announcement").show();
                $("#announcement").text("Player 2 Wins");
                playersRef.child(1).update({losses: losses1});
                playersRef.child(2).update({wins: wins2});
                reset();
            } 

            if (snap.val()[1].choice === "rock" && choice === "scissors" && snap.val()[2].turn === true) {
                losses2++
                $("#player-2-losses").html("Losses: " + losses2);
                wins1++
                $("#player-1-wins").html("Wins: " + wins1);
                $("#announcement").show();
                $("#announcement").text("Player 1 Wins");
                playersRef.child(2).update({losses: losses2});
                playersRef.child(1).update({wins: wins1});
                reset();
            } 

            if (snap.val()[1].choice === "scissors" && choice === "rock" && snap.val()[2].turn === true) {
                losses1++
                $("#player-1-losses").html("Losses: " + losses1);
                wins2++
                $("#player-2-wins").html("Wins: " + wins2);
                $("#announcement").show();
                $("#announcement").text("Player 2 Wins");
                playersRef.child(1).update({losses: losses1});
                playersRef.child(2).update({wins: wins2});
                reset();
            } 

            if (snap.val()[1].choice === "scissors" && choice === "paper" && snap.val()[2].turn === true) {
                losses2++
                $("#player-2-losses").html("Losses: " + losses2);
                wins1++
                $("#player-1-wins").html("Wins: " + wins1);
                $("#announcement").show();
                $("#announcement").text("Player 1 Wins");
                playersRef.child(2).update({losses: losses2});
                playersRef.child(1).update({wins: wins1});
                reset();
            } 

            if (snap.val()[1].choice === "scissors" && choice === "scissors" && snap.val()[2].turn === true) {
                $("#announcement").show();
                $("#announcement").text("Tie.");
                reset();
            } 

        
        });

    }); 


    
});



            

























/*     var animalArray = ["cats", "dogs", "pigs"];

    function renderButtons() {

        $("#animalIcons").empty();
        for (var i = 0; i < animalArray.length; i++) {
          var a = $("<button>");
          a.addClass("btn btn-info");
          a.attr("type", "button");
          a.attr("data-name", animalArray[i]);
          a.text(animalArray[i]);
          $("#animalIcons").append(a);
        }

        $(".btn").on("click", function() {
            $("#animal-row").empty();
            event.preventDefault();
            var animal = $(this).attr("data-name");
    
            var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=g06SMRYEUnHX7eXChQkxF6Ukkeov2Dgp&q=" + animal + "&limit=" + 10 + "&offset=0&" + "Y" + "=Y&lang=en";
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                console.log(response);
                gifArray = Object.values(response.data);
                ratingsArray = [];
                animateURLArray = [];
                stillURLArray = [];
                for (var i=0; i < 10; i++) {
                    ratingsArray.push(gifArray[i].rating);
                    animateURLArray.push(gifArray[i].images.fixed_width_small.url);
                    stillURLArray.push(gifArray[i].images.fixed_width_small_still.url);
                }
            
                var animalRow = $("#animal-row");
                
    
                for (var i=0; i < 10; i++) {
                    var animalDiv = $("<div class='col-sm-4'>");
                    var rating = $("<p>").text("Rating: " + ratingsArray[i]);
                    var image = $("<img>").attr("src", animateURLArray[i]).attr("data-state", "animate").attr("still-URL", stillURLArray[i]).attr("animate-URL", animateURLArray[i]);
                    image.addClass("gif");
             
                    animalDiv.append(rating);
                    animalDiv.append(image);
                    animalRow.append(animalDiv);
                }

                $(".gif").on("click", function() {

                    var state = $(this).attr("data-state");
                    var stillURL = $(this).attr("still-URL");
                    var animateURL = $(this).attr("animate-URL");
                    
                    if (state === "animate") {
                        $(this).attr("data-state", "still");
                        $(this).attr("src", stillURL);

                    }  else if (state === "still") {
                        $(this).attr("data-state", "animate");
                        $(this).attr("src", animateURL);
                    }  
                });            
    
            });
    
        }); 
      };

    renderButtons();


    $("#submit").on("click", function() {
        event.preventDefault();
        var newAnimal = $("#animal-form").find("#new-animal").val();
        animalArray.push(newAnimal);
        renderButtons();
    }); */
      


    