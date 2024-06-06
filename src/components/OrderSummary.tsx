import {Restaurant} from '../types';
import {CardContent, CardHeader, CardTitle} from './ui/card';
import {Separator} from '@radix-ui/react-separator';
import {Trash} from 'lucide-react';
import {CartItem} from "@/pages/DetailPage.tsx";
import {Badge} from "@/components/ui/badge.tsx";

type Props = {
    restaurant: Restaurant;
    cartItems: CartItem[];
    removeFromCart: (cartItem: CartItem) => void;
}

export default function OrderSummary({restaurant, cartItems, removeFromCart}: Props) {

    const getTotalCost = () => {
        const total = cartItems.reduce(
            (total, cartItem) => total + cartItem.price * cartItem.quantity, 0);

        const totalWithDdelivery = total + restaurant.deliveryPrice;
        return totalWithDdelivery.toFixed(2);
    }

    return (
        <>
            <CardHeader>
                <CardTitle className='text-2xl font-bold tracking-thigt flex justify-between'>
                    <span>Su orden</span>
                    <span>${getTotalCost()}</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {
                    cartItems.map((item, key) => (
                        <div className='flex justify-between mb-2 mt-2' key={key}>
                        <span>
                            <Badge variant="outline" className='mr-2'>
                                {item.quantity}
                            </Badge>
                            {item.name}
                        </span>
                            <span className='flex items-center gap-1'>
                            <Trash className='cursor-pointer'
                                   color='red'
                                   size={20}
                                   onClick={() => removeFromCart(item)}
                            />
                            ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        </div>
                    ))
                }
                <Separator/>
                <div className='flex justify-between'>
                    <span>Costo de envio</span>
                    <span>${restaurant.deliveryPrice.toFixed(2)}</span>
                </div>
                <Separator/>
            </CardContent>
        </>
    )
}
