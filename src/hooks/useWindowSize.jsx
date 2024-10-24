import { useState, useEffect } from 'react';

// Hook para monitorar os tamanhos de tela e garantir a resposividade
const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        sm: window.innerWidth < 768 ? true : false,
        md: ((window.innerWidth >= 768) && (window.innerWidth < 1024)) ? true : false,
        lg: window.innerWidth >= 1024 ? true : false,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                sm: window.innerWidth < 768,
                md: window.innerWidth >= 768 && window.innerWidth < 1024,
                lg: window.innerWidth >= 1024,
            });
        };

        window.addEventListener('resize', handleResize);

        // Limpa o listener ao desmontar
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
};

export default useWindowSize;
