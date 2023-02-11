import styles from "./../styles/glitch404.module.css"

export default function custom404() {
	return (
		<div className="flex justify-center flex-col w-full">
			<div
				title="404"
				className={`${styles.glitch404} text-6xl md:text-9xl border-2`}
			>
				404
			</div>
		</div>
	)
}
