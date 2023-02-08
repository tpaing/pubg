const fetchData = async () => {
    const response = await fetch('http://192.168.100.52:4000/player');
    const playerData = await response.json();
  
    // Create an object to store the team data
    const teamData = {};
  
    // Iterate through the player data and sum the kills for each team
    playerData.playerInfoList.forEach((player) => {
      if (!teamData[player.teamName]) {
        teamData[player.teamName] = {
          teamId: player.teamId,
          teamName: player.teamName,
          teamKill: player.killNum,
          rank: player.rank,
          rankPoint: 0,
          totalPoint: 0,
        };
      } else {
        teamData[player.teamName].teamKill += player.killNum;
      }
    });
  
    // Calculate the rank points and total points for each team
    Object.values(teamData).forEach((team) => {
        switch (team.rank) {
          case 1:
            team.rankPoint = 10;
            break;
          case 2:
            team.rankPoint = 6;
            break;
          case 3:
            team.rankPoint = 5;
            break;
          case 4:
            team.rankPoint = 4;
            break;
          case 5:
            team.rankPoint = 3;
            break;
          case 6:
            team.rankPoint = 2;
            break;
          case 7:
          case 8:
            team.rankPoint = 1;
            break;
          default:
            if (team.rank >= 9 && team.rank <= 16) {
              team.rankPoint = 0;
            }
        }
        team.totalPoint = team.teamKill + team.rankPoint;
      });      
    return Object.values(teamData).sort((a, b) => b.totalPoint - a.totalPoint );
  };
  
  // Call the function to fetch and process the data
  fetchData().then((teamData) => {
    console.log(teamData);
  });
  