 class Player {
    constructor(name, token = 'X') {
        this.name = name;
        this.token = token;
    }
     changeName(name) {
            this.name = name;
        }
    getName() {
        return this.name;
    }

    getToken() {
        return this.token;
    }
}

export default Player;
