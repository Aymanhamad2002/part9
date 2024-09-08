import {z} from 'zod';


export enum Weather {
    Sunny = 'sunny',
    Rainy = 'rainy',
    Cloudy = 'cloudy',
    Stormy = 'stormy',
    Windy = 'windy',
  }
  export enum Visibility {
    Great = 'great',
    Good = 'good',
    Ok = 'ok',
    Poor = 'poor',
  }

export interface Diary extends newDiary{
  id: number;
};
  export const newDiarySchema = z.object({
    date: z.string().date(),
    weather : z.nativeEnum(Weather),
    visibility : z.nativeEnum(Visibility),
    comment : z.string().optional(),
  
  })
export  type newDiary = z.infer<typeof newDiarySchema >;
