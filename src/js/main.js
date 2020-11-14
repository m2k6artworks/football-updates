import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import '../css/main.css';
import './notif-subs.js';
import './service-worker/regis-sw.js';
import ScoreBallIDB from './indexDB.js';

//Control Page After DOM Loaded
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

    const sideNav = qselect("#slide-out");
    M.Sidenav.init(sideNav);
    const sideNavList = qselect('#slide-out .sideTab a', true);

    const indexDB = new ScoreBallIDB();
    
    const navTab = qselect('#nav-tab');
    const navTabInstance = M.Tabs.init(navTab, {});
    const navTabList = qselect('#nav-tab .tab a', true);
    
    const contentContainer = qselect('#content-container');

    sideNavList.forEach(navBtn => {
        navBtn.addEventListener("click", event => {
            sideNavList.forEach(navBtns => {
                navBtns.classList.remove("nav-select");
            })

            event.target.classList.add("nav-select"); 
        })
    })
    
    const getActiveSideNav = () => {
        let selectedList = -1;
    
        for(let i = 0; i < sideNavList.length; i++) {
            selectedList++;
            if(sideNavList[i].classList.contains("nav-select"))
            break;
        }
    
        return selectedList;
    }

    const getActiveNavigationTab = () => {
        let selectedIndex = -1;
    
        for(let i = 0; i < navTabList.length; i++) {
            selectedIndex++;
            if(navTabList[i].classList.contains("active"))
                break;
        }
    
        return selectedIndex;
    }

    const displayLoading = () => {
        contentContainer.innerHTML = `
            <div style="display: flex;width: 100%;height: 100%;justify-content: center;align-items: center;">
                <div class="preloader-wrapper big active">
                    <div class="spinner-layer spinner-blue-only">
                        <div class="circle-clipper left">
                            <div class="circle"></div>
                        </div>
                        <div class="gap-patch">
                            <div class="circle"></div>
                        </div>
                        <div class="circle-clipper right">
                            <div class="circle"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    const errorMessage = () => {
        contentContainer.innerHTML = `
            <div style="display: flex;width: 95%;height: 100%;justify-content: center;align-items: center;margin-left: 2.5%; margin-right: 2.5%;">
                <h4 style='color: red; text-align: center;'>Error, try to refresh this page</h4>
            </div>
        `;
    }

    const showView = url => {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => {
                    if(response.status === 200)
                        response.text().then(htmlText => {
                            contentContainer.innerHTML = htmlText;
                            resolve("Page sucess loaded");
                        });
                    else
                        errorMessage();
                }).catch(error => {
                    errorMessage();
                    console.error("Error: fetch error", error);
                    reject("Error to load page");
                });
        })
    }

    sideNav.addEventListener("click", () => {
        
        let selectedSideNav = getActiveSideNav();

        displayLoading();
        switch(selectedSideNav) {
            case 0:
                showView("/views/league.html");
                break;
            case 1:
                showView("/views/favorite-team.html").then(response => {
                    indexDB.getAllTeams().then(listTeam => {
                        const listFavorite = qselect('#list-favorite');
                        

                        if(listTeam.length > 0) {
                            listTeam.forEach(team => {
                                listFavorite.innerHTML += 
                                `
                                <div class="col s12 waves-effect">
                                    <a class="card horizontal hoverable" href="views/detail-team.html?id=${team.id}">
                                        <div class="card-image" style="padding: 1rem;">
                                            <img width="100em" height="100em" alt="team logo" src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" style="
                                                height: 10vmax;
                                                z-index: 1;">
                                        </div>
                                        <div class="card-stacked">
                                            <div class="card-content disflex">
                                                <p class="m-auto">${team.name}</p>
                                                <p class="m-auto">${team.area.name}</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                `;
                            });
                        }
                        else
                        listFavorite.innerHTML = `
                            <div id="error-load" class="disflex m-auto">
                                <h4 class="m-auto center-align">There are No Favorite Teams yet</h4>
                            </div>                         
                        `;
                    });
                });
                
                break;
            case 2:
                showView("/views/contact.html");
                break;
        }
    });

    //Handle navigation tab click to move views
    navTab.addEventListener("click", () => {
        let selectedNav = getActiveNavigationTab();

        displayLoading();
        switch(selectedNav) {
            case 0:
                showView("/views/league.html");
                break;
            case 1:
                showView("/views/favorite-team.html").then(response => {
                    indexDB.getAllTeams().then(listTeam => {
                        const listFavorite = qselect('#list-favorite');
                        

                        if(listTeam.length > 0) {
                            listTeam.forEach(team => {
                                listFavorite.innerHTML += 
                                `
                                <div class="col s12 waves-effect">
                                    <a class="card horizontal hoverable" href="views/detail-team.html?id=${team.id}">
                                        <div class="card-image" style="padding: 1rem;">
                                            <img width="100em" height="100em" alt="team logo" src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" style="
                                                height: 10vmax;
                                                z-index: 1;">
                                        </div>
                                        <div class="card-stacked">
                                            <div class="card-content disflex">
                                                <p class="m-auto">${team.name}</p>
                                                <p class="m-auto">${team.area.name}</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                `;
                            });
                        }
                        else
                        listFavorite.innerHTML = `
                            <div id="error-load" class="disflex m-auto">
                                <h4 class="m-auto center-align">There are No Favorite Teams yet</h4>
                            </div>                         
                        `;
                    });
                });
                
                break;
            case 2:
                showView("/views/contact.html");
                break;
        }

    });

    displayLoading();
    showView("/views/league.html");
}