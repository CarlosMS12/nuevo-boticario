import {useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import {supabase} from './lib/supabase';
import PotionBottle from './components/PotionBottle';
import Modal from './components/Modal';
import {useSounds} from './hooks/useSounds';
import fondoImg from './assets/fondo.png';
import cartasImg from './assets/cartas.png';

function App() {
	const [potions, setPotions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedPotion, setSelectedPotion] = useState(null);
	const [currentMessage, setCurrentMessage] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [loadingMessage, setLoadingMessage] = useState(false);
	const {playSound, stopSound} = useSounds();

	// Cargar pociones al inicio
	useEffect(() => {
		fetchPotions();
	}, []);

	const fetchPotions = async () => {
		try {
			const {data, error} = await supabase.from('potions').select('*').order('order');

			if (error) throw error;
			setPotions(data || []);
		} catch (error) {
			console.error('Error al cargar pociones:', error);
		} finally {
			setLoading(false);
		}
	};

	const handlePotionClick = async (potion) => {
		playSound('hechizo');
		setSelectedPotion(potion);
		setLoadingMessage(true);

		try {
			// Obtener mensajes para esta poción
			const {data, error} = await supabase
				.from('magic_messages')
				.select('*')
				.eq('potion_id', potion.id)
				.eq('is_active', true);

			if (error) throw error;

			if (data && data.length > 0) {
				// Seleccionar mensaje aleatorio
				const randomMessage = data[Math.floor(Math.random() * data.length)];
				setCurrentMessage(randomMessage);
				setModalOpen(true);
				playSound('abrirCarta');
			}
		} catch (error) {
			console.error('Error al cargar mensaje:', error);
		} finally {
			setLoadingMessage(false);
		}
	};

	const closeModal = () => {
		playSound('cerrar');
		setModalOpen(false);
		setTimeout(() => {
			setCurrentMessage(null);
			setSelectedPotion(null);
		}, 300);
	};

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-black">
				<motion.div
					animate={{rotate: 360}}
					transition={{duration: 2, repeat: Infinity, ease: 'linear'}}
					className="text-amber-400 text-4xl"
				>
					✨
				</motion.div>
			</div>
		);
	}

	return (
		<div className="relative min-h-screen w-full overflow-hidden">
			{/* Fondo mágico */}
			<div
				className="absolute inset-0 bg-cover bg-center bg-no-repeat"
				style={{
					backgroundImage: `url(${fondoImg})`,
				}}
			>
				<div className="absolute inset-0 bg-black/30" />
			</div>

			{/* Contenido principal */}
			<div className="relative z-10 min-h-screen flex flex-col">
				{/* Título superior */}
				<motion.div
					initial={{opacity: 0, y: -50}}
					animate={{opacity: 1, y: 0}}
					transition={{duration: 1}}
					className="pt-8 pb-4 text-center"
				>
					<h1 className="text-4xl md:text-6xl font-magic text-amber-100 drop-shadow-lg">
						El Boticario Mágico
					</h1>
					<p className="text-amber-300 text-lg md:text-xl mt-2 italic">
						Elige tu poción del día
					</p>
				</motion.div>

				{/* Pociones flotantes en el centro */}
				<div className="flex-1 flex items-center justify-center px-4 py-12">
					<div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 max-w-6xl">
						{potions.map((potion, index) => (
							<PotionBottle
								key={potion.id}
								potion={potion}
								index={index}
								onClick={handlePotionClick}
								onHoverStart={() => playSound('hover')}
								onHoverEnd={() => stopSound('hover')}
							/>
						))}
					</div>
				</div>

				{/* Cartas en la parte inferior */}
				<motion.div
					initial={{opacity: 0, y: 100}}
					animate={{opacity: 1, y: 0}}
					transition={{delay: 0.5, duration: 0.8}}
					className="pb-4 flex justify-center relative"
				>
					{/* Brillo mágico cuando se selecciona una poción */}
					{modalOpen && selectedPotion && (
						<motion.div
							initial={{opacity: 0, scale: 0.8}}
							animate={{opacity: 1, scale: 1}}
							exit={{opacity: 0, scale: 0.8}}
							className="absolute inset-0 flex items-center justify-center pointer-events-none"
						>
							<motion.div
								animate={{
									opacity: [0.4, 0.8, 0.4],
									scale: [1, 1.1, 1],
								}}
								transition={{
									duration: 2,
									repeat: Infinity,
									ease: 'easeInOut',
								}}
								className="w-48 md:w-64 h-full rounded-lg blur-2xl"
								style={{
									background: `radial-gradient(circle, ${selectedPotion.color_hex}80, ${selectedPotion.color_hex}40, transparent)`,
								}}
							/>
						</motion.div>
					)}

					<motion.img
						src={cartasImg}
						alt="Cartas mágicas"
						animate={{
							filter:
								modalOpen && selectedPotion
									? `drop-shadow(0 0 30px ${selectedPotion.color_hex}) drop-shadow(0 10px 50px ${selectedPotion.color_hex}80)`
									: 'drop-shadow(0 10px 30px rgba(0,0,0,0.7))',
						}}
						transition={{duration: 0.5}}
						className="w-48 md:w-64 object-contain relative z-10"
					/>
				</motion.div>
			</div>

			{/* Modal de mensaje */}
			<Modal
				isOpen={modalOpen}
				onClose={closeModal}
				message={currentMessage}
				potionColor={selectedPotion?.color_hex || '#FFD700'}
			/>

			{/* Indicador de carga de mensaje */}
			{loadingMessage && (
				<div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center">
					<motion.div
						animate={{
							scale: [1, 1.2, 1],
							rotate: [0, 360],
						}}
						transition={{duration: 1.5, repeat: Infinity}}
						className="text-amber-400 text-5xl"
					>
						✨
					</motion.div>
				</div>
			)}
		</div>
	);
}

export default App;
