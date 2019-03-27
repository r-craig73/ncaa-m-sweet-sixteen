// Business Side


// User Interface Logic
function compareTeams() {
  $("#results").show();
  $("#new-compare").show();
  $("#team-selections").hide();
};

function resetPredictor() {
  $("#new-compare").show();
  $("#team-selections").hide();
};

// Frontend side
$(document).ready(function() {
  $("#team-selections").submit(function(event) {
    event.preventDefault();
    const team01 = $("#team01").val();
    $("#team01-name").text(team01);
    const team02 = $("#team02").val();
    $("#team02-name").text(team02);
    console.log("Team 01: " + team01);
    console.log("Team 02: " + team02);
    if (team01 == team02) {
      alert("Oh, Oh same team!");
      location.reload();
    }

    let request = new XMLHttpRequest();
    const s16json = "./s16.json";

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getStats(response);
      }
    }

    request.open("GET", s16json, true);
    request.send();

    const getStats = function(response) {
      console.log(response);
      console.log(response.colleges[2].name);
      console.log(response.colleges.length);
      console.log(response.colleges[2].threepercentage);
      console.log(response.colleges[2].appearances);
    }

    compareTeams();
  });

  // new comparison click
  $("#new-compare").click(function(){
    location.reload();
  });
});
