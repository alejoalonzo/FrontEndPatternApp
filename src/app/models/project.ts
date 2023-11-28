export class Project {
    constructor(
        public _id: String,
        public name: String,
        public description: String,
        public category: String,
        public langs: String,
        public image: String,
        public repository: String,
        public preview: String
    ){};
}
