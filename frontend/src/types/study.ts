export type StudyCard = {
    id : string;
    question : string;
    answer : string;
    distractors : [string,string,string];
}
export type studyResult = {
    cards : StudyCard[];
}