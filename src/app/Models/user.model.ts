export class User {
    constructor(
        public UserName?: string,
        public Email?: string,
        public Mobile?: number,
        public Password?: string,
    ) { }
}

export class Credentials {
    constructor(
        public Email?: string,
        public Password?: string,
    ) { }
}