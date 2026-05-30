export interface IMenuItem {
    id?: string;
    image: string;
    heading: string;
    description: string;
    price: number;
    category: 'sushi' | 'drinks';
}
