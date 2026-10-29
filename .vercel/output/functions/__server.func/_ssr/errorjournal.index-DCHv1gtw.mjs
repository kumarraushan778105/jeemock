import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { S as spendXpForErrorJournal, l as getRequireXpForErrorJournal, o as cn, u as getXpState } from "./xp-CqT-O4I5.mjs";
import { $ as Folder, C as RefreshCcw, D as Pen, Dt as Check, Et as ChevronDown, I as Mic, J as ImagePlus, L as MicOff, Pt as BookMarked, Z as Headphones, ct as Eye, it as FileText, l as Trash2, r as X, w as Plus, wt as ChevronRight } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-DCGY2Jx8.mjs";
import { I as listErrorJournalEntries, J as putErrorJournalEntry, O as getErrorJournalAudio, Y as putErrorJournalImage, f as deleteErrorJournalAudio, k as getErrorJournalImage, p as deleteErrorJournalEntry, q as putErrorJournalAudio } from "./db-CAmn2mwk.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/errorjournal.index-DCHv1gtw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Utility functions for handling chapter organization and normalization
*/
/**
* Normalize chapter name for consistent grouping
* - Trim whitespace
* - Preserve original casing for display
* Returns normalized version for comparison
*/
function normalizeChapter(chapter) {
	return chapter.trim().toLowerCase();
}
function groupEntriesByChapter(entries) {
	const subjectMap = /* @__PURE__ */ new Map();
	for (const entry of entries) {
		const subject = entry.subject || "General";
		const chapter = entry.chapter || "General";
		const normalizedChapter = normalizeChapter(chapter);
		if (!subjectMap.has(subject)) subjectMap.set(subject, /* @__PURE__ */ new Map());
		const chaptersMap = subjectMap.get(subject);
		if (!chaptersMap.has(normalizedChapter)) chaptersMap.set(normalizedChapter, {
			subject,
			normalizedChapter,
			displayChapter: chapter,
			entries: []
		});
		chaptersMap.get(normalizedChapter).entries.push(entry);
	}
	const result = [];
	for (const [subject, chaptersMap] of subjectMap) {
		const chapters = Array.from(chaptersMap.values()).sort((a, b) => a.displayChapter.localeCompare(b.displayChapter));
		result.push({
			subject,
			chapters
		});
	}
	result.sort((a, b) => a.subject.localeCompare(b.subject));
	return result;
}
var ERROR_TYPES$1 = [
	"Wrong Answer",
	"Couldn't Solve",
	"Concept",
	"Formula",
	"Calculation",
	"Misread",
	"Time Pressure",
	"Wrong Approach",
	"Guess"
];
var SUBJECTS$1 = [
	"All",
	"Physics",
	"Chemistry",
	"Mathematics"
];
var DIFFICULTIES$1 = [
	"All",
	"Easy",
	"Medium",
	"Hard"
];
var STATUSES$1 = [
	"All",
	"Need Review",
	"Learning",
	"Mastered"
];
function ErrorJournalList({ entries, onNew, onView, onEdit, onDelete }) {
	const [search, setSearch] = (0, import_react.useState)("");
	const [selectedSubject, setSelectedSubject] = (0, import_react.useState)("All");
	const [selectedDifficulty, setSelectedDifficulty] = (0, import_react.useState)("All");
	const [selectedStatus, setSelectedStatus] = (0, import_react.useState)("All");
	const [selectedErrorType, setSelectedErrorType] = (0, import_react.useState)("All");
	const [sortBy, setSortBy] = (0, import_react.useState)("newest");
	const [expandedChapters, setExpandedChapters] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const filtered = (0, import_react.useMemo)(() => {
		let result = entries.filter((e) => {
			const q = search.toLowerCase();
			const matchesSearch = e.questionText.toLowerCase().includes(q) || e.chapter.toLowerCase().includes(q) || e.topic.toLowerCase().includes(q) || e.mistakeMade.toLowerCase().includes(q) || e.whatLearned.toLowerCase().includes(q);
			const matchesSubject = selectedSubject === "All" || e.subject === selectedSubject;
			const matchesDifficulty = selectedDifficulty === "All" || e.difficulty === selectedDifficulty;
			const matchesStatus = selectedStatus === "All" || e.status === selectedStatus;
			const matchesErrorType = selectedErrorType === "All" || e.errorType === selectedErrorType;
			return matchesSearch && matchesSubject && matchesDifficulty && matchesStatus && matchesErrorType;
		});
		result.sort((a, b) => sortBy === "newest" ? b.createdAt - a.createdAt : a.createdAt - b.createdAt);
		return result;
	}, [
		entries,
		search,
		selectedSubject,
		selectedDifficulty,
		selectedStatus,
		selectedErrorType,
		sortBy
	]);
	const groupedEntries = (0, import_react.useMemo)(() => {
		return groupEntriesByChapter(filtered);
	}, [filtered]);
	const hasFilters = search || selectedSubject !== "All" || selectedDifficulty !== "All" || selectedStatus !== "All" || selectedErrorType !== "All";
	const toggleChapter = (key) => {
		const newSet = new Set(expandedChapters);
		if (newSet.has(key)) newSet.delete(key);
		else newSet.add(key);
		setExpandedChapters(newSet);
	};
	const getChapterKey = (subject, normalizedChapter) => {
		return `${subject}::${normalizedChapter}`;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-bold",
					children: "📓 Error Journal"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: onNew,
					className: "inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " New Entry"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "text",
				value: search,
				onChange: (e) => setSearch(e.target.value),
				placeholder: "Search by question, chapter, topic, notes...",
				className: "w-full rounded-lg border bg-card px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2 rounded-lg border bg-card/50 p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2 text-xs font-semibold uppercase",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "Filters:"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: selectedSubject,
							onChange: (e) => setSelectedSubject(e.target.value),
							className: "rounded-md border bg-card px-2 py-1 text-xs",
							children: SUBJECTS$1.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: s,
								children: s
							}, s))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: selectedDifficulty,
							onChange: (e) => setSelectedDifficulty(e.target.value),
							className: "rounded-md border bg-card px-2 py-1 text-xs",
							children: DIFFICULTIES$1.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: d,
								children: d
							}, d))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: selectedStatus,
							onChange: (e) => setSelectedStatus(e.target.value),
							className: "rounded-md border bg-card px-2 py-1 text-xs",
							children: STATUSES$1.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: s,
								children: s
							}, s))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: selectedErrorType,
							onChange: (e) => setSelectedErrorType(e.target.value),
							className: "rounded-md border bg-card px-2 py-1 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "All",
								children: "All Error Types"
							}), ERROR_TYPES$1.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: t,
								children: t
							}, t))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: sortBy,
							onChange: (e) => setSortBy(e.target.value),
							className: "rounded-md border bg-card px-2 py-1 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "newest",
								children: "Newest First"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "oldest",
								children: "Oldest First"
							})]
						}),
						hasFilters && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setSearch("");
								setSelectedSubject("All");
								setSelectedDifficulty("All");
								setSelectedStatus("All");
								setSelectedErrorType("All");
							},
							className: "rounded-md border border-destructive px-2 py-1 text-xs font-semibold text-destructive hover:bg-destructive/10",
							children: "Clear Filters"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-xs text-muted-foreground",
				children: [
					"Showing ",
					filtered.length,
					" of ",
					entries.length,
					" entry",
					entries.length !== 1 ? "ies" : "",
					hasFilters && " (filtered)"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground",
					children: entries.length === 0 ? "No entries yet — create your first Error Journal entry!" : "No entries match your filters."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-1 rounded-lg border bg-card p-2",
					children: groupedEntries.map((subjectGroup) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "px-2 py-1 text-sm font-semibold text-primary",
							children: ["📚 ", subjectGroup.subject]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "ml-2 space-y-1 border-l border-border/50",
							children: subjectGroup.chapters.map((chapterGroup) => {
								const chapterKey = getChapterKey(subjectGroup.subject, chapterGroup.normalizedChapter);
								const isExpanded = expandedChapters.has(chapterKey);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => toggleChapter(chapterKey),
										className: "flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm font-medium text-foreground hover:bg-accent",
										children: [
											isExpanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4 flex-shrink-0" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 flex-shrink-0" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Folder, { className: "size-4 flex-shrink-0 text-yellow-500" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "flex-1 text-left",
												children: chapterGroup.displayChapter
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground",
												children: chapterGroup.entries.length
											})
										]
									}), isExpanded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "ml-2 space-y-1 border-l border-border/30 py-1",
										children: chapterGroup.entries.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "group flex items-start gap-2 rounded px-2 py-2 hover:bg-accent/50",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "mt-1 size-3 flex-shrink-0 text-muted-foreground" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "min-w-0 flex-1",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
															className: "text-sm font-medium line-clamp-1",
															children: entry.questionText || "Untitled"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "mt-0.5 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground",
															children: [
																entry.topic && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: entry.topic }),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: cn("rounded px-1.5 py-0.5 text-[10px] font-semibold", entry.difficulty === "Easy" ? "bg-green-500/10 text-green-600" : entry.difficulty === "Medium" ? "bg-yellow-500/10 text-yellow-600" : "bg-red-500/10 text-red-600"),
																	children: entry.difficulty
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																	className: cn("rounded px-1.5 py-0.5 text-[10px] font-semibold", entry.status === "Need Review" ? "bg-red-500/10 text-red-600" : entry.status === "Learning" ? "bg-yellow-500/10 text-yellow-600" : "bg-green-500/10 text-green-600"),
																	children: [
																		entry.status === "Need Review" && "🔴",
																		entry.status === "Learning" && "🟡",
																		entry.status === "Mastered" && "🟢"
																	]
																}),
																entry.hasAudio && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🎙️" }),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-[10px]",
																	children: new Date(entry.createdAt).toLocaleDateString()
																})
															]
														}),
														entry.mistakeMade && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "mt-1 text-xs line-clamp-1 text-foreground/70",
															children: entry.mistakeMade
														})
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "ml-2 flex flex-shrink-0 gap-1 opacity-0 transition-opacity group-hover:opacity-100",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															onClick: () => onView(entry),
															className: "rounded p-1 hover:bg-primary/20",
															title: "View",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-3 text-primary" })
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															onClick: () => onEdit(entry),
															className: "rounded p-1 hover:bg-blue-500/20",
															title: "Edit",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "size-3 text-blue-500" })
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															onClick: () => {
																if (confirm("Delete this entry?")) onDelete(entry.id);
															},
															className: "rounded p-1 hover:bg-destructive/20",
															title: "Delete",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3 text-destructive" })
														})
													]
												})
											]
										}, entry.id))
									})]
								}, chapterKey);
							})
						})]
					}, subjectGroup.subject))
				})
			})
		]
	});
}
var ERROR_TYPES = [
	"Wrong Answer",
	"Couldn't Solve",
	"Concept",
	"Formula",
	"Calculation",
	"Misread",
	"Time Pressure",
	"Wrong Approach",
	"Guess"
];
var SUBJECTS = [
	"Physics",
	"Chemistry",
	"Mathematics"
];
var DIFFICULTIES = [
	"Easy",
	"Medium",
	"Hard"
];
var STATUSES = [
	"Need Review",
	"Learning",
	"Mastered"
];
function AudioRecorder({ entryId, onAudioChange }) {
	const [mode, setMode] = (0, import_react.useState)("microphone");
	const [isRecording, setIsRecording] = (0, import_react.useState)(false);
	const [hasAudio, setHasAudio] = (0, import_react.useState)(false);
	const [audioUrl, setAudioUrl] = (0, import_react.useState)(null);
	const [elapsed, setElapsed] = (0, import_react.useState)(0);
	const [speed, setSpeed] = (0, import_react.useState)(1);
	const [error, setError] = (0, import_react.useState)(null);
	const [supported, setSupported] = (0, import_react.useState)(true);
	const mediaRecorderRef = (0, import_react.useRef)(null);
	const streamRef = (0, import_react.useRef)(null);
	const chunksRef = (0, import_react.useRef)([]);
	const audioRef = (0, import_react.useRef)(null);
	const timerRef = (0, import_react.useRef)(null);
	const urlRef = (0, import_react.useRef)(null);
	const stoppingRef = (0, import_react.useRef)(false);
	const startingRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		let active = true;
		const loadAudio = async () => {
			try {
				const blob = await getErrorJournalAudio(entryId);
				if (active && blob) {
					const url = URL.createObjectURL(blob);
					urlRef.current = url;
					setAudioUrl(url);
					setHasAudio(true);
				}
			} catch (err) {
				console.error("Failed to load audio:", err);
			}
		};
		loadAudio();
		return () => {
			active = false;
			if (urlRef.current) URL.revokeObjectURL(urlRef.current);
			if (timerRef.current) window.clearInterval(timerRef.current);
			if (streamRef.current) streamRef.current.getTracks().forEach((track) => track.stop());
			if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
				stoppingRef.current = true;
				mediaRecorderRef.current.stop();
			}
		};
	}, [entryId]);
	(0, import_react.useEffect)(() => {
		if (!("MediaRecorder" in window) || !navigator.mediaDevices?.getUserMedia) setSupported(false);
	}, []);
	const startRecording = async () => {
		if (isRecording || startingRef.current) return;
		startingRef.current = true;
		let captureStream = null;
		try {
			setError(null);
			if (!window.MediaRecorder) throw new Error("This browser does not support audio recording.");
			if (mode === "class") {
				if (!navigator.mediaDevices?.getDisplayMedia) throw new Error("Class Audio requires Chrome screen or window sharing, which is unavailable in this browser.");
				captureStream = await navigator.mediaDevices.getDisplayMedia({
					video: true,
					audio: true
				});
				if (captureStream.getAudioTracks().length === 0) {
					captureStream.getTracks().forEach((track) => track.stop());
					throw new Error("Chrome did not provide audio for the selected window or screen. Enable audio sharing and try again.");
				}
			} else captureStream = await navigator.mediaDevices.getUserMedia({ audio: true });
			streamRef.current = captureStream;
			const recordingStream = mode === "class" ? new MediaStream(captureStream.getAudioTracks()) : captureStream;
			const mimeType = [
				"audio/webm;codecs=opus",
				"audio/webm",
				"audio/ogg;codecs=opus"
			].find((type) => MediaRecorder.isTypeSupported(type));
			if (!mimeType) throw new Error("This browser does not support a compatible audio recording format.");
			const recorder = new MediaRecorder(recordingStream, { mimeType });
			mediaRecorderRef.current = recorder;
			stoppingRef.current = false;
			chunksRef.current = [];
			recorder.ondataavailable = (e) => {
				if (e.data.size > 0) chunksRef.current.push(e.data);
			};
			recorder.onstop = async () => {
				mediaRecorderRef.current = null;
				const chunks = chunksRef.current;
				chunksRef.current = [];
				if (chunks.length === 0) {
					setError("No audio was captured. Confirm that audio sharing is enabled for the selected window or screen.");
					return;
				}
				const blob = new Blob(chunks, { type: recorder.mimeType || "audio/webm" });
				try {
					await putErrorJournalAudio(entryId, blob, blob.type);
					const url = URL.createObjectURL(blob);
					if (urlRef.current) URL.revokeObjectURL(urlRef.current);
					urlRef.current = url;
					setAudioUrl(url);
					setHasAudio(true);
					onAudioChange(true);
					setElapsed(0);
				} catch (err) {
					setError(err.message || "Failed to save audio");
				}
			};
			const handleCaptureEnded = () => {
				if (!stoppingRef.current && mediaRecorderRef.current === recorder && recorder.state !== "inactive") {
					stoppingRef.current = true;
					setError("Audio sharing ended before recording was stopped.");
					recorder.stop();
					captureStream?.getTracks().forEach((track) => track.stop());
					streamRef.current = null;
					if (timerRef.current) {
						window.clearInterval(timerRef.current);
						timerRef.current = null;
					}
					setIsRecording(false);
				}
			};
			captureStream.getTracks().forEach((track) => {
				track.addEventListener("ended", handleCaptureEnded, { once: true });
			});
			recorder.start();
			setIsRecording(true);
			setElapsed(0);
			timerRef.current = window.setInterval(() => {
				setElapsed((e) => e + 1);
			}, 1e3);
			startingRef.current = false;
			recorder.onerror = () => {
				stoppingRef.current = true;
				setError("The audio recorder failed while recording. Please try again.");
				captureStream?.getTracks().forEach((track) => track.stop());
				streamRef.current = null;
				setIsRecording(false);
			};
		} catch (e) {
			captureStream?.getTracks().forEach((track) => track.stop());
			streamRef.current = null;
			const error = e;
			setError(error.name === "NotAllowedError" ? mode === "class" ? "Class Audio sharing was cancelled or denied. Select the Edge lecture window and allow audio sharing." : "Microphone access was cancelled or denied." : error.message || "Failed to start audio recording.");
			startingRef.current = false;
		}
	};
	const stopRecording = () => {
		if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
			stoppingRef.current = true;
			mediaRecorderRef.current.stop();
		}
		const stream = streamRef.current;
		if (stream) {
			stream.getTracks().forEach((track) => track.stop());
			streamRef.current = null;
		}
		if (timerRef.current) {
			window.clearInterval(timerRef.current);
			timerRef.current = null;
		}
		setIsRecording(false);
	};
	const handleDelete = async () => {
		try {
			if (isRecording) stopRecording();
			await deleteErrorJournalAudio(entryId);
			setHasAudio(false);
			onAudioChange(false);
			if (urlRef.current) {
				URL.revokeObjectURL(urlRef.current);
				urlRef.current = null;
			}
			setAudioUrl(null);
			setError(null);
		} catch (err) {
			setError(err.message || "Failed to delete audio");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2 rounded-lg border border-dashed bg-card/50 p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-bold uppercase tracking-wide text-muted-foreground",
					children: mode === "microphone" ? "🎙️ Microphone" : "🎧 Class Audio"
				}), isRecording && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1 rounded-full border border-red-500/50 bg-red-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-red-600",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-red-500 animate-pulse" }), " Recording"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-1",
				role: "group",
				"aria-label": "Audio recording mode",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => !isRecording && setMode("microphone"),
					disabled: isRecording,
					className: cn("inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[10px] font-semibold", mode === "microphone" ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-3" }), " Microphone"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => !isRecording && setMode("class"),
					disabled: isRecording,
					className: cn("inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[10px] font-semibold", mode === "class" ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Headphones, { className: "size-3" }), " Class Audio"]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-destructive",
				children: error
			}),
			!supported && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "Audio recording is not supported in this browser."
			}),
			mode === "class" && !isRecording && supported && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10px] leading-relaxed text-muted-foreground",
				children: "Chrome will open its sharing picker. Select the Edge lecture window or screen and enable audio sharing."
			}),
			!hasAudio && !isRecording && supported && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: startRecording,
				className: "inline-flex items-center gap-1 rounded-lg bg-primary px-2 py-1 text-xs font-medium text-primary-foreground hover:opacity-90",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-3" }), " Start"]
			}),
			isRecording && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: stopRecording,
				className: "inline-flex items-center gap-1 rounded-lg bg-red-600 px-2 py-1 text-xs font-medium text-white hover:opacity-90",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicOff, { className: "size-3" }), " Stop"]
			}),
			hasAudio && audioUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
						ref: audioRef,
						src: audioUrl,
						controls: true,
						className: "w-full rounded-lg bg-card text-xs"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-1",
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
							className: cn("rounded-md border px-1.5 py-0.5 text-[10px] font-semibold", speed === rate ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground"),
							children: [rate, "×"]
						}, rate))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: handleDelete,
						className: "flex items-center gap-1 rounded-md border border-destructive px-1.5 py-0.5 text-[10px] font-semibold text-destructive",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-2.5" }), " Delete"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: handleDelete,
						className: "flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[10px] font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCcw, { className: "size-2.5" }), " Replace"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10px] leading-relaxed text-muted-foreground",
				children: "Record your reflection: Why did I make this mistake? What did I learn?"
			})
		]
	});
}
function ImageUploadSection({ entryId, onImageSelect }) {
	const [imageUrl, setImageUrl] = (0, import_react.useState)(null);
	const [imageLoading, setImageLoading] = (0, import_react.useState)(true);
	const fileInputRef = (0, import_react.useRef)(null);
	const urlRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		let active = true;
		const loadImage = async () => {
			try {
				const blob = await getErrorJournalImage(entryId);
				if (active && blob) {
					const url = URL.createObjectURL(blob);
					urlRef.current = url;
					setImageUrl(url);
				}
			} finally {
				if (active) setImageLoading(false);
			}
		};
		loadImage();
		return () => {
			active = false;
			if (urlRef.current) URL.revokeObjectURL(urlRef.current);
		};
	}, [entryId]);
	const handleFileUpload = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = (event) => {
			const blob = new Blob([event.target?.result], { type: file.type });
			const url = URL.createObjectURL(blob);
			if (urlRef.current) URL.revokeObjectURL(urlRef.current);
			urlRef.current = url;
			setImageUrl(url);
			onImageSelect(blob);
		};
		reader.readAsArrayBuffer(file);
	};
	const handlePaste = (e) => {
		const items = e.clipboardData?.items || [];
		for (let i = 0; i < items.length; i++) if (items[i].type.includes("image")) {
			const blob = items[i].getAsFile();
			if (blob) {
				const url = URL.createObjectURL(blob);
				if (urlRef.current) URL.revokeObjectURL(urlRef.current);
				urlRef.current = url;
				setImageUrl(url);
				onImageSelect(blob);
			}
		}
	};
	const handleRemove = () => {
		if (urlRef.current) {
			URL.revokeObjectURL(urlRef.current);
			urlRef.current = null;
		}
		setImageUrl(null);
	};
	(0, import_react.useEffect)(() => {
		window.addEventListener("paste", handlePaste);
		return () => {
			window.removeEventListener("paste", handlePaste);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-bold uppercase tracking-wide text-muted-foreground",
					children: "📷 Question Image"
				}), imageUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: handleRemove,
					className: "flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[10px] text-destructive",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-2.5" }), " Remove"]
				})]
			}),
			imageUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: imageUrl,
				alt: "Question",
				className: "max-h-48 max-w-full rounded-lg border object-contain"
			}),
			!imageUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-dashed border-muted-foreground/30 p-2 text-center",
				onDragOver: (e) => e.preventDefault(),
				onDrop: (e) => {
					e.preventDefault();
					const file = e.dataTransfer.files[0];
					if (file?.type.includes("image")) {
						const reader = new FileReader();
						reader.onload = (event) => {
							const blob = new Blob([event.target?.result], { type: file.type });
							const url = URL.createObjectURL(blob);
							if (urlRef.current) URL.revokeObjectURL(urlRef.current);
							urlRef.current = url;
							setImageUrl(url);
							onImageSelect(blob);
						};
						reader.readAsArrayBuffer(file);
					}
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => fileInputRef.current?.click(),
						className: "inline-flex items-center gap-1 rounded-lg bg-card px-2 py-1 text-xs font-medium hover:bg-accent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-3" }), " Upload"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: fileInputRef,
						type: "file",
						accept: "image/*",
						onChange: handleFileUpload,
						className: "hidden"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-[10px] text-muted-foreground",
						children: "Upload, paste, or drag & drop"
					})
				]
			})
		]
	});
}
function ErrorJournalEditor({ entry, onSave, onCancel }) {
	const [entryId] = (0, import_react.useState)(() => entry?.id || `ej_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`);
	const [data, setData] = (0, import_react.useState)(entry || {
		questionText: "",
		subject: "Physics",
		chapter: "",
		topic: "",
		difficulty: "Medium",
		source: "",
		questionNumber: "",
		errorType: "Wrong Answer",
		mistakeMade: "",
		whatLearned: "",
		rememberNext: "",
		additionalNotes: "",
		status: "Need Review",
		hasAudio: false,
		tryAgainCount: 0
	});
	const [saved, setSaved] = (0, import_react.useState)(false);
	const [isSaving, setIsSaving] = (0, import_react.useState)(false);
	const [imageBlob, setImageBlob] = (0, import_react.useState)();
	const [saveError, setSaveError] = (0, import_react.useState)(null);
	const handleSave = async () => {
		if (isSaving) return;
		try {
			setIsSaving(true);
			setSaveError(null);
			const requireXp = typeof getRequireXpForErrorJournal === "function" ? getRequireXpForErrorJournal() : true;
			const xp = getXpState();
			if (requireXp) {
				if (xp.balance < 20) {
					setSaveError("Not enough XP. You need 20 XP to add this error.");
					setIsSaving(false);
					return;
				}
				if (!window.confirm(`Add Error to Error Journal?\n\nCost: ⚡ 20 XP\nCurrent XP: ${xp.balance} XP`)) {
					setIsSaving(false);
					return;
				}
			}
			if (imageBlob) await putErrorJournalImage(entryId, imageBlob, imageBlob.type || "image/png");
			const chapterInput = data.chapter?.trim() || "";
			const topicInput = data.topic?.trim() || "";
			const fullEntry = {
				id: entryId,
				questionText: data.questionText || "",
				subject: data.subject || "Physics",
				chapter: chapterInput,
				topic: topicInput,
				difficulty: data.difficulty || "Medium",
				source: data.source || "",
				questionNumber: data.questionNumber || "",
				errorType: data.errorType || "Wrong Answer",
				imageId: imageBlob ? entryId : entry?.imageId,
				mistakeMade: data.mistakeMade || "",
				whatLearned: data.whatLearned || "",
				rememberNext: data.rememberNext || "",
				additionalNotes: data.additionalNotes || "",
				status: data.status || "Need Review",
				hasAudio: data.hasAudio || false,
				tryAgainCount: data.tryAgainCount || 0,
				lastTryAgainStatus: data.lastTryAgainStatus,
				createdAt: entry?.createdAt || Date.now(),
				updatedAt: Date.now()
			};
			await putErrorJournalEntry(fullEntry);
			if (requireXp) {
				if (!spendXpForErrorJournal(fullEntry.id, 20).ok) {
					setSaveError("Could not complete XP spend. The Error Journal entry was not saved.");
					setIsSaving(false);
					return;
				}
			}
			setSaved(true);
			setTimeout(() => {
				onSave(fullEntry);
			}, 1e3);
		} catch (error) {
			setSaveError(error.message || "Failed to save entry");
			setIsSaving(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-h-[85vh] w-full max-w-[600px] overflow-y-auto rounded-2xl bg-card p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-bold",
						children: entry ? "Edit Entry" : "New Entry"
					}), saved && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 text-xs text-success",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" }), " Saved"]
					})]
				}),
				saveError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive",
					children: ["Error: ", saveError]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs font-semibold uppercase",
							children: "Question / Issue"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: data.questionText || "",
							onChange: (e) => setData((d) => ({
								...d,
								questionText: e.target.value
							})),
							rows: 2,
							placeholder: "Describe the question or issue...",
							className: "mt-1 w-full rounded-lg border bg-card p-2 text-xs outline-none focus:ring-2 focus:ring-ring"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageUploadSection, {
							entryId,
							onImageSelect: setImageBlob
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2 grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-semibold uppercase",
									children: "Subject"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: data.subject || "Physics",
									onChange: (e) => setData((d) => ({
										...d,
										subject: e.target.value
									})),
									className: "mt-0.5 w-full rounded-lg border bg-card px-2 py-1 text-xs focus:ring-2 focus:ring-ring",
									children: SUBJECTS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: s,
										children: s
									}, s))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-semibold uppercase",
									children: "Difficulty"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: data.difficulty || "Medium",
									onChange: (e) => setData((d) => ({
										...d,
										difficulty: e.target.value
									})),
									className: "mt-0.5 w-full rounded-lg border bg-card px-2 py-1 text-xs focus:ring-2 focus:ring-ring",
									children: DIFFICULTIES.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: d,
										children: d
									}, d))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-semibold uppercase",
									children: "Status"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: data.status || "Need Review",
									onChange: (e) => setData((d) => ({
										...d,
										status: e.target.value
									})),
									className: "mt-0.5 w-full rounded-lg border bg-card px-2 py-1 text-xs focus:ring-2 focus:ring-ring",
									children: STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: s,
										children: [
											s === "Need Review" ? "🔴" : s === "Learning" ? "🟡" : "🟢",
											" ",
											s
										]
									}, s))
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2 grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-semibold uppercase",
								children: "Chapter"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: data.chapter || "",
								onChange: (e) => setData((d) => ({
									...d,
									chapter: e.target.value
								})),
								placeholder: "Chapter...",
								className: "mt-0.5 w-full rounded-lg border bg-card px-2 py-1 text-xs focus:ring-2 focus:ring-ring"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-semibold uppercase",
								children: "Topic"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: data.topic || "",
								onChange: (e) => setData((d) => ({
									...d,
									topic: e.target.value
								})),
								placeholder: "Topic...",
								className: "mt-0.5 w-full rounded-lg border bg-card px-2 py-1 text-xs focus:ring-2 focus:ring-ring"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2 grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-semibold uppercase",
								children: "Source / Test"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: data.source || "",
								onChange: (e) => setData((d) => ({
									...d,
									source: e.target.value
								})),
								placeholder: "e.g., JEE 2023...",
								className: "mt-0.5 w-full rounded-lg border bg-card px-2 py-1 text-xs focus:ring-2 focus:ring-ring"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-semibold uppercase",
								children: "Question #"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: data.questionNumber || "",
								onChange: (e) => setData((d) => ({
									...d,
									questionNumber: e.target.value
								})),
								placeholder: "e.g., Q45...",
								className: "mt-0.5 w-full rounded-lg border bg-card px-2 py-1 text-xs focus:ring-2 focus:ring-ring"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-semibold uppercase mb-1",
								children: "Error Type"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1",
								children: ERROR_TYPES.slice(0, 5).map((type) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setData((d) => ({
										...d,
										errorType: type
									})),
									className: cn("rounded-full border px-2 py-0.5 text-[10px] font-medium transition", data.errorType === type ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:bg-accent"),
									children: type
								}, type))
							}),
							ERROR_TYPES.length > 5 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1 mt-1",
								children: ERROR_TYPES.slice(5).map((type) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setData((d) => ({
										...d,
										errorType: type
									})),
									className: cn("rounded-full border px-2 py-0.5 text-[10px] font-medium transition", data.errorType === type ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:bg-accent"),
									children: type
								}, type))
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs font-semibold uppercase",
							children: "❌ Mistake"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: data.mistakeMade || "",
							onChange: (e) => setData((d) => ({
								...d,
								mistakeMade: e.target.value
							})),
							rows: 2,
							placeholder: "What went wrong...",
							className: "mt-0.5 w-full rounded-lg border bg-card p-2 text-xs outline-none focus:ring-2 focus:ring-ring"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs font-semibold uppercase",
							children: "✅ Learned"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: data.whatLearned || "",
							onChange: (e) => setData((d) => ({
								...d,
								whatLearned: e.target.value
							})),
							rows: 2,
							placeholder: "Key concepts...",
							className: "mt-0.5 w-full rounded-lg border bg-card p-2 text-xs outline-none focus:ring-2 focus:ring-ring"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs font-semibold uppercase",
							children: "💡 Remember"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: data.rememberNext || "",
							onChange: (e) => setData((d) => ({
								...d,
								rememberNext: e.target.value
							})),
							rows: 1,
							placeholder: "Quick reminder...",
							className: "mt-0.5 w-full rounded-lg border bg-card p-2 text-xs outline-none focus:ring-2 focus:ring-ring"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs font-semibold uppercase",
							children: "📝 Notes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: data.additionalNotes || "",
							onChange: (e) => setData((d) => ({
								...d,
								additionalNotes: e.target.value
							})),
							rows: 1,
							placeholder: "Extra notes...",
							className: "mt-0.5 w-full rounded-lg border bg-card p-2 text-xs outline-none focus:ring-2 focus:ring-ring"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AudioRecorder, {
							entryId,
							onAudioChange: (hasAudio) => setData((d) => ({
								...d,
								hasAudio
							}))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: handleSave,
								disabled: isSaving,
								className: "flex-1 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50",
								children: isSaving ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mr-1 inline size-3 animate-spin" }), " Saving..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mr-1 inline size-3" }), " Save"] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: onCancel,
								disabled: isSaving,
								className: "flex-1 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-accent disabled:opacity-50",
								children: "Cancel"
							})]
						})
					]
				})
			]
		})
	});
}
var AUDIO_SPEEDS = [
	.5,
	1,
	1.5,
	2
];
/**
* ErrorJournalViewer: READ-ONLY display of a preserved mistake.
* Shows the original question, image, audio, and your mistake notes.
* No solving, no reattempt, no practice.
*/
function ErrorJournalViewer({ entry, onClose }) {
	const [imageUrl, setImageUrl] = (0, import_react.useState)(null);
	const [imageLoading, setImageLoading] = (0, import_react.useState)(true);
	const [audioUrl, setAudioUrl] = (0, import_react.useState)(null);
	const [audioSpeed, setAudioSpeed] = (0, import_react.useState)(1);
	const [audioLoading, setAudioLoading] = (0, import_react.useState)(true);
	const [viewerOpen, setViewerOpen] = (0, import_react.useState)(false);
	const [viewerScale, setViewerScale] = (0, import_react.useState)(1);
	const [defaultImageScale, setDefaultImageScale] = (0, import_react.useState)(1);
	const [isFullscreen, setIsFullscreen] = (0, import_react.useState)(false);
	const audioRef = (0, import_react.useRef)(null);
	const viewerBackdropRef = (0, import_react.useRef)(null);
	const questionViewerRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		let active = true;
		const loadImage = async () => {
			try {
				const blob = await getErrorJournalImage(entry.id);
				if (active && blob) setImageUrl(URL.createObjectURL(blob));
			} finally {
				if (active) setImageLoading(false);
			}
		};
		loadImage();
		return () => {
			active = false;
			if (imageUrl) URL.revokeObjectURL(imageUrl);
		};
	}, [entry.id]);
	(0, import_react.useEffect)(() => {
		let active = true;
		const loadAudio = async () => {
			try {
				const blob = await getErrorJournalAudio(entry.id);
				if (active && blob) setAudioUrl(URL.createObjectURL(blob));
			} finally {
				if (active) setAudioLoading(false);
			}
		};
		loadAudio();
		return () => {
			active = false;
			if (audioUrl) URL.revokeObjectURL(audioUrl);
		};
	}, [entry.id]);
	const handleSpeedChange = (rate) => {
		setAudioSpeed(rate);
		if (audioRef.current) audioRef.current.playbackRate = rate;
	};
	(0, import_react.useEffect)(() => {
		if (!viewerOpen) return;
		const onKeyDown = (event) => {
			if (event.key === "Escape") {
				if (document.fullscreenElement && questionViewerRef.current) {
					document.exitFullscreen();
					return;
				}
				setViewerOpen(false);
				return;
			}
			if (event.key === "+" || event.key === "=") {
				event.preventDefault();
				setViewerScale((s) => Math.min(4, Number((s + .25).toFixed(2))));
			}
			if (event.key === "-") {
				event.preventDefault();
				setViewerScale((s) => Math.max(.5, Number((s - .25).toFixed(2))));
			}
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [viewerOpen]);
	(0, import_react.useEffect)(() => {
		const onFullscreenChange = () => {
			setIsFullscreen(Boolean(document.fullscreenElement && questionViewerRef.current && document.fullscreenElement === questionViewerRef.current));
		};
		document.addEventListener("fullscreenchange", onFullscreenChange);
		return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!viewerOpen || !imageUrl) return;
		const img = new Image();
		img.onload = () => {
			const viewport = questionViewerRef.current;
			if (!viewport) {
				setDefaultImageScale(1);
				return;
			}
			const rect = viewport.getBoundingClientRect();
			const availableWidth = Math.max(rect.width - 32, 320);
			const availableHeight = Math.max(rect.height - 32, 220);
			const ratio = Math.min(availableWidth / img.naturalWidth, availableHeight / img.naturalHeight);
			setDefaultImageScale(Number.isFinite(ratio) && ratio > 0 ? ratio : 1);
		};
		img.src = imageUrl;
	}, [viewerOpen, imageUrl]);
	const closeQuestionViewer = () => {
		if (document.fullscreenElement && questionViewerRef.current) document.exitFullscreen();
		setViewerOpen(false);
		setIsFullscreen(false);
	};
	const toggleFullscreen = async () => {
		const target = questionViewerRef.current;
		if (!target) return;
		try {
			if (!document.fullscreenElement) {
				if (typeof target.requestFullscreen === "function") await target.requestFullscreen();
			} else if (document.fullscreenElement === target) {
				if (typeof document.exitFullscreen === "function") await document.exitFullscreen();
			}
		} catch {}
	};
	const openQuestionViewer = () => {
		setViewerScale(1);
		setDefaultImageScale(1);
		setViewerOpen(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [viewerOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: viewerBackdropRef,
		className: "fixed inset-0 z-[60] flex items-center justify-center bg-background/75 p-2 sm:p-6 backdrop-blur-sm",
		onClick: (event) => {
			if (event.target === event.currentTarget) closeQuestionViewer();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: questionViewerRef,
			className: "flex h-full max-h-[100vh] w-full max-w-[1500px] flex-col overflow-hidden rounded-2xl border border-border/80 bg-card/95 shadow-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3 border-b border-border/70 px-3 py-2 sm:px-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs uppercase tracking-wide text-muted-foreground",
					children: "Original Question"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm font-semibold text-foreground",
					children: "Full Screen Viewer"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setViewerScale((s) => Math.max(.5, Number((s - .25).toFixed(2)))),
							className: "rounded-md border border-border bg-card px-2 py-1 text-sm text-foreground hover:bg-accent",
							"aria-label": "Zoom out",
							children: "−"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-12 text-center text-xs font-medium text-muted-foreground",
							children: [Math.round(viewerScale * 100), "%"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setViewerScale((s) => Math.min(4, Number((s + .25).toFixed(2)))),
							className: "rounded-md border border-border bg-card px-2 py-1 text-sm text-foreground hover:bg-accent",
							"aria-label": "Zoom in",
							children: "+"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: toggleFullscreen,
							className: "rounded-md border border-border bg-card px-2 py-1 text-xs text-foreground hover:bg-accent",
							"aria-label": isFullscreen ? "Exit fullscreen" : "Enter fullscreen",
							children: isFullscreen ? "⛶ Exit Fullscreen" : "⛶ Fullscreen"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setViewerScale(1),
							className: "rounded-md border border-border bg-card px-2 py-1 text-xs text-muted-foreground hover:bg-accent",
							children: "Reset"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: closeQuestionViewer,
							className: "rounded-md border border-border bg-card p-2 text-foreground hover:bg-accent",
							"aria-label": "Close viewer",
							title: "Close",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 overflow-auto p-3 sm:p-5",
				children: [entry.questionText && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 rounded-xl border border-border/70 bg-card/60 p-3 text-sm text-foreground shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-1 text-[10px] font-bold uppercase tracking-wide text-muted-foreground",
						children: "Question Text"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "whitespace-pre-wrap break-words leading-relaxed",
						children: entry.questionText
					})]
				}), imageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex min-h-[50vh] items-center justify-center rounded-xl border border-border/70 bg-background/60 p-2 sm:p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: imageUrl,
						alt: "Original question",
						draggable: false,
						className: "block select-none transition-transform duration-150 ease-out",
						style: {
							transform: `scale(${viewerScale * defaultImageScale})`,
							transformOrigin: "center center",
							maxWidth: "none",
							maxHeight: "none"
						}
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex min-h-[50vh] items-center justify-center rounded-xl border border-dashed border-border/70 bg-card/30 p-4 text-sm text-muted-foreground",
					children: "No question image saved for this entry."
				})]
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-background/60 p-4 backdrop-blur-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border/80 bg-card p-6 shadow-xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-bold",
					children: "📖 Review Mistake"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "rounded-lg border p-2 hover:bg-accent",
					title: "Close",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-lg border bg-card/50 p-3 text-xs text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2 sm:grid-cols-2",
							children: [
								entry.subject && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: "Subject:"
									}),
									" ",
									entry.subject
								] }),
								entry.difficulty && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: "Difficulty:"
									}),
									" ",
									entry.difficulty
								] }),
								entry.source && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: "Source:"
									}),
									" ",
									entry.source
								] }),
								entry.questionNumber && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: "Question #:"
									}),
									" ",
									entry.questionNumber
								] }),
								entry.chapter && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: "Chapter:"
									}),
									" ",
									entry.chapter
								] }),
								entry.topic && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: "Topic:"
									}),
									" ",
									entry.topic
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: "Error Type:"
									}),
									" ",
									entry.errorType
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: "Status:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: cn("ml-1 rounded-full px-2 py-0.5", entry.status === "Need Review" ? "bg-red-500/10 text-red-600" : entry.status === "Learning" ? "bg-yellow-500/10 text-yellow-600" : "bg-green-500/10 text-green-600"),
									children: [
										entry.status === "Need Review" && "🔴",
										entry.status === "Learning" && "🟡",
										entry.status === "Mastered" && "🟢",
										" " + entry.status
									]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: "Created:"
									}),
									" ",
									new Date(entry.createdAt).toLocaleString()
								] })
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						role: "button",
						tabIndex: 0,
						onClick: openQuestionViewer,
						onKeyDown: (event) => {
							if (event.key === "Enter" || event.key === " ") {
								event.preventDefault();
								openQuestionViewer();
							}
						},
						className: "cursor-pointer space-y-2 rounded-lg border bg-card/50 p-4 transition hover:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-bold",
							children: "❓ Original Question"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm text-foreground",
							children: entry.questionText || "(No question text recorded)"
						})]
					}),
					!imageLoading && imageUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						role: "button",
						tabIndex: 0,
						onClick: openQuestionViewer,
						onKeyDown: (event) => {
							if (event.key === "Enter" || event.key === " ") {
								event.preventDefault();
								openQuestionViewer();
							}
						},
						className: "cursor-pointer space-y-2 rounded-lg border bg-card/50 p-4 transition hover:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-bold",
							children: "📷 Original Question Image"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: imageUrl,
							alt: "Original question",
							className: "max-h-96 max-w-full rounded-lg border object-contain"
						})]
					}),
					entry.mistakeMade && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 rounded-lg border border-red-500/30 bg-red-500/5 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-bold text-red-600",
							children: "❌ What Went Wrong"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-foreground",
							children: entry.mistakeMade
						})]
					}),
					entry.whatLearned && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 rounded-lg border border-green-500/30 bg-green-500/5 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-bold text-green-600",
							children: "✅ What I Learned"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-foreground",
							children: entry.whatLearned
						})]
					}),
					entry.rememberNext && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 rounded-lg border border-blue-500/30 bg-blue-500/5 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-bold text-blue-600",
							children: "💡 Remember Next Time"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-foreground",
							children: entry.rememberNext
						})]
					}),
					entry.additionalNotes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 rounded-lg border border-purple-500/30 bg-purple-500/5 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-bold text-purple-600",
							children: "📝 Additional Notes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-foreground",
							children: entry.additionalNotes
						})]
					}),
					(audioUrl || entry.hasAudio) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3 rounded-lg border border-dashed bg-card/50 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-bold",
								children: "🎙️ My Audio Reflection"
							}),
							audioLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Loading audio..."
							}),
							audioUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
									ref: audioRef,
									src: audioUrl,
									controls: true,
									className: "w-full rounded-lg bg-card"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-1.5",
									children: AUDIO_SPEEDS.map((speed) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => handleSpeedChange(speed),
										className: cn("rounded-md border px-2 py-1 text-xs font-semibold transition", audioSpeed === speed ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-accent"),
										children: [speed, "×"]
									}, speed))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Click to play · Use speed controls · Your original recording"
								})
							] }) : !audioLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "No audio recording found for this entry."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "w-full rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground hover:opacity-90",
						children: "Done"
					})
				]
			})]
		})
	})] });
}
function ErrorJournalStats({ entries }) {
	const stats = {
		total: entries.length,
		needReview: entries.filter((e) => e.status === "Need Review").length,
		learning: entries.filter((e) => e.status === "Learning").length,
		mastered: entries.filter((e) => e.status === "Mastered").length,
		withAudio: entries.filter((e) => e.hasAudio).length,
		withPhoto: entries.filter((e) => e.imageId).length
	};
	const errorCounts = {};
	entries.forEach((e) => {
		errorCounts[e.errorType] = (errorCounts[e.errorType] || 0) + 1;
	});
	const repeatedIssues = Object.entries(errorCounts).sort((a, b) => b[1] - a[1]).slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border bg-gradient-to-br from-primary/5 to-transparent p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mb-3 text-sm font-bold uppercase tracking-wider text-muted-foreground",
				children: "📊 Your Stats"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-3",
				children: [
					{
						label: "Total Entries",
						value: stats.total,
						icon: "📝"
					},
					{
						label: "Need Review",
						value: stats.needReview,
						icon: "🔴"
					},
					{
						label: "Learning",
						value: stats.learning,
						icon: "🟡"
					},
					{
						label: "Mastered",
						value: stats.mastered,
						icon: "🟢"
					},
					{
						label: "With Audio",
						value: stats.withAudio,
						icon: "🎙️"
					},
					{
						label: "With Photo",
						value: stats.withPhoto,
						icon: "📷"
					}
				].map((stat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border bg-card p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-lg font-bold",
						children: [
							stat.icon,
							" ",
							stat.value
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground",
						children: stat.label
					})]
				}, stat.label))
			}),
			repeatedIssues.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 rounded-lg bg-card p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-2 text-xs font-bold uppercase text-muted-foreground",
					children: "⚠️ Common Issues"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-1",
					children: repeatedIssues.map(([errorType, count]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: errorType }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-primary/20 px-2 py-0.5 font-semibold text-primary",
							children: count
						})]
					}, errorType))
				})]
			}),
			stats.total === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground italic",
				children: "Create your first entry to see stats"
			})
		]
	});
}
function ErrorJournalIndex() {
	const [editingEntry, setEditingEntry] = (0, import_react.useState)();
	const [showEditor, setShowEditor] = (0, import_react.useState)(false);
	const [viewingEntry, setViewingEntry] = (0, import_react.useState)();
	const errorEntries = useQuery({
		queryKey: ["errorJournal"],
		queryFn: listErrorJournalEntries
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "flex items-center gap-2 text-2xl font-bold tracking-tight",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookMarked, { className: "size-5" }), " Error Journal"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Review your preserved mistakes and learning notes. This is your personal archive for reflection and growth."
		}),
		errorEntries.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 text-sm text-muted-foreground",
			children: "Loading…"
		}),
		!errorEntries.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorJournalStats, { entries: errorEntries.data ?? [] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorJournalList, {
				entries: errorEntries.data ?? [],
				onNew: () => {
					setEditingEntry(void 0);
					setShowEditor(true);
				},
				onView: (entry) => {
					setViewingEntry(entry);
				},
				onEdit: (entry) => {
					setEditingEntry(entry);
					setShowEditor(true);
				},
				onDelete: async (id) => {
					await deleteErrorJournalEntry(id);
					await errorEntries.refetch();
				}
			})
		})] }),
		showEditor && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorJournalEditor, {
			entry: editingEntry,
			onSave: async (entry) => {
				setShowEditor(false);
				setEditingEntry(void 0);
				await errorEntries.refetch();
			},
			onCancel: () => {
				setShowEditor(false);
				setEditingEntry(void 0);
			}
		}),
		viewingEntry && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorJournalViewer, {
			entry: viewingEntry,
			onClose: () => {
				setViewingEntry(void 0);
			}
		})
	] });
}
//#endregion
export { ErrorJournalIndex as component };
