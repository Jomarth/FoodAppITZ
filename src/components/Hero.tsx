import hero from '@/assets/hero.png';

function Hero() {
    return (
        <div>
            <img src={hero}
                 className="w-full max-h-[600] object-cover"
                 alt="No se encontro :("
            />

        </div>
    );
}

export default Hero;