import { openDB, deleteDB, wrap, unwrap } from 'idb';

export default class ScoreBallIDB {
    
    constructor() {
        this.dbPromised = openDB("score-ball", 1, {
            upgrade(db, oldVersion, newVersion, transaction) {
                const articleObjectStore = db.createObjectStore("teams", {
                    keyPath: "id"
                });
                articleObjectStore.createIndex("name", "name", {unique: false});
            }
        });
    }

    saveToFavorite(teams) {
        this.dbPromised.then(db => {
            const tx = db.transaction("teams", "readwrite");
            const store = tx.objectStore("teams");

            store.add(teams);
            return tx.complete;
        })
        .then(() => {
            console.log("Team saved");
        });
    }

    deleteFromFavorite(id) {
        this.dbPromised.then(db => {
            const tx = db.transaction("teams", "readwrite");
            const store = tx.objectStore("teams");

            store.delete(id);
            return tx.complete;
        })
        .then(() => {
            console.log("Team successfully deleted");
        });
    }

    getTeamsById(id) {
        return new Promise((resolve, reject) => {
            this.dbPromised.then(db => {
                const tx = db.transaction("teams", "readonly");
                const store = tx.objectStore("teams");

                return store.get(id);
            })
            .then(objectData => {
                resolve(objectData);
            })
        });
    }

    getAllTeams() {
        return new Promise((resolve, reject) => {
            this.dbPromised.then(db => {
                const tx = db.transaction("teams", "readonly");
                const store = tx.objectStore("teams");
    
                return store.getAll();
            })
            .then(data => {
                resolve(data);
            })
        });
    }
}