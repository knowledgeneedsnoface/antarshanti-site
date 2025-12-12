import { useAtlas } from "../(store)/atlasContext";
import { PathType } from "../(hooks)/usePersonalizer";
import { motion } from "framer-motion";
import { ATLAS_AUDIO_ASSETS } from "../(hooks)/useAtlasAudio";

export default function PathChooser({ onPathSelect }: { onPathSelect: (path: PathType) => void }) {
    const { config, audio } = useAtlas();

    const paths: { type: PathType, label: string, desc: string }[] = [
        { type: "ANCHOR", label: "Anchor", desc: "Ground yourself. Find stability." },
        { type: "RELEASE", label: "Release", desc: "Let go of weight. Flow freely." },
        { type: "IGNITE", label: "Ignite", desc: "Spark creativity. Find power." }
    ];

    return (
        <section className="h-screen flex flex-col items-center justify-center p-6 text-center">
            <motion.h2
                className="text-2xl md:text-3xl font-light mb-12 text-white/80"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                The Atlas suggests: <span style={{ color: config?.palette.primary }}>{config?.recommendedPath}</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
                {paths.map((path) => (
                    <motion.button
                        key={path.type}
                        onClick={() => {
                            audio.playSound(ATLAS_AUDIO_ASSETS.INTERACTION_CHIME);
                            onPathSelect(path.type);
                        }}
                        className={`p-8 rounded-2xl border border-white/10 hover:bg-white/5 transition-all group relative overflow-hidden`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {/* Highlights recommended path */}
                        {config?.recommendedPath === path.type && (
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                        )}

                        <h3 className="text-xl font-bold uppercase tracking-widest mb-3">{path.label}</h3>
                        <p className="text-sm text-gray-400 font-light">{path.desc}</p>
                    </motion.button>
                ))}
            </div>
        </section>
    );
}
