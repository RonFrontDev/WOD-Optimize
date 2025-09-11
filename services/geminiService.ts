import { GoogleGenAI, Type } from "@google/genai";
import type { Drill, MobilityExercise, TransitionTip, EnergySavingTip, WorkoutStrategy, SuggestedWorkout } from '../types';

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

export const analyzeMovementForm = async (imageFile: File, movementName: string): Promise<string> => {
    try {
        const imagePart = await fileToGenerativePart(imageFile);
        const prompt = `You are an expert CrossFit and strength & conditioning coach. Analyze the user's form for the ${movementName} in the provided image.
        
        Provide your feedback in the following format:
        1.  **Overall Impression:** A brief, encouraging summary.
        2.  **Points of Performance:** 2-3 key things the user is doing well.
        3.  **Areas for Improvement:** 2-3 specific, actionable points of correction. Focus on the most critical faults first.
        
        Keep your language clear, concise, and motivational. Do not use markdown formatting.`;

        const response = await ai.models.generateContent({
            model: model,
            contents: { parts: [imagePart, { text: prompt }] },
        });

        return response.text;
    } catch (error) {
        console.error("Error analyzing movement form:", error);
        return "Sorry, I couldn't analyze the image. Please try again with a clearer picture.";
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

const strategySchema = {
    type: Type.OBJECT,
    properties: {
        goal: { type: Type.STRING, description: "The overall strategy and intended stimulus of the workout, including realistic goals (time, reps, rounds)." },
        timeEstimate: { type: Type.STRING, description: "An estimated time to complete the workout (e.g., '10-12 minutes') for an athlete at this level following this strategy." },
        pacing: { type: Type.STRING, description: "Specific pacing advice and how to break up reps for each movement to avoid burnout." },
        efficiency: { type: Type.STRING, description: "Key technical cues for staying efficient on each movement when under fatigue." },
        transitions: { type: Type.STRING, description: "The most efficient way to transition between movements to save time." },
        pushVsConserve: { type: Type.STRING, description: "Identification of where to push the pace and where to conserve energy and breathe." },
        breathing: { type: Type.STRING, description: "An actionable breathing plan for the workout's rhythm." },
        improvementFocus: { type: Type.STRING, description: "Actionable advice on how to improve the user's specified limiters (e.g., drills for grip strength, conditioning for cardio)." }
    },
    required: ["goal", "timeEstimate", "pacing", "efficiency", "transitions", "pushVsConserve", "breathing", "improvementFocus"]
};

export const generateWorkoutStrategy = async (workoutDescription: string, limiters: string[]): Promise<WorkoutStrategy | null> => {
    try {
        let prompt = `You are an elite CrossFit and conditioning coach. A user has provided their workout: "${workoutDescription}".`;
        
        if (limiters.length > 0) {
            prompt += ` The user has identified their personal limiters as: ${limiters.join(', ')}. Your strategy MUST take these specific weaknesses into account in all sections.`;
        }

        prompt += `
        
        Provide a highly detailed, comprehensive JSON object with strategies for different skill levels. The root object must contain four keys: "elite", "rx", "intermediate", and "scaledBeginner".
        
        For EACH of these four skill levels, provide a JSON object with the following keys:
        - "goal": The overall strategy and intended stimulus of the workout, including realistic goals (time, reps, rounds).
        - "timeEstimate": An estimated time to complete the workout (e.g., "10-12 minutes") for an athlete at this level following this strategy.
        - "pacing": Specific pacing advice and how to break up reps for each movement to avoid burnout.
        - "efficiency": Key technical cues for staying efficient on each movement when under fatigue.
        - "transitions": The most efficient way to transition between movements to save time.
        - "pushVsConserve": Identification of where to push the pace and where to conserve energy and breathe.
        - "breathing": An actionable breathing plan for the workout's rhythm.
        - "improvementFocus": Actionable advice on how to improve the user's specified limiters (e.g., drills for grip strength, conditioning for cardio). If no limiters are specified, provide general advice.
        
        Your tone should be that of an expert coach: encouraging, clear, and tactical. Ensure the content for each key is a single string.`;

        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        elite: strategySchema,
                        rx: strategySchema,
                        intermediate: strategySchema,
                        scaledBeginner: strategySchema,
                    },
                    required: ["elite", "rx", "intermediate", "scaledBeginner"]
                }
            }
        });

        return JSON.parse(response.text);
    } catch (error) {
        console.error("Error generating workout strategy:", error);
        return null;
    }
};


export const generateSimilarWorkouts = async (workoutDescription: string): Promise<SuggestedWorkout[]> => {
    try {
        const prompt = `You are an expert CrossFit programmer. Given the workout "${workoutDescription}", generate exactly 3 other named workouts that have a similar training stimulus. For each workout, provide a unique, creative name and a clear description of the movements, reps, and format.`;

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
                                    description: { type: Type.STRING }
                                },
                                required: ["name", "description"]
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