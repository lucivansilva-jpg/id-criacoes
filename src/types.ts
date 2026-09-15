export type Category = 
  | 'Todos' 
  | 'Eventos' 
  | 'Energia Solar' 
  | 'Tecnologia' 
  | 'Institucional' 
  | 'Financeiro' 
  | 'Hotelaria' 
  | 'Advocacia' 
  | 'Contabilidade' 
  | 'Delivery' 
  | 'Odontologia' 
  | 'Pizzaria' 
  | 'Saúde e Beleza' 
  | 'Serviços';

export interface WebsiteModel {
  id: string;
  title: string;
  description: string;
  category: Category;
  imageUrl: string;
  demoUrl: string;
}

