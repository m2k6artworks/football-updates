import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import '../css/main.css';
import '../css/detail-team.css';
import './notif-subs.js';
import './service-worker/regis-sw.js';
import ScoreBallIDB from './indexDB.js';
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

    const indexDB = new ScoreBallIDB();
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");
    const loadingAnimation = qselect('#loading-animation');
    const errorLoad = qselect('#error-load');
    const teamDetail = qselect('#team-detail');
    const favoriteBtn = qselect('#btn-favorite');

    const renderView = data => {
        const clubImg = qselect('.club-img img');
        const clubName = qselect('.club-name');
        const detailName = qselect('#detail-name');
        const detailShortName = qselect('#detail-short-name');
        const detailArea = qselect('#detail-area');
        const detailAddress = qselect('#detail-address');
        const detailVenue = qselect('#detail-venue');
        const detailFounded = qselect('#detail-founded');
        const detailWebsite = qselect('#detail-website');
        const detailEmail = qselect('#detail-email');
        const detailPhone = qselect('#detail-phone');
        const playerListContainer = qselect('.player-list');
        const playerModalContainer = qselect('#player-modal');
        const playerModal = M.Modal.init(playerModalContainer, {});
        const addRemoveFavorite = () => {
            indexDB.getTeamsById(data.id)
                .then(teamData => {
                    const favoriteBtnIcon = qselect('#btn-favorite i');
                    let switchSave = 0;

                    if(teamData !== undefined) {
                        favoriteBtnIcon.innerText = "favorite";
                        switchSave = 1;
                    }
    
                    favoriteBtn.addEventListener('click', () => {
                        if(switchSave === 0) {
                            favoriteBtnIcon.classList.remove('zoom-anim')
                            indexDB.saveToFavorite(data);
                            favoriteBtnIcon.innerText = "favorite";
                            switchSave = 1;
                            void favoriteBtnIcon.offsetWidth;
                            favoriteBtnIcon.classList.add('zoom-anim')
                        }
                        else {
                            indexDB.deleteFromFavorite(data.id);
                            favoriteBtnIcon.classList.remove('zoom-anim')
                            favoriteBtnIcon.innerText = "favorite_border";
                            switchSave = 0;
                            void favoriteBtnIcon.offsetWidth;
                            favoriteBtnIcon.classList.add('zoom-anim')
                        }
                    });
                });
        }

        addRemoveFavorite();

        loadingAnimation.style.display = "none";
        errorLoad.style.display = "none";
        teamDetail.style.display = "block";

        //Show Team Image and Team Name
        clubImg.src = data.crestUrl.replace(/^http:\/\//i, 'https://');
        clubName.innerText = data.name;

        //Show Detail Team
        detailName.innerText = data.name;
        detailShortName.innerText = data.shortName;
        detailArea.innerText = data.area.name;
        detailAddress.innerText = data.address;
        detailVenue.innerText = data.venue;
        detailFounded.innerText = data.founded;
        detailWebsite.innerHTML = `<a href="${data.website}">${data.website}</a>`;
        detailEmail.innerHTML = `<a href="mailto:${data.email}">${data.email}</a>`;
        detailPhone.innerHTML = `<a href="tel:${data.phone}">${data.phone}</a>`;

        if(data.squad.length > 0) {
            //Render List Player
            const playerCard = document.createElement('div');
            const playerRow = () => {
                let htmlText = "";

                for(let i = 0;i < data.squad.length;i++) {
                    htmlText += `
                        <tr style="cursor: pointer;">
                            <td>${i+1}</td>
                            <td>${data.squad[i].name}</td>
                            <td>${(data.squad[i].role === "PLAYER") ? data.squad[i].position : data.squad[i].role.replace('_', ' ')}</td>
                        </tr>
                    `;
                }

                return htmlText;
            }
            playerCard.classList.add("card");
            playerCard.innerHTML = `
                <center><div class="card-title">Player List</div></center>
                <div class="card-content">
                    <div class="res-table">
                        <table class="highlight">
                            <thead>
                                <th>No</th>
                                <th>Name</th>
                                <th>Position</th>
                            </thead>
                            <tbody>
                                ${playerRow()}
                            </tbody>
                        </table>
                    </div>
                </div>
                `;
            playerListContainer.appendChild(playerCard);

            //Add Click Listener For Player Detail Modal
            const playerList = qselect('.player-list table tbody tr', true);
            const showPlayerDetail = position => {
                playerModalContainer.innerHTML = `
                    <div class="modal-content">
                        <h4>Player Details</h4>
                        <div class="res-table">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Name</td>
                                        <td>${data.squad[position].name}</td>
                                    </tr>
                                    <tr>
                                        <td>Birth Country</td>
                                        <td>${data.squad[position].countryOfBirth}</td>
                                    </tr>
                                    <tr>
                                        <td>Birth Date</td>
                                        <td>${StringControl.toStringDate(new Date(data.squad[position].dateOfBirth))}</td>
                                    </tr>
                                    <tr>
                                        <td>Nationality</td>
                                        <td>${data.squad[position].nationality}</td>
                                    </tr>
                                    <tr>
                                        <td>Position</td>
                                        <td>${(data.squad[position].role === "PLAYER") ? data.squad[position].position : data.squad[position].role.replace('_', ' ')}</td>
                                    </tr>
                                    <tr>
                                        <td>Shirt Number</td>
                                        <td>${(data.squad[position].shirtNumber !== null) ? data.squad[position].shirtNumber : "-"}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <a href="#!" class="modal-close btn-flat" style=" position: absolute; top: 10px; right: 0;">
                    <i class="material-icons red-text" style="font-size: 2.5rem;">cancel</i></a`;
                playerModal.open();
            }

            for(let i = 0;i < playerList.length; i++) {
                playerList[i].addEventListener('click', () => {
                   showPlayerDetail(i);
                });
            }
        }
    }

    const renderCache = () => {
        return new Promise((resolve, reject) => {
            if("caches" in window) {
                caches.match(`https://api.football-data.org/v2/teams/${idParam}`)
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
    teamDetail.style.display = "none";

    fetch(`https://api.football-data.org/v2/teams/${idParam}`, {
        headers: {
            'X-Auth-Token': 'ee6ca03d98d8437fa063871bec8cbff9'
        }
    })
    .then(response => {
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
            teamDetail.style.display = "none";
        });
    });
}