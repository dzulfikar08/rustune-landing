import { createFileRoute } from "@tanstack/react-router";
import {
	Github,
	Download,
	Heart,
	Cpu,
	Palette,
	Radio,
	Zap,
	Shield,
	Terminal,
	ArrowRight,
	SlidersHorizontal,
	Activity,
	Server,
	Mic,
	Keyboard,
	Podcast,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
	component: Index,
});

/* ─── Animated Waveform Visualizer ─── */
function WaveformVisualizer() {
	return (
		<div className="flex items-end justify-center gap-[3px] h-16 opacity-30">
			{Array.from({ length: 40 }).map((_, i) => (
				<div
					key={i}
					className="w-[3px] rounded-full bg-gradient-to-t from-[#00ff88] to-[#00d4ff]"
					style={{
						height: `${20 + Math.random() * 80}%`,
						animation: `waveform ${0.8 + Math.random() * 0.8}s ease-in-out ${Math.random() * 0.5}s infinite alternate`,
						transformOrigin: "bottom",
					}}
				/>
			))}
		</div>
	);
}

/* ─── Intersection Observer Hook ─── */
function useInView(threshold = 0.15) {
	const ref = useRef<HTMLDivElement>(null);
	const [inView, setInView] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setInView(true);
					observer.disconnect();
				}
			},
			{ threshold },
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, [threshold]);

	return { ref, inView };
}

/* ─── Stat Counter ─── */
function StatCounter({
	value,
	label,
	delay,
}: { value: string; label: string; delay: string }) {
	const { ref, inView } = useInView();
	return (
		<div
			ref={ref}
			className={`text-center transition-all duration-700 ${
				inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
			}`}
			style={{ transitionDelay: delay }}
		>
			<div className="font-mono-display text-4xl sm:text-5xl font-bold tracking-tighter gradient-text">
				{value}
			</div>
			<div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-2 font-mono-display">
				{label}
			</div>
		</div>
	);
}

function Index() {
	return (
		<div className="min-h-screen bg-background text-foreground overflow-x-hidden noise-overlay">
			{/* ─── Ambient Background ─── */}
			<div className="fixed inset-0 pointer-events-none overflow-hidden">
				<div className="absolute -top-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-[#00ff88] opacity-[0.02] blur-[150px]" />
				<div className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-[#00d4ff] opacity-[0.015] blur-[120px]" />
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[400px] rounded-full bg-[#a855f7] opacity-[0.01] blur-[180px]" />
			</div>

			{/* ─── Nav ─── */}
			<nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#ffffff06] bg-[#050505]/70 backdrop-blur-2xl">
				<div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<img src="/favicon.svg" alt="rustune" className="w-7 h-7" />
						<span className="font-mono-display text-sm font-bold tracking-tight">
							rustune
						</span>
						<span className="hidden sm:inline text-[10px] font-mono-display text-[#00ff88]/70 border border-[#00ff88]/20 rounded px-1.5 py-0.5 ml-1">
							v0.3
						</span>
					</div>
					<div className="flex items-center gap-6">
						<a
							href="https://github.com/dzulfikar08/rustune"
							target="_blank"
							rel="noopener"
							className="text-muted-foreground hover:text-foreground transition-colors text-sm font-mono-display"
						>
							<Github className="w-4 h-4" />
						</a>
						<Button
							size="sm"
							className="text-xs font-mono-display h-8 bg-[#00ff88] text-black hover:bg-[#00dd77] font-bold tracking-wide"
							onClick={() =>
								document
									.getElementById("download")
									?.scrollIntoView({ behavior: "smooth" })
							}
						>
							<Download className="w-3.5 h-3.5 mr-1.5" />
							GET
						</Button>
					</div>
				</div>
			</nav>

			{/* ─── Hero ─── */}
			<section className="relative pt-28 sm:pt-36 pb-16 px-6">
				<div className="max-w-4xl mx-auto text-center relative z-10">
					{/* Badge */}
					<div className="animate-fade-in-up inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#00ff88]/15 bg-[#00ff88]/[0.03] text-xs font-mono-display text-muted-foreground mb-10">
						<span className="relative flex h-2 w-2">
							<span className="absolute inline-flex h-full w-full rounded-full bg-[#00ff88] opacity-60 animate-[pulse-ring_1.5s_ease-out_infinite]" />
							<span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff88]" />
						</span>
						v0.3 — real winamp skins in your terminal
					</div>

					{/* Heading */}
					<h1 className="animate-fade-in-up delay-100 text-[3.5rem] sm:text-[6rem] leading-[0.9] tracking-tighter mb-8 font-extrabold">
						<span className="block text-foreground/90">your audio.</span>
						<span className="block gradient-text glow-green mt-1">
							minimal
						</span>
						<span className="block text-foreground/90">resources.</span>
					</h1>

					{/* Waveform */}
					<div className="animate-fade-in delay-300 mb-10">
						<WaveformVisualizer />
					</div>

					{/* Subtitle */}
					<p className="animate-fade-in-up delay-300 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed">
						A terminal audio player in a{" "}
						<span className="text-[#00ff88] font-mono-display font-bold">
							5&nbsp;MB
						</span>{" "}
						binary. Load any classic Winamp <code className="font-mono-display">.wsz</code>{" "}
						skin, pixel for pixel. Local files, radio, podcasts, Navidrome,
						Jellyfin and YouTube — no mpv, no Electron.
					</p>

					{/* CTAs */}
					<div className="animate-fade-in-up delay-400 flex flex-col sm:flex-row gap-3 justify-center">
						<Button
							size="lg"
							className="text-sm px-8 h-12 bg-[#00ff88] text-black hover:bg-[#00dd77] font-mono-display font-bold tracking-wide group"
							onClick={() =>
								document
									.getElementById("download")
									?.scrollIntoView({ behavior: "smooth" })
							}
						>
							<Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
							Download
							<ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
						</Button>
						<Button
							variant="outline"
							size="lg"
							className="text-sm px-8 h-12 font-mono-display border-border/60 hover:border-[#00ff88]/30 hover:bg-[#00ff88]/[0.03]"
							asChild
						>
							<a
								href="https://github.com/dzulfikar08/rustune"
								target="_blank"
								rel="noopener"
							>
								<Github className="w-4 h-4 mr-2" />
								View Source
							</a>
						</Button>
					</div>

					{/* App Screenshots */}
					<div className="animate-fade-in-up delay-600 mt-20 grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto items-start">
						{[
							{
								src: "/skin-zelda.webp",
								skin: "Zelda Amp 3",
								alt: "rustune with the Zelda Amp Winamp skin: main window, equalizer and playlist",
							},
							{
								src: "/skin-breeder.webp",
								skin: "Breeder Unit 003",
								alt: "rustune with the Breeder Unit Winamp skin: main window and playlist",
							},
						].map((shot) => (
							<figure
								key={shot.src}
								className="crt-terminal rounded-xl border border-[#00ff88]/10 glow-box overflow-hidden"
							>
								<div className="flex items-center gap-3 px-4 py-2.5 bg-[#0a0a0a] border-b border-[#ffffff06]">
									<div className="flex gap-2">
										<div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/60" />
										<div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/60" />
										<div className="w-2.5 h-2.5 rounded-full bg-[#28c840]/60" />
									</div>
									<span className="text-[11px] font-mono-display text-muted-foreground/40 tracking-wider">
										rustune — {shot.skin}
									</span>
								</div>
								<div className="bg-[#080808]">
									<img
										src={shot.src}
										alt={shot.alt}
										loading="lazy"
										className="w-full h-auto block [image-rendering:pixelated]"
									/>
								</div>
							</figure>
						))}
					</div>
					<p className="mt-6 text-xs font-mono-display text-muted-foreground/50">
						real screenshots · skins from the Winamp Skin Museum, browsable
						inside the app
					</p>
				</div>
			</section>

			{/* ─── Stats ─── */}
			<section className="py-20 px-6 diagonal-divider">
				<div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-10">
					<StatCounter value="4.9MB" label="macOS Binary" delay="0ms" />
					<StatCounter value="0.1%" label="CPU While Playing" delay="100ms" />
					<StatCounter value="0" label="Runtime Deps" delay="200ms" />
					<StatCounter value="100k+" label="Winamp Skins Online" delay="300ms" />
				</div>
			</section>

			{/* ─── Features ─── */}
			<section className="py-24 px-6">
				<div className="max-w-6xl mx-auto">
					<div className="mb-20">
						<div className="font-mono-display text-[11px] text-[#00ff88] tracking-[0.3em] uppercase mb-4">
							features
						</div>
						<h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
							Why rustune
							<span className="text-muted-foreground">?</span>
						</h2>
						<p className="text-muted-foreground text-lg mt-4 max-w-lg leading-relaxed">
							Everything a modern player does, without a browser, a daemon
							zoo, or a 35&nbsp;MB binary.
						</p>
					</div>

					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
						{[
							{
								icon: Palette,
								title: "Real Winamp Skins",
								desc: "Browse 100,000+ skins from the Winamp Skin Museum with a live preview. Main window, EQ and playlist are drawn from the skin's own sprites, and every button and slider works.",
								color: "#a855f7",
							},
							{
								icon: SlidersHorizontal,
								title: "Native Audio Engine",
								desc: "Gapless playback, ReplayGain, a 10-band EQ with presets, balance. Pure Rust decoding, no mpv required.",
								color: "#00ff88",
							},
							{
								icon: Activity,
								title: "Live Visualizer",
								desc: "Real FFT spectrum and oscilloscope from what's playing: bars, LED, mirror, spectrogram, fire. Sleeps when paused.",
								color: "#00d4ff",
							},
							{
								icon: Radio,
								title: "Internet Radio",
								desc: "Browse ~58,000 stations from Radio Browser by country, tag or popularity. Now-playing titles from the stream.",
								color: "#f97316",
							},
							{
								icon: Podcast,
								title: "Podcasts",
								desc: "Top charts, search and subscriptions. Episodes stream with seeking, no account needed.",
								color: "#facc15",
							},
							{
								icon: Server,
								title: "Navidrome & Jellyfin",
								desc: "Stream your own library from Subsonic-compatible servers or Jellyfin, with scrobbling and playback reporting.",
								color: "#00ff88",
							},
							{
								icon: Mic,
								title: "Synced Lyrics",
								desc: "Time-synced lyrics from LRCLIB that follow the song, with plain-text fallback.",
								color: "#a855f7",
							},
							{
								icon: Terminal,
								title: "Remote Control",
								desc: "rustune next, rustune status --json, rustune --daemon. Media keys on macOS and Linux (MPRIS).",
								color: "#00d4ff",
							},
							{
								icon: Keyboard,
								title: "Command Palette",
								desc: "Press ? or Ctrl+K to fuzzy-search every action. Winamp keys z x c v b work too.",
								color: "#f97316",
							},
						].map((feature, i) => (
							<FeatureCard key={feature.title} feature={feature} index={i} />
						))}
					</div>
				</div>
			</section>

			{/* ─── Lightweight ─── */}
			<section className="py-24 px-6 diagonal-divider">
				<div className="max-w-3xl mx-auto">
					<div className="font-mono-display text-[11px] text-[#00ff88] tracking-[0.3em] uppercase mb-4">
						lightweight
					</div>
					<h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05] mb-4">
						Small on purpose<span className="text-muted-foreground">.</span>
					</h2>
					<p className="text-muted-foreground text-lg mb-10 max-w-xl leading-relaxed">
						Inspired by{" "}
						<a
							href="https://github.com/bjarneo/cliamp"
							target="_blank"
							rel="noopener"
							className="text-foreground underline underline-offset-4 decoration-[#00ff88]/40 hover:decoration-[#00ff88]"
						>
							cliamp
						</a>
						, a great Winamp-style terminal player. rustune takes the same idea
						and keeps it tiny.
					</p>
					<div className="glass-card rounded-2xl overflow-hidden">
						<table className="w-full text-sm font-mono-display">
							<thead>
								<tr className="text-left text-muted-foreground/70 border-b border-border/40">
									<th className="px-5 py-3 font-normal" />
									<th className="px-5 py-3 font-normal text-[#00ff88]">rustune 0.3</th>
									<th className="px-5 py-3 font-normal">cliamp 2.3</th>
								</tr>
							</thead>
							<tbody className="[&_td]:px-5 [&_td]:py-3 [&_tr]:border-b [&_tr]:border-border/20">
								<tr>
									<td className="text-muted-foreground">macOS arm64 binary</td>
									<td className="text-[#00ff88]">4.9 MB</td>
									<td>34.9 MB</td>
								</tr>
								<tr>
									<td className="text-muted-foreground">Linux x64 binary</td>
									<td className="text-[#00ff88]">6.1 MB</td>
									<td>38.0 MB</td>
								</tr>
								<tr>
									<td className="text-muted-foreground">Winamp .wsz skins</td>
									<td className="text-[#00ff88]">full sprites</td>
									<td>colour theme</td>
								</tr>
								<tr>
									<td className="text-muted-foreground">ReplayGain</td>
									<td className="text-[#00ff88]">yes</td>
									<td>no</td>
								</tr>
								<tr className="border-b-0">
									<td className="text-muted-foreground">Required runtime tools</td>
									<td className="text-[#00ff88]">none</td>
									<td>codec libs on macOS</td>
								</tr>
							</tbody>
						</table>
					</div>
					<p className="text-[11px] text-muted-foreground/50 font-mono-display mt-4 leading-relaxed">
						Sizes are the published release binaries. cliamp supports more
						streaming services (Spotify, Tidal, Qobuz) and Lua plugins.
						Optional for both: yt-dlp for YouTube, ffmpeg for rare formats.
					</p>
				</div>
			</section>

			{/* ─── Quick start ─── */}
			<section className="py-24 px-6">
				<div className="max-w-3xl mx-auto">
					<div className="font-mono-display text-[11px] text-[#00ff88] tracking-[0.3em] uppercase mb-4">
						quick start
					</div>
					<h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05] mb-10">
						Feels like 1999<span className="text-muted-foreground">.</span>
					</h2>
					<div className="rounded-xl bg-[#0a0a0a] border border-border/40 p-6 font-mono-display text-[13px] leading-7 overflow-x-auto">
						<div>
							<span className="text-muted-foreground/50">$</span>{" "}
							<span className="text-[#00ff88]">rustune ~/Music</span>
							<span className="text-muted-foreground/40">
								{"      "}# play a folder, press t for the Winamp skin
							</span>
						</div>
						<div>
							<span className="text-muted-foreground/50">$</span>{" "}
							<span className="text-[#00ff88]">rustune next</span>
							<span className="text-muted-foreground/40">
								{"         "}# control it from another terminal
							</span>
						</div>
						<div>
							<span className="text-muted-foreground/50">$</span>{" "}
							<span className="text-[#00ff88]">rustune status --json</span>
							<span className="text-muted-foreground/40">
								{"  "}# for status bars and scripts
							</span>
						</div>
						<div>
							<span className="text-muted-foreground/50">$</span>{" "}
							<span className="text-[#00ff88]">rustune --daemon</span>
							<span className="text-muted-foreground/40">
								{"     "}# headless, media keys still work
							</span>
						</div>
					</div>
				</div>
			</section>

			{/* ─── Download ─── */}
			<section id="download" className="py-24 px-6 diagonal-divider">
				<div className="max-w-3xl mx-auto text-center">
					<div className="font-mono-display text-[11px] text-[#00ff88] tracking-[0.3em] uppercase mb-4">
						install
					</div>
					<h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
						Get rustune
					</h2>
					<p className="text-muted-foreground text-lg mb-12">
						Download the latest release for your platform. Nothing else to
						install.
					</p>

					<div className="glass-card rounded-2xl p-8 space-y-4 glow-box">
						<div className="flex flex-col sm:flex-row gap-3">
							<Button
								size="lg"
								className="flex-1 h-12 text-sm bg-[#00ff88] text-black hover:bg-[#00dd77] font-mono-display font-bold tracking-wide"
								asChild
							>
								<a
									href="https://github.com/dzulfikar08/rustune/releases/latest/download/rustune-aarch64-macos.dmg"
									target="_blank"
									rel="noopener"
								>
									<Download className="w-4 h-4 mr-2" />
									macOS .dmg (Apple Silicon)
								</a>
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="flex-1 h-12 text-sm font-mono-display border-border/60 hover:border-[#00ff88]/30 hover:bg-[#00ff88]/[0.03]"
								asChild
							>
								<a
									href="https://github.com/dzulfikar08/rustune/releases/latest/download/rustune-x86_64-linux"
									target="_blank"
									rel="noopener"
								>
									<Download className="w-4 h-4 mr-2" />
									Linux (x86_64)
								</a>
							</Button>
						</div>
						<div className="flex flex-col sm:flex-row gap-3">
							<Button
								size="lg"
								variant="outline"
								className="flex-1 h-12 text-sm font-mono-display border-border/60 hover:border-[#00ff88]/30 hover:bg-[#00ff88]/[0.03]"
								asChild
							>
								<a
									href="https://github.com/dzulfikar08/rustune/releases/latest/download/rustune-x86_64-windows.exe"
									target="_blank"
									rel="noopener"
								>
									<Download className="w-4 h-4 mr-2" />
									Windows (x86_64)
								</a>
							</Button>
							<Button
								size="lg"
								variant="secondary"
								className="flex-1 h-12 text-sm font-mono-display"
								asChild
							>
								<a
									href="https://github.com/dzulfikar08/rustune"
									target="_blank"
									rel="noopener"
								>
									<Cpu className="w-4 h-4 mr-2" />
									Build from Source
								</a>
							</Button>
						</div>

						<p className="text-[11px] text-muted-foreground/50 font-mono-display mt-4 leading-relaxed">
							macOS binaries are signed &amp; notarized by a verified Apple Developer — no need to bypass Gatekeeper or tweak privacy settings. Also available:{" "}
							<a
								href="https://github.com/dzulfikar08/rustune/releases/latest/download/rustune-aarch64-macos"
								className="text-[#00ff88]/50 hover:text-[#00ff88] underline underline-offset-2"
							>
								bare binary (ARM)
							</a>
							{" | "}
							<a
								href="https://github.com/dzulfikar08/rustune/releases/latest/download/rustune-x86_64-macos.dmg"
								className="text-[#00ff88]/50 hover:text-[#00ff88] underline underline-offset-2"
							>
								.dmg (Intel)
							</a>
							{" | "}
							<a
								href="https://github.com/dzulfikar08/rustune/releases/latest/download/rustune-x86_64-macos"
								className="text-[#00ff88]/50 hover:text-[#00ff88] underline underline-offset-2"
							>
								bare binary (Intel)
							</a>
						</p>

						{/* Cargo install */}
						<div className="mt-6 p-3 rounded-lg bg-[#0a0a0a] border border-border/40">
							<div className="text-[11px] text-muted-foreground/60 font-mono-display mb-1.5">
								or install via cargo:
							</div>
							<code className="font-mono-display text-[13px] text-[#00ff88]">
								$ cargo install --git https://github.com/dzulfikar08/rustune
							</code>
						</div>
					</div>
				</div>
			</section>

			{/* ─── Support ─── */}
			<section className="py-24 px-6">
				<div className="max-w-3xl mx-auto text-center">
					<div className="relative inline-block mb-8">
						<Heart className="w-10 h-10 text-red-400/80" />
						<div className="absolute -inset-3 rounded-full bg-red-400/5 blur-xl" />
					</div>
					<h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
						Support the project
					</h2>
					<p className="text-muted-foreground text-lg mb-12 max-w-lg mx-auto leading-relaxed">
						rustune is free and open source. macOS binaries are signed
						&amp; notarized by a verified Apple Developer — that certification
						costs real money. If you find rustune useful, a donation helps
						cover those costs and keeps development going.
					</p>

					<div className="flex flex-col sm:flex-row gap-3 justify-center">
						<Button
							size="lg"
							variant="outline"
							className="text-sm px-8 h-12 border-[#614ad9]/30 hover:bg-[#614ad9]/[0.08] hover:border-[#614ad9]/50 text-[#9f8fef] font-mono-display"
							asChild
						>
							<a
								href="https://saweria.co/dzulfikar08"
								target="_blank"
								rel="noopener"
							>
								<Heart className="w-4 h-4 mr-2" />
								Saweria
							</a>
						</Button>
						<Button
							size="lg"
							variant="outline"
							className="text-sm px-8 h-12 border-[#635bff]/20 hover:bg-[#635bff]/[0.06] hover:border-[#635bff]/40 text-[#8b7eff] font-mono-display"
							asChild
						>
							<a
								href="https://buy.polar.sh/polar_cl_5biCTVOUrPNRQrHDDDQATVrUfCsMHD72P5pMy2cvmUX"
								target="_blank"
								rel="noopener"
							>
								<Heart className="w-4 h-4 mr-2" />
								Polar
							</a>
						</Button>
					</div>
				</div>
			</section>

			{/* ─── Footer ─── */}
			<footer className="py-8 px-6 border-t border-[#ffffff06]">
				<div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
					<div className="flex items-center gap-3 text-sm text-muted-foreground">
						<img src="/favicon.svg" alt="rustune" className="w-5 h-5" />
						<span className="font-mono-display text-xs">rustune</span>
						<span className="text-border">·</span>
						<span className="text-xs">Built with Rust</span>
					</div>
					<div className="flex items-center gap-6 text-xs text-muted-foreground font-mono-display">
						<a
							href="https://github.com/dzulfikar08/rustune"
							target="_blank"
							rel="noopener"
							className="hover:text-foreground transition-colors"
						>
							GitHub
						</a>
						<a
							href="https://github.com/dzulfikar08/rustune/issues"
							target="_blank"
							rel="noopener"
							className="hover:text-foreground transition-colors"
						>
							Issues
						</a>
						<span>
							by{" "}
							<a
								href="https://github.com/dzulfikar08"
								target="_blank"
								rel="noopener"
								className="text-[#00ff88] hover:underline"
							>
								dzulfikar08
							</a>
						</span>
					</div>
				</div>
			</footer>
		</div>
	);
}

/* ─── Feature Card Component ─── */
function FeatureCard({
	feature,
	index,
}: {
	feature: {
		icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
		title: string;
		desc: string;
		color: string;
	};
	index: number;
}) {
	const { ref, inView } = useInView(0.1);
	const Icon = feature.icon;

	return (
		<div
			ref={ref}
			className={`glass-card rounded-xl p-6 transition-all duration-700 group cursor-default ${
				inView
					? "opacity-100 translate-y-0"
					: "opacity-0 translate-y-8"
			}`}
			style={{ transitionDelay: `${index * 80}ms` }}
		>
			<div
				className="w-10 h-10 rounded-lg flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
				style={{
					background: `${feature.color}10`,
					border: `1px solid ${feature.color}20`,
				}}
			>
				<Icon
					className="w-5 h-5 transition-colors duration-300"
					style={{ color: feature.color }}
				/>
			</div>
			<h3 className="text-base font-semibold mb-2 tracking-tight font-mono-display">
				{feature.title}
			</h3>
			<p className="text-muted-foreground text-sm leading-relaxed">
				{feature.desc}
			</p>
		</div>
	);
}

export default Index;
