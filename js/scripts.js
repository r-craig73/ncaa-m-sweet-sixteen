// Business Side
function Team(name) {
  this.name = name;
  this.score = 0;
}

function importData(leftTeam, rightTeam) {
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
    let teams = [leftTeam.name, rightTeam.name];
    console.log(teams);
    for (let a = 0 ; a < teams.length ; a++) {
      for (let i = 0 ; i < response.colleges.length ; i++) {
        if (response.colleges[i][searchField] == teams[a]) {
          results.push(response.colleges[i]);
        }
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
    $("#team01-freethrow").text(results[0].freethrow);
    $("#team02-freethrow").text(results[1].freethrow);
    $("#team01-turnover-per-game").text(results[0].turnoverpergame);
    $("#team02-turnover-per-game").text(results[1].turnoverpergame);
    $("#team01-assist-per-game").text(results[0].assistpergame);
    $("#team02-assist-per-game").text(results[1].assistpergame);
  }
}

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
    let teamOne = new Team(team01);
    const team02 = $("#team02").val();
    let teamTwo = new Team(team02);
    console.log(teamOne.name + " vs. " + teamTwo.name);
    $("#team01-name").text(teamOne.name);
    $("#team02-name").text(teamTwo.name);
    if (team01 == team02) {
      alert("Oh, Oh same team!");
      location.reload();
    }
    importData(teamOne, teamTwo);
    compareTeams();
  });

  // new comparison click
  $("#new-compare").click(function(){
    location.reload();
  });
});
