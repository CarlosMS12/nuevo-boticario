import {motion} from 'framer-motion';
import {useState} from 'react';

export default function PotionBottle({potion, onClick, index}) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<motion.div
			initial={{opacity: 0, y: 50}}
			animate={{opacity: 1, y: 0}}
			transition={{delay: index * 0.1, duration: 0.5}}
			whileHover={{scale: 1.15, y: -10}}
			onHoverStart={() => setIsHovered(true)}
			onHoverEnd={() => setIsHovered(false)}
			onClick={() => onClick(potion)}
			className="relative cursor-pointer group"
			style={{
				filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))',
			}}
		>
			{/* Contenedor de la poción con animación de flotación */}
			<motion.div
				animate={{
					y: [0, -15, 0],
				}}
				transition={{
					duration: 3,
					repeat: Infinity,
					ease: 'easeInOut',
					delay: index * 0.3,
				}}
				className="relative"
			>
				{/* Brillo mágico */}
				<motion.div
					animate={{
						opacity: isHovered ? [0.5, 1, 0.5] : [0.3, 0.6, 0.3],
						scale: isHovered ? [1, 1.2, 1] : [1, 1.1, 1],
					}}
					transition={{
						duration: 2,
						repeat: Infinity,
						ease: 'easeInOut',
					}}
					className="absolute inset-0 rounded-full blur-xl"
					style={{
						background: `radial-gradient(circle, ${potion.color_hex}80, transparent 70%)`,
						transform: 'scale(1.5)',
					}}
				/>

				{/* Imagen de la poción */}
				<img
					src={potion.image_url}
					alt={potion.name}
					className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain transition-all duration-300"
					style={{
						filter: isHovered ? `drop-shadow(0 0 20px ${potion.color_hex})` : 'none',
					}}
				/>

				{/* Partículas mágicas */}
				{isHovered && (
					<>
						{[...Array(5)].map((_, i) => (
							<motion.div
								key={i}
								initial={{opacity: 0, scale: 0, x: 0, y: 0}}
								animate={{
									opacity: [0, 1, 0],
									scale: [0, 1, 0],
									x: [0, (Math.random() - 0.5) * 100],
									y: [0, -Math.random() * 100],
								}}
								transition={{
									duration: 2,
									delay: i * 0.1,
									repeat: Infinity,
								}}
								className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
								style={{backgroundColor: potion.color_hex}}
							/>
						))}
					</>
				)}
			</motion.div>

			{/* Nombre y texto hover */}
			<motion.div
				initial={{opacity: 0}}
				animate={{opacity: isHovered ? 1 : 0}}
				className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
			>
				<div className="bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-amber-600">
					<p className="text-amber-100 font-magic text-sm">{potion.name}</p>
					<p className="text-amber-400 text-xs italic">{potion.hover_text}</p>
				</div>
			</motion.div>
		</motion.div>
	);
}
