import { useMutation , useQuery } from '@tanstack/react-query';
import { MenuService } from '../services/menuService';

export const useGetAllMenu =  (params)=> useQuery({
        queryKey: ['user', 'menu', params],
        queryFn: () => MenuService.getAllMenu(params)
});




