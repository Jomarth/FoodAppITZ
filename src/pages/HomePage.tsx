import landingImage from '/src/assets/landing.png';
import SearchBar, {SearchForm} from "@/components/SearchBar.tsx";
import {useNavigate} from "react-router-dom";

function HomePage() {
    const navigate = useNavigate();
    const handleSearchSubmit = (searchFormValues: SearchForm) => {
        console.log(searchFormValues.searchQuery);
        navigate({
            pathname: "/search/" + searchFormValues.searchQuery,
        });
    }

    return (
        <div className={'flex flex-col gap-12'}>
            <div className={'m:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16'}>

                <h1 className={'text-5xl font-bold tracking-tight text-orange-500'}>
                    Disfruta de tu comida para llevar
                </h1>
                <span className={'text-xl'}>
                    ¡Tu comida esta a solo un clic!
                </span>
                <SearchBar onSubmit={handleSearchSubmit} placeholder={'Busca por ciudad o país'} searchQuery={''}/>
                <div className={'grid md:grid-cols-2 gap-5'}>
                    <img src={landingImage} alt="No se encontró :( "/>
                </div>
                <div className={'flex flex-col items-center justify-center gap-4 text-center'}>
                    <span className={'font-bold text-3xl tracking-tighter'}>
                        Pide comida para llevar aún más rápido
                    </span>
                </div>
            </div>
        </div>
    );
}

export default HomePage;