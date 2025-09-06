import React, { useState, useCallback, useEffect } from 'react';
import type { Movement, Drill, MobilityExercise, TransitionTip, EnergySavingTip, AnalysisSession } from '../types';
import { analyzeMovementForm, generateDrills, generateMobilityRoutine, generateTransitionTips, generateEnergySavingTips } from '../services/geminiService';
import FileUpload from './FileUpload';
import LoadingSpinner from './LoadingSpinner';
import SkeletonLoader from './SkeletonLoader';
import Modal from './Modal';
import { ArrowLeftIcon, HeartIcon, LightningIcon, SparklesIcon, XCircleIcon, ForwardIcon, EnergyIcon, ArchiveBoxIcon, GripIcon } from './Icons';
import GripGuide from './GripGuide';

interface MovementDetailProps {
  movement: Movement;
  onBack: () => void;
}

type ViewMode = 'details' | 'analyze' | 'drills' | 'mobility' | 'grip' | 'transitions' | 'energy' | 'history';

const HISTORY_STORAGE_KEY = 'wodOptimizeHistory';

export default function MovementDetail({ movement, onBack }: MovementDetailProps): React.JSX.Element {
  const [view, setView] = useState<ViewMode>('details');
  const [selectedFault, setSelectedFault] = useState<{ fault: string; fix: string } | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [drills, setDrills] = useState<Drill[]>([]);
  const [mobility, setMobility] = useState<MobilityExercise[]>([]);
  const [transitionTips, setTransitionTips] = useState<TransitionTip[]>([]);
  const [energySavingTips, setEnergySavingTips] = useState<EnergySavingTip[]>([]);
  const [history, setHistory] = useState<AnalysisSession[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isLoadingDrills, setIsLoadingDrills] = useState(false);
  const [isLoadingMobility, setIsLoadingMobility] = useState(false);
  const [isLoadingTransitions, setIsLoadingTransitions] = useState(false);
  const [isLoadingEnergy, setIsLoadingEnergy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveAnalysisToHistory = useCallback((movementId: string, session: AnalysisSession) => {
    try {
        const allHistory = JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY) || '{}');
        const movementHistory = allHistory[movementId] || [];
        // Add new session to the beginning of the array
        const updatedHistory = [session, ...movementHistory];
        allHistory[movementId] = updatedHistory;
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(allHistory));
        setHistory(updatedHistory); // Update state
    } catch (e) {
        console.error("Failed to save history to localStorage", e);
    }
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!imageFile) return;
    setIsAnalyzing(true);
    setError(null);
    setFeedback('');
    try {
      const result = await analyzeMovementForm(imageFile, movement.name);
      setFeedback(result);
      // Save to history
      const reader = new FileReader();
      reader.onloadend = () => {
          const imageDataUrl = reader.result as string;
          const newSession: AnalysisSession = {
              id: Date.now(),
              date: new Date().toISOString(),
              imageDataUrl,
              feedback: result,
          };
          saveAnalysisToHistory(movement.id, newSession);
      };
      reader.readAsDataURL(imageFile);
    } catch (err) {
      setError('An error occurred during analysis.');
    } finally {
      setIsAnalyzing(false);
    }
  }, [imageFile, movement.name, movement.id, saveAnalysisToHistory]);

  const fetchDrills = useCallback(async () => {
    setIsLoadingDrills(true);
    setError(null);
    try {
      const result = await generateDrills(movement.name);
      setDrills(result);
    } catch (err) {
      setError('Failed to fetch drills.');
    } finally {
      setIsLoadingDrills(false);
    }
  }, [movement.name]);
  
  const fetchMobility = useCallback(async () => {
    setIsLoadingMobility(true);
    setError(null);
    try {
      const result = await generateMobilityRoutine(movement.name);
      setMobility(result);
    } catch (err) {
      setError('Failed to fetch mobility routine.');
    } finally {
      setIsLoadingMobility(false);
    }
  }, [movement.name]);

  const fetchTransitionTips = useCallback(async () => {
    setIsLoadingTransitions(true);
    setError(null);
    try {
      const result = await generateTransitionTips(movement.name);
      setTransitionTips(result);
    } catch (err) {
      setError('Failed to fetch transition tips.');
    } finally {
      setIsLoadingTransitions(false);
    }
  }, [movement.name]);

  const fetchEnergySavingTips = useCallback(async () => {
    setIsLoadingEnergy(true);
    setError(null);
    try {
      const result = await generateEnergySavingTips(movement.name);
      setEnergySavingTips(result);
    } catch (err) {
      setError('Failed to fetch energy saving tips.');
    } finally {
      setIsLoadingEnergy(false);
    }
  }, [movement.name]);

  useEffect(() => {
    const getHistoryForMovement = (movementId: string): AnalysisSession[] => {
        try {
            const allHistory = JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY) || '{}');
            return allHistory[movementId] || [];
        } catch (e) {
            console.error("Failed to parse history from localStorage", e);
            return [];
        }
    };

    // Preload all data when the component mounts
    fetchDrills();
    fetchMobility();
    fetchTransitionTips();
    fetchEnergySavingTips();
    setHistory(getHistoryForMovement(movement.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movement.id, movement.name]);

  const renderContent = () => {
    if(error){
        return <div className="text-center text-red-600 dark:text-red-400 p-4 bg-red-100 dark:bg-red-900/20 rounded-lg">{error}</div>
    }

    switch (view) {
      case 'details':
        return (
          <div>
            <h3 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-4">Common Faults & Fixes</h3>
            <p className="text-text-muted dark:text-dark-text-muted mb-6">Click on any fault to read the full description and fix.</p>
            <ul className="space-y-4">
              {movement.commonFaults.map((item, index) => (
                <li
                  key={index}
                  onClick={() => setSelectedFault(item)}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedFault(item)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View details for ${item.fault}`}
                  className="bg-surface dark:bg-dark-surface p-4 rounded-lg shadow-md hover:bg-slate-50 dark:hover:bg-slate-600 border border-border-color dark:border-dark-border-color transition-colors duration-200 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-brand-primary"
                >
                  <p className="font-semibold text-brand-secondary">{item.fault}</p>
                  <p className="text-text-muted dark:text-dark-text-muted mt-1">{item.fix}</p>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'analyze':
        return (
          <div>
            <h3 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-4">Form Analysis</h3>
            <p className="text-text-muted dark:text-dark-text-muted mb-6">Upload a clear photo of yourself performing the movement. Our analysis tool will provide personalized feedback.</p>
            <FileUpload onFileSelect={setImageFile} />
            <button
              onClick={handleAnalyze}
              disabled={!imageFile || isAnalyzing}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-brand-primary hover:bg-cyan-600 disabled:bg-gray-400 dark:disabled:bg-slate-500 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
            >
              <SparklesIcon className="w-5 h-5"/>
              {isAnalyzing ? 'Analyzing...' : 'Analyze My Form'}
            </button>
            {isAnalyzing && <div className="mt-6 flex justify-center"><LoadingSpinner /></div>}
            {feedback && (
              <div className="mt-8 p-6 bg-slate-100 dark:bg-slate-800 rounded-lg whitespace-pre-wrap font-mono text-text-primary dark:text-dark-text-primary text-sm">
                {feedback}
              </div>
            )}
          </div>
        );
      case 'drills':
        return (
            <div>
                <h3 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-4">Corrective Drills</h3>
                {isLoadingDrills && drills.length === 0 ? (
                  <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, index) => <SkeletonLoader key={index} />)}
                  </div>
                ) : (
                  <ul className="space-y-4">
                      {drills.map((drill, i) => (
                          <li key={i} className="bg-surface dark:bg-dark-surface border border-border-color dark:border-dark-border-color p-4 rounded-lg">
                              <p className="font-semibold text-brand-primary">{drill.name}</p>
                              <p className="text-text-muted dark:text-dark-text-muted mt-1">{drill.description}</p>
                          </li>
                      ))}
                  </ul>
                )}
            </div>
        );
      case 'mobility':
        return (
            <div>
                <h3 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-4">Mobility Routine</h3>
                {isLoadingMobility && mobility.length === 0 ? (
                  <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, index) => <SkeletonLoader key={index} />)}
                  </div>
                ) : (
                  <ul className="space-y-4">
                      {mobility.map((ex, i) => (
                          <li key={i} className="bg-surface dark:bg-dark-surface border border-border-color dark:border-dark-border-color p-4 rounded-lg">
                              <p className="font-semibold text-brand-primary">{ex.name}</p>
                              <p className="text-text-muted dark:text-dark-text-muted mt-1">{ex.description}</p>
                          </li>
                      ))}
                  </ul>
                )}
            </div>
        );
      case 'grip':
        return <GripGuide category={movement.category} />;
      case 'transitions':
        return (
            <div>
                <h3 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-4">Transition Tips</h3>
                {isLoadingTransitions && transitionTips.length === 0 ? (
                  <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, index) => <SkeletonLoader key={index} />)}
                  </div>
                ) : (
                  <ul className="space-y-4">
                      {transitionTips.map((tip, i) => (
                          <li key={i} className="bg-surface dark:bg-dark-surface border border-border-color dark:border-dark-border-color p-4 rounded-lg">
                              <p className="font-semibold text-brand-primary">{tip.name}</p>
                              <p className="text-text-muted dark:text-dark-text-muted mt-1">{tip.description}</p>
                          </li>
                      ))}
                  </ul>
                )}
            </div>
        );
        case 'energy':
        return (
            <div>
                <h3 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-4">Energy Saving</h3>
                {isLoadingEnergy && energySavingTips.length === 0 ? (
                  <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, index) => <SkeletonLoader key={index} />)}
                  </div>
                ) : (
                  <ul className="space-y-4">
                      {energySavingTips.map((tip, i) => (
                          <li key={i} className="bg-surface dark:bg-dark-surface border border-border-color dark:border-dark-border-color p-4 rounded-lg">
                              <p className="font-semibold text-brand-primary">{tip.name}</p>
                              <p className="text-text-muted dark:text-dark-text-muted mt-1">{tip.description}</p>
                          </li>
                      ))}
                  </ul>
                )}
            </div>
        );
      case 'history':
        return (
          <div>
            <h3 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-4">Analysis History</h3>
            {history.length === 0 ? (
              <div className="text-center p-8 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <ArchiveBoxIcon className="w-16 h-16 mx-auto text-slate-400 dark:text-slate-500 mb-4" />
                  <p className="text-text-muted dark:text-dark-text-muted font-semibold">No analysis history found for {movement.name}.</p>
                  <button onClick={() => setView('analyze')} className="mt-4 text-brand-primary font-bold hover:underline">
                      Analyze your form to start tracking progress!
                  </button>
              </div>
            ) : (
              <ul className="space-y-6">
                {history.map(session => (
                  <li key={session.id} className="bg-surface dark:bg-dark-surface p-4 rounded-lg shadow-md animate-fade-in border border-border-color dark:border-dark-border-color">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <img src={session.imageDataUrl} alt="Analyzed form" className="w-full sm:w-32 h-32 object-cover rounded-md flex-shrink-0" />
                      <div className="flex-grow">
                        <p className="text-sm text-text-muted dark:text-dark-text-muted font-semibold">
                          {new Date(session.date).toLocaleString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </p>
                        <div className="mt-2 text-text-muted dark:text-dark-text-muted whitespace-pre-wrap font-mono text-sm border-l-2 border-border-color dark:border-dark-border-color pl-3">
                          {session.feedback}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      default:
        return null;
    }
  };
  
  const TabButton = ({ mode, label, icon }: { mode: ViewMode; label: string, icon: React.ReactNode }) => (
    <button
      onClick={() => setView(mode)}
      className={`flex-grow flex-shrink-0 flex items-center justify-center gap-2 px-3 py-3 text-sm font-medium transition-colors duration-200 focus:outline-none whitespace-nowrap ${
        view === mode
          ? 'text-brand-primary border-b-2 border-brand-primary'
          : 'text-text-muted dark:text-dark-text-muted hover:text-text-primary dark:hover:text-dark-text-primary'
      }`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div className="animate-fade-in">
      <button onClick={onBack} className="flex items-center gap-2 mb-6 text-sm text-brand-primary hover:underline">
        <ArrowLeftIcon className="w-4 h-4" />
        Back to Movements
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <img src={movement.imageUrl} alt={movement.name} className="w-full h-auto rounded-lg object-cover shadow-lg" />
          <h2 className="text-4xl font-bold text-text-primary dark:text-dark-text-primary mt-4">{movement.name}</h2>
          <p className="text-text-muted dark:text-dark-text-muted mt-2">{movement.description}</p>
        </div>
        <div className="md:w-2/3">
          <div className="border-b border-border-color dark:border-dark-border-color flex overflow-x-auto">
             <TabButton mode="details" label="Faults & Fixes" icon={<XCircleIcon className="w-5 h-5"/>}/>
             <TabButton mode="analyze" label="Form Analysis" icon={<SparklesIcon className="w-5 h-5"/>}/>
             <TabButton mode="drills" label="Drills" icon={<LightningIcon className="w-5 h-5"/>}/>
             <TabButton mode="mobility" label="Mobility" icon={<HeartIcon className="w-5 h-5"/>}/>
             <TabButton mode="grip" label="Grip Guide" icon={<GripIcon className="w-5 h-5"/>}/>
             <TabButton mode="transitions" label="Transitions" icon={<ForwardIcon className="w-5 h-5"/>}/>
             <TabButton mode="energy" label="Energy" icon={<EnergyIcon className="w-5 h-5"/>}/>
             <TabButton mode="history" label="History" icon={<ArchiveBoxIcon className="w-5 h-5"/>}/>
          </div>
          <div className="mt-6 p-1">
            {renderContent()}
          </div>
        </div>
      </div>

      <Modal
        isOpen={!!selectedFault}
        onClose={() => setSelectedFault(null)}
        title={selectedFault?.fault || ''}
      >
        <p className="text-text-muted dark:text-dark-text-muted mt-1 text-lg leading-relaxed">{selectedFault?.fix}</p>
      </Modal>

    </div>
  );
}