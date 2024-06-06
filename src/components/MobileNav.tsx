import {Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger} from "@/components/ui/sheet.tsx";
import {CircleUserRound, Menu} from "lucide-react";
import {Separator} from "@/components/ui/separator.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useAuth0} from "@auth0/auth0-react";
import MobileNavLinks from "@/components/MobileNavLinks.tsx";


function MobileNav() {
    const {isAuthenticated, user, loginWithRedirect} = useAuth0();

    return (
        <Sheet>
            <SheetTrigger>
                <Menu className={'text-orange-500'}/>
            </SheetTrigger>
            <SheetContent>
                <SheetTitle>
                    {isAuthenticated ? (
                        <span className={' flex items-center px-3 ' +
                            'font-bold hover:text-orange-500 gap-2'}
                        >
                            <CircleUserRound className={'text-orange-500'}/>
                            {user?.email}
                        </span>
                    ) : (
                        <span>Bienvenidos a AppITZFood.com</span>
                    )}
                </SheetTitle>
                <Separator/>
                <SheetDescription className="flex">
                    {isAuthenticated ? (
                        <MobileNavLinks/>
                    ):(
                        <Button
                            className={'flex-1 font-bold bg-orange-500'}
                            onClick={async () => {
                                await loginWithRedirect()
                            }}
                        >
                            Log In
                        </Button>
                    )}
                </SheetDescription>
            </SheetContent>
        </Sheet>
    );
}

export default MobileNav;