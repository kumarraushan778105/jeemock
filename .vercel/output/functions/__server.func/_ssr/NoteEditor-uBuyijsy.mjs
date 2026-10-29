import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { o as cn } from "./xp-CqT-O4I5.mjs";
import { C as RefreshCcw, Dt as Check, I as Mic, L as MicOff, l as Trash2 } from "../_libs/lucide-react.mjs";
import { $ as putNote, E as getAudioReflection, K as putAudioReflection, d as deleteAudioReflection, n as audioReflectionKey, y as emptyNote } from "./db-CAmn2mwk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/NoteEditor-uBuyijsy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var REASON_TAGS = [
	"Formula Mistake",
	"Concept Weak",
	"Calculation Error",
	"Reading Mistake",
	"Silly Mistake",
	"Guess",
	"Time Pressure",
	"Need Revision"
];
function formatDuration(totalSeconds) {
	if (!Number.isFinite(totalSeconds) || totalSeconds < 0) return "00:00";
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = Math.floor(totalSeconds % 60);
	return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
function AudioReflectionSection({ attemptId, questionId }) {
	const [audio, setAudio] = (0, import_react.useState)(null);
	const [audioUrl, setAudioUrl] = (0, import_react.useState)(null);
	const [isRecording, setIsRecording] = (0, import_react.useState)(false);
	const [elapsed, setElapsed] = (0, import_react.useState)(0);
	const [speed, setSpeed] = (0, import_react.useState)(1);
	const [error, setError] = (0, import_react.useState)(null);
	const [supported, setSupported] = (0, import_react.useState)(true);
	const [microphones, setMicrophones] = (0, import_react.useState)([]);
	const [microphoneId, setMicrophoneId] = (0, import_react.useState)("");
	const mediaRecorderRef = (0, import_react.useRef)(null);
	const streamRef = (0, import_react.useRef)(null);
	const audioContextRef = (0, import_react.useRef)(null);
	const audioSourceRef = (0, import_react.useRef)(null);
	const gainNodeRef = (0, import_react.useRef)(null);
	const compressorRef = (0, import_react.useRef)(null);
	const destinationRef = (0, import_react.useRef)(null);
	const chunksRef = (0, import_react.useRef)([]);
	const audioRef = (0, import_react.useRef)(null);
	const startTimeRef = (0, import_react.useRef)(null);
	const timerRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		let active = true;
		(async () => {
			const recording = await getAudioReflection(attemptId, questionId);
			if (!active || !recording) {
				setAudio(null);
				setAudioUrl((prev) => {
					if (prev) URL.revokeObjectURL(prev);
					return null;
				});
				return;
			}
			const url = URL.createObjectURL(recording.blob);
			setAudio(recording);
			setAudioUrl((prev) => {
				if (prev) URL.revokeObjectURL(prev);
				return url;
			});
		})();
		return () => {
			active = false;
			if (audioUrl) URL.revokeObjectURL(audioUrl);
			if (timerRef.current) window.clearInterval(timerRef.current);
			if (streamRef.current) streamRef.current.getTracks().forEach((track) => track.stop());
			if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") mediaRecorderRef.current.stop();
			cleanupAudioProcessing();
		};
	}, [attemptId, questionId]);
	(0, import_react.useEffect)(() => {
		if (!("MediaRecorder" in window) || !navigator.mediaDevices?.getUserMedia) {
			setSupported(false);
			return;
		}
		const loadMicrophones = async () => {
			try {
				setMicrophones((await navigator.mediaDevices.enumerateDevices()).filter((device) => device.kind === "audioinput"));
			} catch {
				setMicrophones([]);
			}
		};
		loadMicrophones();
		navigator.mediaDevices.addEventListener?.("devicechange", loadMicrophones);
		return () => navigator.mediaDevices.removeEventListener?.("devicechange", loadMicrophones);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!audioRef.current) return;
		audioRef.current.playbackRate = speed;
	}, [audioUrl, speed]);
	const clearTimer = () => {
		if (timerRef.current) {
			window.clearInterval(timerRef.current);
			timerRef.current = null;
		}
	};
	const stopStream = () => {
		if (streamRef.current) {
			streamRef.current.getTracks().forEach((track) => track.stop());
			streamRef.current = null;
		}
	};
	const cleanupAudioProcessing = () => {
		audioSourceRef.current?.disconnect();
		gainNodeRef.current?.disconnect();
		compressorRef.current?.disconnect();
		destinationRef.current?.stream.getTracks().forEach((track) => track.stop());
		audioSourceRef.current = null;
		gainNodeRef.current = null;
		compressorRef.current = null;
		destinationRef.current = null;
		const context = audioContextRef.current;
		audioContextRef.current = null;
		if (context && context.state !== "closed") context.close();
	};
	const stopRecording = () => {
		if (!mediaRecorderRef.current) return;
		clearTimer();
		setIsRecording(false);
		if (mediaRecorderRef.current.state !== "inactive") mediaRecorderRef.current.stop();
		stopStream();
	};
	const startRecording = async () => {
		if (!supported) {
			setError("This browser does not support audio recording.");
			return;
		}
		try {
			const constraints = {
				echoCancellation: { ideal: true },
				noiseSuppression: { ideal: true },
				autoGainControl: { ideal: true },
				channelCount: { ideal: 1 },
				sampleRate: { ideal: 48e3 },
				...microphoneId ? { deviceId: { exact: microphoneId } } : {}
			};
			let stream;
			try {
				stream = await navigator.mediaDevices.getUserMedia({ audio: constraints });
			} catch (constraintError) {
				if (constraintError instanceof DOMException && constraintError.name === "NotAllowedError") throw constraintError;
				stream = await navigator.mediaDevices.getUserMedia({ audio: microphoneId ? { deviceId: { exact: microphoneId } } : true });
			}
			streamRef.current = stream;
			try {
				setMicrophones((await navigator.mediaDevices.enumerateDevices()).filter((device) => device.kind === "audioinput"));
			} catch {}
			let recordingStream = stream;
			const AudioContextConstructor = window.AudioContext ?? window.webkitAudioContext;
			if (AudioContextConstructor) {
				const context = new AudioContextConstructor();
				const source = context.createMediaStreamSource(stream);
				const gain = context.createGain();
				const compressor = context.createDynamicsCompressor();
				const destination = context.createMediaStreamDestination();
				gain.gain.value = 1.35;
				compressor.threshold.value = -24;
				compressor.knee.value = 24;
				compressor.ratio.value = 4;
				compressor.attack.value = .003;
				compressor.release.value = .25;
				source.connect(gain).connect(compressor).connect(destination);
				audioContextRef.current = context;
				audioSourceRef.current = source;
				gainNodeRef.current = gain;
				compressorRef.current = compressor;
				destinationRef.current = destination;
				recordingStream = destination.stream;
				if (context.state === "suspended") await context.resume();
			}
			const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus") ? "audio/webm;codecs=opus" : "audio/webm";
			const recorder = new MediaRecorder(recordingStream, MediaRecorder.isTypeSupported(mimeType) ? { mimeType } : void 0);
			chunksRef.current = [];
			startTimeRef.current = Date.now();
			recorder.ondataavailable = (event) => {
				if (event.data.size > 0) chunksRef.current.push(event.data);
			};
			recorder.onerror = () => {
				setError("The microphone could not be accessed. Please try again.");
				stopStream();
				cleanupAudioProcessing();
				setIsRecording(false);
			};
			recorder.onstop = async () => {
				clearTimer();
				stopStream();
				cleanupAudioProcessing();
				const blob = new Blob(chunksRef.current, { type: mimeType });
				if (blob.size === 0) {
					setError("No audio was captured. Please try again.");
					return;
				}
				const finalDuration = elapsed > 0 ? elapsed : 0;
				const nextAudio = {
					id: audioReflectionKey(attemptId, questionId),
					attemptId,
					questionId,
					blob,
					mimeType: blob.type || "audio/webm",
					duration: finalDuration,
					createdAt: Date.now(),
					updatedAt: Date.now()
				};
				await putAudioReflection(nextAudio);
				setAudio(nextAudio);
				setAudioUrl((prev) => {
					if (prev) URL.revokeObjectURL(prev);
					return URL.createObjectURL(blob);
				});
				setError(null);
			};
			mediaRecorderRef.current = recorder;
			recorder.start();
			setElapsed(0);
			setIsRecording(true);
			timerRef.current = window.setInterval(() => {
				if (!startTimeRef.current) return;
				setElapsed((Date.now() - startTimeRef.current) / 1e3);
			}, 250);
		} catch (error) {
			setError(error instanceof DOMException && error.name === "NotAllowedError" ? "Microphone permission was denied. Please allow access and try again." : "Your browser could not access the microphone.");
			setIsRecording(false);
			stopStream();
			cleanupAudioProcessing();
		}
	};
	const handleDelete = async () => {
		if (isRecording) stopRecording();
		await deleteAudioReflection(audioReflectionKey(attemptId, questionId));
		setAudio(null);
		setAudioUrl((prev) => {
			if (prev) URL.revokeObjectURL(prev);
			return null;
		});
		setError(null);
	};
	const durationLabel = audio ? formatDuration(audio.duration) : formatDuration(elapsed);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3 rounded-xl border border-dashed bg-card/80 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground",
					children: "🎙️ MY AUDIO REFLECTION"
				}), isRecording && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-2 rounded-full border border-red-500/50 bg-red-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-red-300",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-red-500 animate-pulse" }), " LIVE"]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-destructive",
				children: error
			}),
			!supported && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "Voice recording is not supported in this browser."
			}),
			!audio && !isRecording && supported && microphones.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value: microphoneId,
				onChange: (event) => setMicrophoneId(event.target.value),
				className: "rounded-lg border bg-background px-3 py-2 text-sm",
				"aria-label": "Microphone",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: "Default microphone"
				}), microphones.map((microphone, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: microphone.deviceId,
					children: microphone.label || `Microphone ${index + 1}`
				}, microphone.deviceId))]
			}),
			!audio && !isRecording && supported && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: startRecording,
				className: "inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-4" }), " Start Recording"]
			}),
			isRecording && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: stopRecording,
					className: "inline-flex items-center gap-2 rounded-lg border border-destructive bg-destructive px-3 py-2 text-sm font-medium text-destructive-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicOff, { className: "size-4" }), " Stop Recording"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-md border bg-card px-2 py-1 text-xs font-semibold tabular-nums",
					children: formatDuration(elapsed)
				})]
			}),
			audio && !isRecording && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: startRecording,
							className: "inline-flex items-center gap-2 rounded-lg border bg-card px-3 py-2 text-sm font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCcw, { className: "size-4" }), " Re-record / Replace"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: handleDelete,
							className: "inline-flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), " Delete recording"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
						ref: audioRef,
						controls: true,
						src: audioUrl ?? void 0,
						className: "w-full",
						onLoadedMetadata: () => {
							if (!audioRef.current) return;
							audioRef.current.playbackRate = speed;
						}
					}, audioUrl ?? audio.id),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground",
							children: ["Duration · ", durationLabel]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap items-center gap-1.5",
							children: [
								.5,
								1,
								1.5,
								2
							].map((rate) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									setSpeed(rate);
									if (audioRef.current) audioRef.current.playbackRate = rate;
								},
								className: cn("rounded-md border px-2 py-1 text-[11px] font-semibold", speed === rate ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground"),
								"aria-pressed": speed === rate,
								children: [
									rate,
									"×",
									" ",
									rate === .5 ? "Slow" : rate === 1 ? "Normal" : rate === 1.5 ? "Fast" : "Very Fast"
								]
							}, rate))
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] leading-relaxed text-muted-foreground",
				children: "Record in your own words: Why did I get this wrong? What did I learn? What will I remember next time?"
			})
		]
	});
}
function NoteEditor({ attemptId, questionId, initial, mode }) {
	const [note, setNote] = (0, import_react.useState)(initial ?? emptyNote(attemptId, questionId));
	const [saved, setSaved] = (0, import_react.useState)(false);
	const first = (0, import_react.useRef)(true);
	(0, import_react.useEffect)(() => {
		if (first.current) {
			first.current = false;
			return;
		}
		const t = setTimeout(() => {
			putNote(note).then(() => {
				setSaved(true);
				setTimeout(() => setSaved(false), 1200);
			});
		}, 600);
		return () => clearTimeout(t);
	}, [note]);
	const patch = (p) => setNote((n) => ({
		...n,
		...p
	}));
	const clear = () => setNote((n) => ({
		...n,
		tags: [],
		reason: "",
		learning: "",
		note: "",
		revision: false
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 space-y-3 rounded-xl border border-dashed bg-surface p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-bold uppercase tracking-wide text-muted-foreground",
					children: mode === "wrong" ? "Why did I get this wrong?" : "Personal notes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-2",
					children: [saved && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 text-[11px] text-success",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" }), " Saved"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: clear,
						className: "flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] text-destructive",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3" }), " Delete"]
					})]
				})]
			}),
			mode === "wrong" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1.5",
					children: REASON_TAGS.map((t) => {
						const on = note.tags.includes(t);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => patch({ tags: on ? note.tags.filter((x) => x !== t) : [...note.tags, t] }),
							className: cn("rounded-full border px-2.5 py-1 text-[11px] font-medium", on ? "border-primary bg-primary text-primary-foreground" : "bg-card"),
							children: t
						}, t);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: note.reason,
					onChange: (e) => patch({ reason: e.target.value }),
					rows: 3,
					placeholder: "In your own words — e.g. I forgot the sign convention.",
					className: "w-full rounded-lg border bg-card p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs font-bold uppercase tracking-wide text-muted-foreground",
					children: "What did I learn?"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: note.learning,
					onChange: (e) => patch({ learning: e.target.value }),
					rows: 3,
					placeholder: "Formula to remember, trick, shortcut, concept, mistake to avoid…",
					className: "w-full rounded-lg border bg-card p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				value: note.note,
				onChange: (e) => patch({ note: e.target.value }),
				rows: 3,
				placeholder: "Your notes on this question…",
				className: "w-full rounded-lg border bg-card p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-center gap-2 text-xs font-semibold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: note.revision,
					onChange: (e) => patch({ revision: e.target.checked }),
					className: "size-4 accent-[var(--primary)]"
				}), "Mark for revision"]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AudioReflectionSection, {
				attemptId,
				questionId
			})
		]
	});
}
//#endregion
export { NoteEditor as t };
