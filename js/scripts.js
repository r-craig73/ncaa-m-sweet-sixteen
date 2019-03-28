// Business Side
// TBD

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
      let results = [];
      let searchField = "name";
      let searchTeam01 = team01;
      for (let i=0 ; i < response.colleges.length ; i++)
      {
        if (response.colleges[i][searchField] == searchTeam01) {
          results.push(response.colleges[i]);
          // console.log(response.colleges[i]);
        }
      }
      let searchTeam02 = team02;
      for (let i=0 ; i < response.colleges.length ; i++)
      {
        if (response.colleges[i][searchField] == searchTeam02) {
          results.push(response.colleges[i]);
          // console.log(response.colleges[i]);
        }
      }
      console.log(results);
      $("#team01-appearances").text(results[0].appearances);
      $("#team02-appearances").text(results[1].appearances);
      $("#team01-three-percentage").text(results[0].threepercentage);
      $("#team02-three-percentage").text(results[1].threepercentage);
      $("#team01-off-efficiency").text(results[0].offefficiency);
      $("#team02-off-efficiency").text(results[1].offefficiency);
      $("#team01-def-efficiency").text(results[0].defefficiency);
      $("#team02-def-efficiency").text(results[1].defefficiency);
    }
    compareTeams();
  });

  // new comparison click
  $("#new-compare").click(function(){
    location.reload();
  });
});
