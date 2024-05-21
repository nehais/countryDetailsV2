export interface Country {
    cca2 : string;
    name: {
        common: string;
        official: string;
    };
    population: number;
    unMember: boolean;
    flag: {
        png: string
    };
    languages: any;
}
