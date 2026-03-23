export const themesDictionary = {
  cities: ['москва', 'лондон', 'токио', 'париж', 'берлин'],
  countries: ['россия', 'германия', 'япония', 'франция', 'италия'],
  transport: ['автомобиль', 'поезд', 'самолёт', 'велосипед', 'корабль'],
  food: ['пицца', 'суши', 'борщ', 'паста', 'салат']
} as const;

export type ThemeKey = keyof typeof themesDictionary;