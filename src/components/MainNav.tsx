import {Button} from "@/components/ui/button.tsx";
import {useAuth0} from "@auth0/auth0-react";
import UserNameMenu from "@/components/UserNameMenu.tsx";

function MainNav() {
    const {loginWithRedirect, isAuthenticated} = useAuth0();

    return (
        <span>
            {isAuthenticated ? (
                <UserNameMenu/>
            ) : (
                <Button variant={'ghost'}
                        className={'font-bold hover:text-orange-500 hover:bg-white'}
                        onClick={async () => {
                            await loginWithRedirect()
                        }}
                >
                    Log In
                </Button>
            )}
        </span>
    );
}

export default MainNav;