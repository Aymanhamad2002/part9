interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }
  interface coursePartDescription extends CoursePartBase{
    description: string;

  }
  
  interface CoursePartBasic extends coursePartDescription {
   
    kind: "basic"
  }
  
  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
  }
  
  interface CoursePartBackground extends coursePartDescription{
   
    backgroundMaterial: string;
    kind: "background"
  }
  interface CoursePartSpecial extends coursePartDescription {
    requirements: string[];
    kind: "special";
  }
  
  export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;