import {useEffect, useRef} from 'react';
import sonidoHover from '../assets/sonido_hover.mp3';
import sonidoHechizo from '../assets/sonido_hechizo.mp3';
import sonidoAbrirCarta from '../assets/sonido_abrircarta.mp3';
import sonidoCerrar from '../assets/sonido_cerrar.mp3';
import sonidoAmbiente from '../assets/sonido_ambiente.mp3';

export const useSounds = () => {
	const audioRefs = useRef({
		hover: null,
		hechizo: null,
		abrirCarta: null,
		cerrar: null,
		ambiente: null,
	});

	useEffect(() => {
		// Inicializar todos los audios
		audioRefs.current.hover = new Audio(sonidoHover);
		audioRefs.current.hechizo = new Audio(sonidoHechizo);
		audioRefs.current.abrirCarta = new Audio(sonidoAbrirCarta);
		audioRefs.current.cerrar = new Audio(sonidoCerrar);
		audioRefs.current.ambiente = new Audio(sonidoAmbiente);

		// Configurar volúmenes
		audioRefs.current.hover.volume = 0.3;
		audioRefs.current.hechizo.volume = 0.15;
		audioRefs.current.abrirCarta.volume = 0.5;
		audioRefs.current.cerrar.volume = 0.5;
		audioRefs.current.ambiente.volume = 0.15; // Muy bajito para el ambiente
		audioRefs.current.ambiente.loop = true; // El ambiente se repite

		// Iniciar música de ambiente
		const playAmbiente = () => {
			audioRefs.current.ambiente.play().catch((err) => {
				console.log('El audio de ambiente requiere interacción del usuario');
			});
		};

		// Intentar reproducir el ambiente, o esperar a la primera interacción
		playAmbiente();

		// Si el navegador bloquea el autoplay, reproducir en el primer click
		const handleFirstInteraction = () => {
			playAmbiente();
			document.removeEventListener('click', handleFirstInteraction);
		};
		document.addEventListener('click', handleFirstInteraction);

		return () => {
			// Limpiar al desmontar
			Object.values(audioRefs.current).forEach((audio) => {
				if (audio) {
					audio.pause();
					audio.src = '';
				}
			});
			document.removeEventListener('click', handleFirstInteraction);
		};
	}, []);

	const playSound = (soundType) => {
		const audio = audioRefs.current[soundType];
		if (audio) {
			// Reiniciar el audio si ya está reproduciéndose
			audio.currentTime = 0;
			audio.play().catch((err) => {
				console.log(`Error al reproducir ${soundType}:`, err);
			});
		}
	};

	const stopSound = (soundType) => {
		const audio = audioRefs.current[soundType];
		if (audio) {
			audio.pause();
			audio.currentTime = 0;
		}
	};

	return {playSound, stopSound};
};
