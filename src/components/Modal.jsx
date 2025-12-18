import {motion, AnimatePresence} from 'framer-motion';

export default function Modal({isOpen, onClose, message, potionColor}) {
	if (!isOpen || !message) return null;

	return (
		<AnimatePresence>
			<motion.div
				initial={{opacity: 0}}
				animate={{opacity: 1}}
				exit={{opacity: 0}}
				onClick={onClose}
				className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6"
			>
				<motion.div
					initial={{
						y: '100vh',
						scale: 0.8,
						opacity: 0,
						rotateX: 15,
					}}
					animate={{
						y: 0,
						scale: 1,
						opacity: 1,
						rotateX: 0,
					}}
					exit={{
						y: '100vh',
						scale: 0.8,
						opacity: 0,
						rotateX: 15,
					}}
					transition={{
						type: 'spring',
						damping: 25,
						stiffness: 200,
						duration: 0.6,
					}}
					onClick={(e) => e.stopPropagation()}
					className="relative max-w-lg w-full"
					style={{
						perspective: '1000px',
					}}
				>
					{/* Botón cerrar - Fuera de la carta */}
					<button
						onClick={onClose}
						className="hidden sm:flex absolute -top-6 -right-6 w-10 h-10 items-center justify-center rounded-full bg-amber-800 text-amber-50 hover:bg-amber-900 transition-all hover:scale-110 shadow-xl border-2 border-amber-600 z-10 text-xl"
						style={{
							boxShadow: `0 0 15px ${potionColor}60`,
						}}
					>
						✕
					</button>{' '}
					{/* Carta mágica */}
					<div
						className="relative bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg shadow-2xl p-4 sm:p-6 md:p-8 border-2 sm:border-4 border-amber-800"
						style={{
							boxShadow: `0 0 40px ${potionColor}40, 0 20px 60px rgba(0,0,0,0.5)`,
						}}
					>
						{/* Decoraciones de esquina */}
						<div className="absolute top-1 left-1 sm:top-2 sm:left-2 text-amber-800 opacity-30 text-lg sm:text-2xl">
							✦
						</div>
						<div className="absolute top-1 right-1 sm:top-2 sm:right-2 text-amber-800 opacity-30 text-lg sm:text-2xl">
							✦
						</div>
						<div className="absolute bottom-1 left-1 sm:bottom-2 sm:left-2 text-amber-800 opacity-30 text-lg sm:text-2xl">
							✦
						</div>
						<div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 text-amber-800 opacity-30 text-lg sm:text-2xl">
							✦
						</div>
						{/* Contenido */}
						<div className="mt-2 sm:mt-4">
							<p className="text-amber-900 text-sm sm:text-base md:text-lg leading-relaxed font-serif italic text-center">
								"{message.message}"
							</p>
							{message.author && (
								<p className="text-amber-700 text-xs sm:text-sm mt-3 sm:mt-4 text-right font-magic">
									— {message.author}
								</p>
							)}
						</div>{' '}
						{/* Brillo mágico */}
						<motion.div
							animate={{
								opacity: [0.3, 0.6, 0.3],
							}}
							transition={{
								duration: 2,
								repeat: Infinity,
								ease: 'easeInOut',
							}}
							className="absolute inset-0 rounded-lg pointer-events-none"
							style={{
								background: `radial-gradient(circle at 50% 50%, ${potionColor}15, transparent 70%)`,
							}}
						/>
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
}
