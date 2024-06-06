
import { DropdownMenuTrigger, DropdownMenu, DropdownMenuContent} from "../../../../../../FoodAppt/frontend/src/components/ui/dropdown-menu.tsx";
import { Button } from "../../../../../../FoodAppt/frontend/src/components/ui/button.tsx";
import {DropdownMenuItem} from '@radix-ui/react-dropdown-menu';

type Props = {
    onChange: (value: string) => void;
    sortOption: string;
}
const SORT_OPTIONS = [
    {
        label: "Mejor coincidencia",
        value: "bestMatch"
    },
    {
        label: "Precio de entrega",
        value: "delivaryPrice"
    },
    {
        label: "Tiempo estimado de entrega",
        value: "estimatedDeliveryTime"
    }
]
export default function SortOptionsDropdown({onChange, sortOption}: Props ){
    const selectedSortLabel = 
        SORT_OPTIONS.find((option)=>option.value === sortOption)?.label ||
        SORT_OPTIONS[0].label;
  return (
    <DropdownMenu>
        <DropdownMenuTrigger className= 'cursor-pointer' asChild>
            <Button variant='outline' className= 'w-full'>
                Ordenar por: {selectedSortLabel}
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            {SORT_OPTIONS.map((option)=>(
                <DropdownMenuItem key={option.value} className='cursor-pointer' 
                onClick={()=>onChange(option.value)}>
                    {option.label}
                </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
    </DropdownMenu>
  )
}
