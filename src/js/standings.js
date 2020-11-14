import 'materialize-css/dist/css/materialize.min.css';
import '../css/main.css';
import '../css/standings.css';
import './notif-subs.js';
import './service-worker/regis-sw.js';
import StringControl from './string-control';

document.addEventListener("DOMContentLoaded", main);

function main() {

    // querySelect function
    const qselect = (element, elements=false) => {
        if (elements === false) { //single element
            return document.querySelector(element)
        } else { //all elements
            return document.querySelectorAll(element)
        }
    }

    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");
    const leagueLogo = qselect('.league-logo img');
    const leagueName = qselect('.league-name');
    const seasonDetail = qselect('#season-detail');
    const loadingAnimation = qselect('#loading-animation');
    const errorLoad = qselect('#error-load');

    const renderView = data => {
        const standingList = qselect('.standings-list');
        const seasonStart = qselect('#start-season');
        const seasonEnd = qselect('#end-season');
        const seasonWinner = qselect('#winner-season');
        const lastUpdateData = qselect('#last-update-data');

        leagueName.innerText = data.competition.name;
        seasonStart.innerText = StringControl.toStringDate(new Date(data.season.startDate));
        seasonEnd.innerText = StringControl.toStringDate(new Date(data.season.endDate));
        seasonWinner.innerText = (data.season.winner != null) ? data.season.winner : "Season in Proggress";
        lastUpdateData.innerText = StringControl.toStringFullDate(new Date(data.competition.lastUpdated));

        loadingAnimation.style.display = "none";
        errorLoad.style.display = "none";
        seasonDetail.style.display = "block";

        data.standings.forEach(standingObject => {
            const groupTitle = document.createElement('div');
            const groupCard = document.createElement('div');
            groupCard.classList.add('card');

            if(standingObject.group !== null) {
                groupTitle.innerText = standingObject.group.replace('_', ' ');
                groupTitle.style.cssText = "text-align: center; font-size: 1.8em; margin-top: 2rem;";
                standingList.appendChild(groupTitle);
            }

            const standingTableList = () => {
                let htmlString = "";

                standingObject.table.forEach(standingsTable => {
                    htmlString += `
                        <tr onclick="window.location.href='detail-team.html?id=${standingsTable.team.id}'" style="cursor: pointer;">
                            <td>${standingsTable.position}</td>
                            <td>
                                <div style="display: inline-block; padding: 1%; width: 2em; height: 2em;">
                                    <img alt="team logo" width="100em" height="100em" style="max-width: 100%; max-height: 100%;" src="${(standingsTable.team.crestUrl !== null) ? standingsTable.team.crestUrl.replace(/^http:\/\//i, 'https://') : ""}"
                                </div>
                            </td>
                            <td>${standingsTable.team.name}</td>
                            <td>${standingsTable.playedGames}</td>
                            <td>${standingsTable.won}</td>
                            <td>${standingsTable.lost}</td>
                            <td>${standingsTable.draw}</td>
                            <td>${standingsTable.goalDifference}</td>
                            <td>${standingsTable.goalsAgainst}</td>
                            <td>${standingsTable.goalsFor}</td>
                            <td>${standingsTable.points}</td>
                        </tr>
                    `;
                });

                return htmlString;
            }

            groupCard.innerHTML = `
                <table class="responsive-table striped centered">
                    <thead>
                        <th>Pos</th>
                        <th>Logo</th>
                        <th>Club</th>
                        <th>Played</th>
                        <th>Won</th>
                        <th>Lost</th>
                        <th>Draw</th>
                        <th>GD</th>
                        <th>GA</th>
                        <th>GF</th>
                        <th>Points</th>
                    </thead>
                    <tbody>
                        ${standingTableList()}
                    </tbody>
                </table>`;

            standingList.appendChild(groupCard);
        });
    }

    const renderCache = () => {
        return new Promise((resolve, reject) => {
            if("caches" in window) {
                caches.match(`https://api.football-data.org/v2/competitions/${idParam}/standings/?standingType=TOTAL`)
                .then(response => {
                    return response.json();
                })
                .then(cachesData => {
                    renderView(cachesData);
                    resolve("Cache sucess rendered");
                })
                .catch(error => {
                    reject("Failed to render cache");
                });
            }
            else
                reject("This browser doesn't support cache");
        });
    }

    loadingAnimation.style.display = "flex";
    errorLoad.style.display = "none";
    seasonDetail.style.display = "none";

    if(idParam == 2001)
        leagueLogo.src = "../images/europe.webp";
    else if(idParam == 2002)
        leagueLogo.src = "../images/germany.webp";
    else if(idParam == 2003)
        leagueLogo.src = "../images/holland.webp";
    else if(idParam == 2021)
        leagueLogo.src = "../images/english.webp";
    else if(idParam == 2014)
        leagueLogo.src = "../images/spain.webp";
    else if(idParam == 2015)
        leagueLogo.src = "../images/french.webp";

    fetch(`https://api.football-data.org/v2/competitions/${idParam}/standings/?standingType=TOTAL`, {
        headers: {
            'X-Auth-Token': 'ee6ca03d98d8437fa063871bec8cbff9'
        }
    }).then(response => {
            return response.json();
        })
        .then(data => {
            renderView(data);
        })
        .catch(error => {
            renderCache().then(response => {
              console.log(response);
            })
            .catch(cacheError => {
                console.error(error);
                console.error(cacheError);
                loadingAnimation.style.display = "none";
                errorLoad.style.display = "flex";
                seasonDetail.style.display = "none";
            });
        });
}