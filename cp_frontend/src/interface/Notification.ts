import { Optional } from "@angular/core";

export interface Project {
id: String
createurId: String
projectId: String
sectionId?: String
tacheId?: String
message: String 
createdAt: Date
parentId?: String
notificationsGenerated?: String[]
[key:string]:any;
}

export default Project;