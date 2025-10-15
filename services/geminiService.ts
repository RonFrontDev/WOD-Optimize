import { GoogleGenAI, Type } from "@google/genai";
import type { Drill, MobilityExercise, TransitionTip, EnergySavingTip, WorkoutStrategy, SuggestedWorkout, HeatmapPoint, MuscleActivation, AdaptiveWorkoutStrategy, MovementModification, InjurySeverity, WarmupPlan } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = "gemini-2.5-flash";

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]);
      }
    };
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

export interface AnalysisResult {
    feedbackText: string;
    heatmapPoints: HeatmapPoint[];
}


export const analyzeMovementForm = async (imageFile: File, movementName: string): Promise<AnalysisResult> => {
    try {
        const imagePart = await fileToGenerativePart(imageFile);
        const prompt = `You are an expert CrossFit and strength & conditioning coach. Analyze the user's form for the ${movementName} in the provided image.

        Provide your response as a single JSON object with two keys: "feedbackText" and "heatmapPoints".

        1.  "feedbackText": A string containing your analysis in the following format:
            - **Overall Impression:** A brief, encouraging summary.
            - **Points of Performance:** 2-3 key things the user is doing well.
            - **Areas for Improvement:** 2-3 specific, actionable points of correction. Focus on the most critical faults first.
            (Do not use markdown in the feedbackText string itself).

        2.  "heatmapPoints": A JSON array of objects. Each object represents a key point on the user's body to highlight. For each point, provide:
            - "x": The horizontal coordinate as a percentage (0-100) from the left edge of the image.
            - "y": The vertical coordinate as a percentage (0-100) from the top edge of the image.
            - "label": A short, descriptive label for the point (e.g., "Upright Torso", "Knee Position", "Bar Path").
            - "type": A string that is either "positive" for good form or "improvement" for a fault.`;

        const response = await ai.models.generateContent({
            model: model,
            contents: { parts: [imagePart, { text: prompt }] },
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        feedbackText: { type: Type.STRING },
                        heatmapPoints: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    x: { type: Type.NUMBER },
                                    y: { type: Type.NUMBER },
                                    label: { type: Type.STRING },
                                    type: { type: Type.STRING, enum: ['positive', 'improvement'] }
                                },
                                required: ["x", "y", "label", "type"]
                            }
                        }
                    },
                    required: ["feedbackText", "heatmapPoints"]
                }
            }
        });
        
        const jsonResponse = JSON.parse(response.text);
        return jsonResponse;
    } catch (error) {
        console.error("Error analyzing movement form:", error);
        return { 
            feedbackText: "Sorry, I couldn't analyze the image. The model may be unable to identify key points or there was a network issue. Please try again with a clearer picture.",
            heatmapPoints: []
        };
    }
};

export const generateDrills = async (movementName: string): Promise<Drill[]> => {
    try {
        const prompt = `As a CrossFit coach, list 5 effective accessory drills to improve the ${movementName}. For each drill, briefly explain what it targets and how it helps.`;
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        drills: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    name: { type: Type.STRING },
                                    description: { type: Type.STRING }
                                },
                                required: ["name", "description"]
                            }
                        }
                    },
                    required: ["drills"]
                }
            }
        });

        const jsonResponse = JSON.parse(response.text);
        return jsonResponse.drills || [];
    } catch (error) {
        console.error("Error generating drills:", error);
        return [];
    }
};

export const generateMobilityRoutine = async (movementName: string): Promise<MobilityExercise[]> => {
    try {
        const prompt = `As a CrossFit coach, recommend 5 mobility exercises or stretches to improve performance and prevent injury for the ${movementName}. For each exercise, briefly explain its benefit.`;

        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        mobility: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    name: { type: Type.STRING },
                                    description: { type: Type.STRING }
                                },
                                required: ["name", "description"]
                            }
                        }
                    },
                    required: ["mobility"]
                }
            }
        });
        
        const jsonResponse = JSON.parse(response.text);
        return jsonResponse.mobility || [];
    } catch (error) {
        console.error("Error generating mobility routine:", error);
        return [];
    }
};

export const generateTransitionTips = async (movementName: string): Promise<TransitionTip[]> => {
    try {
        const prompt = `As a CrossFit coach, list 5 actionable tips on how to transition faster to and from the ${movementName} in a workout. For each tip, provide a clear title and a brief explanation.`;
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        tips: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    name: { type: Type.STRING },
                                    description: { type: Type.STRING }
                                },
                                required: ["name", "description"]
                            }
                        }
                    },
                    required: ["tips"]
                }
            }
        });

        const jsonResponse = JSON.parse(response.text);
        return jsonResponse.tips || [];
    } catch (error) {
        console.error("Error generating transition tips:", error);
        return [];
    }
};

export const generateEnergySavingTips = async (movementName: string): Promise<EnergySavingTip[]> => {
    try {
        const prompt = `As a CrossFit coach, list 5 key strategies for conserving energy while performing the ${movementName}. Focus on technique, pacing, and breathing. For each strategy, provide a clear title and a brief explanation.`;

        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        strategies: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    name: { type: Type.STRING },
                                    description: { type: Type.STRING }
                                },
                                required: ["name", "description"]
                            }
                        }
                    },
                    required: ["strategies"]
                }
            }
        });

        const jsonResponse = JSON.parse(response.text);
        return jsonResponse.strategies || [];
    } catch (error) {
        console.error("Error generating energy saving tips:", error);
        return [];
    }
};

export const generateWarmup = async (workoutDescription: string): Promise<WarmupPlan | null> => {
    try {
        const prompt = `You are a world-class strength and conditioning coach. A user is about to perform the following workout: "${workoutDescription}".
        
        Create a comprehensive, 4-phase warm-up tailored to this workout. The warm-up should prepare the athlete's body for the specific demands of the movements, improve performance, and reduce the risk of injury. Provide the response as a single JSON object with the following keys: "general", "dynamicStretching", "movementSpecific", "workoutPrep".

        1.  **general**: An array of 2-3 general cardio activities to raise the heart rate. Each item should have an "activity" and a "duration".
        2.  **dynamicStretching**: An array of 4-6 full-body dynamic stretches or mobility drills. Each item should have an "activity" and suggested "reps".
        3.  **movementSpecific**: An array of 2-4 drills that activate and prime the specific muscles and movement patterns for the workout. Each item should have an "activity" and "details" explaining the focus.
        4.  **workoutPrep**: An array of 2-3 ramp-up rounds using the actual workout movements at a lighter intensity. Each item should have a "round" number and "details" of what to do.`;
        
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        general: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    activity: { type: Type.STRING },
                                    duration: { type: Type.STRING }
                                },
                                required: ["activity", "duration"]
                            }
                        },
                        dynamicStretching: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    activity: { type: Type.STRING },
                                    reps: { type: Type.STRING }
                                },
                                required: ["activity", "reps"]
                            }
                        },
                        movementSpecific: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    activity: { type: Type.STRING },
                                    details: { type: Type.STRING }
                                },
                                required: ["activity", "details"]
                            }
                        },
                        workoutPrep: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    round: { type: Type.STRING },
                                    details: { type: Type.STRING }
                                },
                                required: ["round", "details"]
                            }
                        },
                    },
                    required: ["general", "dynamicStretching", "movementSpecific", "workoutPrep"]
                }
            }
        });

        return JSON.parse(response.text);

    } catch (error) {
        console.error("Error generating warmup:", error);
        return null;
    }
};


const strategySchema = {
    type: Type.OBJECT,
    properties: {
        goal: { type: Type.STRING, description: "The overall strategy and intended stimulus of the workout, including realistic goals (time, reps, rounds)." },
        timeEstimate: { type: Type.STRING, description: "An estimated time to complete the workout (e.g., '10-12 minutes') for an athlete at this level following this strategy." },
        pacing: { type: Type.STRING, description: "Specific pacing advice and how to break up reps for each movement to avoid burnout. For teams, this must include rep splitting strategies (e.g. 'you go, I go', waterfalls)." },
        efficiency: { type: Type.STRING, description: "Key technical cues for staying efficient on each movement when under fatigue." },
        transitions: { type: Type.STRING, description: "The most efficient way to transition between movements to save time. For teams, this must include advice on partner changeovers and station management." },
        pushVsConserve: { type: Type.STRING, description: "Identification of where to push the pace and where to conserve energy and breathe." },
        breathing: { type: Type.STRING, description: "An actionable breathing plan for the workout's rhythm." },
        improvementFocus: { type: Type.STRING, description: "Actionable advice on how to improve the user's specified limiters (e.g., drills for grip strength, conditioning for cardio). For teams, this should address team-wide improvement." }
    },
    required: ["goal", "timeEstimate", "pacing", "efficiency", "transitions", "pushVsConserve", "breathing", "improvementFocus"]
};

export interface FullWorkoutStrategy extends WorkoutStrategy, MuscleActivation {}

export const generateWorkoutStrategy = async (workoutDescription: string, limiters: string[], teamSize: number): Promise<FullWorkoutStrategy | null> => {
    try {
        const validMuscles = [
            'quadriceps', 'hamstrings', 'glutes', 'calves', 'abdominals', 'obliques', 
            'lower_back', 'lats', 'traps', 'chest', 'deltoids', 'triceps', 'biceps', 'forearms'
        ];

        let prompt = `You are an elite CrossFit and conditioning coach specializing in competition strategy. A user has provided their workout: "${workoutDescription}".`;

        if (teamSize === 1) {
            prompt += ` This is for an individual athlete.`;
        } else {
            prompt += ` This is for a TEAM OF ${teamSize} ATHLETES. Your advice MUST be team-focused.`;
        }
        
        if (limiters.length > 0) {
            prompt += ` The user has identified their personal (or team's) limiters as: ${limiters.join(', ')}. Your strategy MUST take these specific weaknesses into account in all sections.`;
        }

        prompt += `
        
        Provide a highly detailed, comprehensive JSON object. The root object must contain the following keys:
        1.  "primaryMuscles": An array of strings listing the PRIMARY muscles targeted.
        2.  "secondaryMuscles": An array of strings listing the SECONDARY/SUPPORTING muscles targeted.
        3.  "elite", "rx", "intermediate", "scaledBeginner": Four keys, each containing a strategy object for that skill level.

        For the muscle arrays, you MUST use only the following valid muscle names: ${validMuscles.join(', ')}.

        For EACH of the four skill level objects ("elite", "rx", etc.), provide a JSON object with the following keys:
        - "goal": The overall strategy and intended stimulus of the workout, including realistic goals (time, reps, rounds).
        - "timeEstimate": An estimated time to complete the workout (e.g., "10-12 minutes") for an athlete at this level following this strategy.
        - "pacing": Specific pacing advice and how to break up reps for each movement to avoid burnout. For teams, this MUST include rep splitting strategies (e.g., 'you go, I go', waterfalls, short vs. long sets) and how to manage work-to-rest ratios.
        - "efficiency": Key technical cues for staying efficient on each movement when under fatigue.
        - "transitions": The most efficient way to transition between movements to save time. For teams, this MUST include advice on partner changeovers and managing the workout station.
        - "pushVsConserve": Identification of where to push the pace and where to conserve energy and breathe. For teams, this should include how different athletes can play different roles.
        - "breathing": An actionable breathing plan for the workout's rhythm.
        - "improvementFocus": Actionable advice on how to improve the user's specified limiters (e.g., drills for grip strength, conditioning for cardio). If no limiters are specified, provide general advice. For teams, this should address how to improve as a unit.
        
        Your tone should be that of an expert coach: encouraging, clear, and tactical. Ensure the content for each key is a single string.`;

        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        primaryMuscles: { type: Type.ARRAY, items: { type: Type.STRING, enum: validMuscles } },
                        secondaryMuscles: { type: Type.ARRAY, items: { type: Type.STRING, enum: validMuscles } },
                        elite: strategySchema,
                        rx: strategySchema,
                        intermediate: strategySchema,
                        scaledBeginner: strategySchema,
                    },
                    required: ["primaryMuscles", "secondaryMuscles", "elite", "rx", "intermediate", "scaledBeginner"]
                }
            }
        });

        return JSON.parse(response.text);
    } catch (error) {
        console.error("Error generating workout strategy:", error);
        return null;
    }
};


export const generateSimilarWorkouts = async (workoutDescription: string, level: string): Promise<SuggestedWorkout[]> => {
    try {
        const prompt = `You are a seasoned and creative CrossFit L4 programmer, known for designing challenging and effective workouts. Your task is to generate 3 unique, named workouts that share a similar training stimulus to "${workoutDescription}", but are not simple copies. These should be tailored for an athlete at the "${level}" level.

For each of the 3 workouts, you must provide:
1.  **name**: A creative and memorable name in the style of a benchmark WOD (e.g., "Gears Grinder", "Valkyrie's Test", "Short Circuit"). Avoid generic names like "Cardio Blast".
2.  **description**: A precise description of the movements, rep schemes, weights, and format (AMRAP, For Time, Chipper, etc.). Be specific with weights and movements. **Crucially, format this description string using line breaks (\\n) for readability.** For example, the format (e.g., "5 rounds for time of:") should be on its own line, followed by each movement on a new line.
3.  **goal**: A concise but insightful explanation of the workout's intended stimulus and *how* it mirrors or complements the original workout's demands (e.g., "Like the original, this workout tests grip endurance under high heart rate, but uses a chipper format to challenge pacing and transitions.").

Your suggestions should be varied in structure. If the original is a couplet, suggest a triplet or an AMRAP with different time domains. The goal is to provide high-quality, non-generic alternatives.

IMPORTANT: All weights must be specified in kilograms (kg) and all distances/heights in meters (m) or centimeters (cm).`;

        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        workouts: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    name: { type: Type.STRING },
                                    description: { type: Type.STRING },
                                    goal: { type: Type.STRING, description: "A brief explanation of the workout's goal or intended stimulus." }
                                },
                                required: ["name", "description", "goal"]
                            }
                        }
                    },
                    required: ["workouts"]
                }
            }
        });

        const jsonResponse = JSON.parse(response.text);
        return jsonResponse.workouts || [];
    } catch (error) {
        console.error("Error generating similar workouts:", error);
        return [];
    }
};

const injurySeverityMap = {
    sore: "Mild - The area is sore/stiff but can be used with some discomfort.",
    painful: "Moderate - The area is painful to use, and specific movements are clearly limited.",
    unusable: "Severe - The area is completely unusable and cannot be loaded at all."
};

export const generateAdaptiveStrategy = async (workoutDescription: string, injuryDescription: string, injurySeverity: InjurySeverity): Promise<AdaptiveWorkoutStrategy | null> => {
    try {
        const severityText = injurySeverityMap[injurySeverity];

        const prompt = `You are a dual-certified expert CrossFit L4 coach and Doctor of Physical Therapy. Your primary goal is safety and long-term athletic health. A user wants to perform a workout but has an injury.

        Workout: "${workoutDescription}"
        Injury/Limitation: "${injuryDescription}"
        Injury Severity: "${severityText}"

        Your task is to provide an adaptive workout strategy as a JSON object. This strategy must prioritize safety, avoid aggravating the injury, and still provide a meaningful training stimulus. Your recommendations MUST be appropriate for the specified injury severity.
        - For "Mild" severity, suggest scaling options like reduced weight, tempo control, or limited range of motion.
        - For "Moderate" severity, suggest direct movement substitutions that avoid the painful pattern.
        - For "Severe" severity, suggest modifications that completely unload the injured area (e.g., substituting an upper body movement for a lower body one if a leg is unusable).

        The JSON object must contain the following keys:
        - "safetyWarning": A mandatory disclaimer. It MUST be exactly this string: "IMPORTANT DISCLAIMER: This guidance is not a substitute for professional medical advice. Always consult with your doctor or physical therapist before starting any new exercise program, especially when injured."
        - "movementModifications": An array of objects, where each object details a suggested change. For each modification, provide:
            - "originalMovement": The movement from the workout that needs modification.
            - "modifiedMovement": The suggested substitution or scaling option (e.g., "Box Jumps" -> "Box Step-ups").
            - "reasoning": A clear explanation of why this modification is safer for the specified injury and its severity.
        - "techniqueFocus": Specific cues and points of focus for performing the modified movements safely and effectively, emphasizing how to protect the injured area.
        - "warmup": A brief, targeted warm-up routine designed to prepare the body for the modified workout, with special attention to the injured area and surrounding muscles.
        - "cooldown": A brief, targeted cool-down routine with gentle stretching or mobility work to aid recovery.
        - "revisedStrategy": An overall pacing and goal-setting plan for the *adapted* workout. Explain what the new stimulus is and what the user should focus on (e.g., "Focus on consistent movement quality rather than speed.").`;

        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        safetyWarning: { type: Type.STRING },
                        movementModifications: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    originalMovement: { type: Type.STRING },
                                    modifiedMovement: { type: Type.STRING },
                                    reasoning: { type: Type.STRING }
                                },
                                required: ["originalMovement", "modifiedMovement", "reasoning"]
                            }
                        },
                        techniqueFocus: { type: Type.STRING },
                        warmup: { type: Type.STRING },
                        cooldown: { type: Type.STRING },
                        revisedStrategy: { type: Type.STRING }
                    },
                    required: ["safetyWarning", "movementModifications", "techniqueFocus", "warmup", "cooldown", "revisedStrategy"]
                }
            }
        });

        return JSON.parse(response.text);
    } catch (error) {
        console.error("Error generating adaptive workout strategy:", error);
        return null;
    }
};