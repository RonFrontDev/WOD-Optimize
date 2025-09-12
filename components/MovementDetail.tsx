import React, { useState, useCallback, useEffect } from 'react';
import type { Movement, Drill, MobilityExercise, TransitionTip, EnergySavingTip, AnalysisSession, HeatmapPoint } from '../types';
import { analyzeMovementForm, generateDrills, generateMobilityRoutine, generateTransitionTips, generateEnergySavingTips } from '../services/geminiService';
import FileUpload from './FileUpload';
import LoadingSpinner from './LoadingSpinner';
import SkeletonLoader from './SkeletonLoader';
import Modal from './Modal';
import { 
    ArrowLeftIcon, HeartIcon, LightningIcon, SparklesIcon, XCircleIcon, ForwardIcon, 
    EnergyIcon, ArchiveBoxIcon, GripIcon, RoundedBackIcon, KneesCaveIcon, ChestDropIcon,
    ShallowDepthIcon, HeelsLiftIcon, HipsRiseIcon, BarPathIcon, EarlyArmBendIcon,
    PressOutIcon, UnstableOverheadIcon, RhythmIcon, PostureIcon, RangeOfMotionIcon,
    GripWeakIcon, BalanceIcon, CoreIcon, CheckCircleIcon, ExclamationTriangleIcon
} from './Icons';
import GripGuide from './GripGuide';
import AnalysisImageViewer from './AnalysisImageViewer';

interface MovementDetailProps {
  movement: Movement;
  onBack: () => void;
}

type ViewMode = 'details' | 'analyze' | 'drills' | 'mobility' | 'grip' | 'transitions' | 'energy' | 'history';

const HISTORY_STORAGE_KEY = 'wodOptimizeHistory';

const noGripMovementIds = [
  'push-up', 'handstand-push-up', 'burpee', 'box-jump', 'pistol-squat',
  'burpee-box-jump', 'bar-facing-burpee', 'box-jump-over', 'ghd-sit-up',
  'running', 'l-sit', 'handstand-walk', 'wall-walk', 'lunge'
];

const FaultIcon = ({ iconId, className }: { iconId: string; className: string }) => {
    switch (iconId) {
        case 'roundedBack': return <RoundedBackIcon className={className} />;
        case 'kneesCave': return <KneesCaveIcon className={className} />;
        case 'chestDrop': return <ChestDropIcon className={className} />;
        case 'shallowDepth': return <ShallowDepthIcon className={className} />;
        case 'heelsLift': return <HeelsLiftIcon className={className} />;
        case 'hipsRise': return <HipsRiseIcon className={className} />;
        case 'barPath': return <BarPathIcon className={className} />;
        case 'earlyArmBend': return <EarlyArmBendIcon className={className} />;
        case 'pressOut': return <PressOutIcon className={className} />;
        case 'unstableOverhead': return <UnstableOverheadIcon className={className} />;
        case 'rhythm': return <RhythmIcon className={className} />;
        case 'posture': return <PostureIcon className={className} />;
        case 'rom': return <RangeOfMotionIcon className={className} />;
        case 'grip': return <GripWeakIcon className={className} />;
        case 'balance': return <BalanceIcon className={className} />;
        case 'core': return <CoreIcon className={className} />;
        default: return <XCircleIcon className={className} />;
    }
};

const ParsedFeedback = ({ feedbackText }: { feedbackText: string }) => {
    const overallMatch = feedbackText.match(/Overall Impression:([\s\S]*?)(Points of Performance:|Areas for Improvement:|$)/i);
    const pointsMatch = feedbackText.match(/Points of Performance:([\s\S]*?)(Areas for Improvement:|$)/i);
    const improvementMatch = feedbackText.match(/Areas for Improvement:([\s\S]*)/i);

    const overall = overallMatch ? overallMatch[1].trim() : null;
    const points = pointsMatch ? pointsMatch[1].trim().split('\n').map(s => s.replace(/^-|^\d+\.\s*/, '').trim()).filter(Boolean) : [];
    const improvements = improvementMatch ? improvementMatch[1].trim().split('\n').map(s => s.replace(/^-|^\d+\.\s*/, '').trim()).filter(Boolean) : [];

    // Fallback for unexpected formats
    if (!overall && points.length === 0 && improvements.length === 0) {
        return <div className="whitespace-pre-wrap font-sans text-sm">{feedbackText}</div>;
    }

    return (
        <div className="space-y-6 text-text-primary dark:text-dark-text-primary">
            {overall && (
                <div>
                    <h4 className="font-bold text-lg mb-2">Overall Impression</h4>
                    <p className="text-text-muted dark:text-dark-text-muted">{overall}</p>
                </div>
            )}
            {points.length > 0 && (
                 <div>
                    <h4 className="font-bold text-lg mb-3 text-emerald-600 dark:text-emerald-400">Points of Performance</h4>
                    <ul className="space-y-3">
                        {points.map((point, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <CheckCircleIcon className="w-6 h-6 text-emerald-500 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                                <span>{point}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
             {improvements.length > 0 && (
                 <div>
                    <h4 className="font-bold text-lg mb-3 text-red-600 dark:text-red-400">Areas for Improvement</h4>
                    <ul className="space-y-3">
                        {improvements.map((imp, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <ExclamationTriangleIcon className="w-6 h-6 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
                                <span>{imp}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};


export default function MovementDetail({ movement, onBack }: MovementDetailProps): React.JSX.Element {
  const [view, setView] = useState<ViewMode>('details');
  const [modalContent, setModalContent] = useState<{ title: string; content: React.ReactNode } | null>(null);
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

  const [heatmapPoints, setHeatmapPoints] = useState<HeatmapPoint[]>([]);
  const [analyzedImageUrl, setAnalyzedImageUrl] = useState<string | null>(null);

  const showGripGuide = !noGripMovementIds.includes(movement.id);

  const saveAnalysisToHistory = useCallback((movementId: string, session: AnalysisSession) => {
    try {
        const allHistory = JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY) || '{}');
        const movementHistory = allHistory[movementId] || [];
        const updatedHistory = [session, ...movementHistory];
        allHistory[movementId] = updatedHistory;
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(allHistory));
        setHistory(updatedHistory);
    } catch (e) {
        console.error("Failed to save history to localStorage", e);
    }
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!imageFile) return;
    setIsAnalyzing(true);
    setError(null);
    setFeedback('');
    setHeatmapPoints([]);
    setAnalyzedImageUrl(null);
    try {
      const { feedbackText, heatmapPoints } = await analyzeMovementForm(imageFile, movement.name);
      setFeedback(feedbackText);
      setHeatmapPoints(heatmapPoints);

      const reader = new FileReader();
      reader.onloadend = () => {
          const imageDataUrl = reader.result as string;
          setAnalyzedImageUrl(imageDataUrl);
          const newSession: AnalysisSession = {
              id: Date.now(),
              date: new Date().toISOString(),
              imageDataUrl,
              feedback: feedbackText,
              heatmapPoints: heatmapPoints,
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

  const handleFileSelect = (file: File | null) => {
    setImageFile(file);
    // Clear previous analysis results when a new file is selected
    setFeedback('');
    setHeatmapPoints([]);
    setAnalyzedImageUrl(null);
  };

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
    if (!showGripGuide && view === 'grip') {
      setView('details');
    }
  }, [showGripGuide, view]);

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

    fetchDrills();
    fetchMobility();
    fetchTransitionTips();
    fetchEnergySavingTips();
    setHistory(getHistoryForMovement(movement.id));
  }, [movement.id, movement.name, fetchDrills, fetchMobility, fetchTransitionTips, fetchEnergySavingTips]);

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
                  onClick={() => setModalContent({ title: item.fault, content: ( <div className="flex items-start gap-4"> <FaultIcon iconId={item.iconId} className="w-12 h-12 text-brand-secondary flex-shrink-0 mt-1" /> <p className="text-text-primary dark:text-dark-text-primary mt-1 text-lg leading-relaxed">{item.fix}</p> </div> ) })}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setModalContent({ title: item.fault, content: ( <div className="flex items-start gap-4"> <FaultIcon iconId={item.iconId} className="w-12 h-12 text-brand-secondary flex-shrink-0 mt-1" /> <p className="text-text-primary dark:text-dark-text-primary mt-1 text-lg leading-relaxed">{item.fix}</p> </div> ) })}
                  role="button"
                  tabIndex={0}
                  aria-label={`View details for ${item.fault}`}
                  className="bg-surface dark:bg-dark-surface p-4 rounded-lg shadow-md hover:bg-slate-50 dark:hover:bg-slate-600 border border-border-color dark:border-dark-border-color transition-colors duration-200 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-brand-primary"
                >
                    <div className="flex items-start gap-4">
                        <FaultIcon iconId={item.iconId} className="w-8 h-8 text-brand-secondary flex-shrink-0 mt-1" />
                        <div>
                            <p className="font-semibold text-text-primary dark:text-dark-text-primary">{item.fault}</p>
                            <p className="text-text-muted dark:text-dark-text-muted mt-1 text-sm">{item.fix}</p>
                        </div>
                    </div>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'analyze':
        return (
          <div>
            <h3 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-4">Form Analysis</h3>
            <p className="text-text-muted dark:text-dark-text-muted mb-6">Upload a clear photo of yourself performing the movement. Our AI coach will provide personalized feedback with a visual heatmap.</p>
            <FileUpload onFileSelect={handleFileSelect} />
            <button
              onClick={handleAnalyze}
              disabled={!imageFile || isAnalyzing}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-brand-primary hover:bg-cyan-600 disabled:bg-gray-400 dark:disabled:bg-slate-500 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
            >
              <SparklesIcon className="w-5 h-5"/>
              {isAnalyzing ? 'Analyzing...' : 'Analyze My Form'}
            </button>
            {isAnalyzing && <div className="mt-6 flex justify-center"><LoadingSpinner /></div>}
            {analyzedImageUrl && feedback && (
              <div className="mt-8 grid md:grid-cols-2 gap-8 items-start animate-fade-in">
                <AnalysisImageViewer imageUrl={analyzedImageUrl} heatmapPoints={heatmapPoints} />
                <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg max-h-[500px] overflow-y-auto">
                    <ParsedFeedback feedbackText={feedback} />
                </div>
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
                          <li key={i}
                              onClick={() => setModalContent({ title: drill.name, content: <p className="text-lg leading-relaxed text-text-primary dark:text-dark-text-primary">{drill.description}</p> })}
                              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setModalContent({ title: drill.name, content: <p className="text-lg leading-relaxed text-text-primary dark:text-dark-text-primary">{drill.description}</p> })}
                              role="button"
                              tabIndex={0}
                              aria-label={`View details for ${drill.name}`}
                              className="bg-surface dark:bg-dark-surface p-4 rounded-lg shadow-md hover:bg-slate-50 dark:hover:bg-slate-600 border border-border-color dark:border-dark-border-color transition-colors duration-200 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-brand-primary">
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
                          <li key={i}
                              onClick={() => setModalContent({ title: ex.name, content: <p className="text-lg leading-relaxed text-text-primary dark:text-dark-text-primary">{ex.description}</p> })}
                              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setModalContent({ title: ex.name, content: <p className="text-lg leading-relaxed text-text-primary dark:text-dark-text-primary">{ex.description}</p> })}
                              role="button"
                              tabIndex={0}
                              aria-label={`View details for ${ex.name}`}
                              className="bg-surface dark:bg-dark-surface p-4 rounded-lg shadow-md hover:bg-slate-50 dark:hover:bg-slate-600 border border-border-color dark:border-dark-border-color transition-colors duration-200 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-brand-primary">
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
                          <li key={i}
                              onClick={() => setModalContent({ title: tip.name, content: <p className="text-lg leading-relaxed text-text-primary dark:text-dark-text-primary">{tip.description}</p> })}
                              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setModalContent({ title: tip.name, content: <p className="text-lg leading-relaxed text-text-primary dark:text-dark-text-primary">{tip.description}</p> })}
                              role="button"
                              tabIndex={0}
                              aria-label={`View details for ${tip.name}`}
                              className="bg-surface dark:bg-dark-surface p-4 rounded-lg shadow-md hover:bg-slate-50 dark:hover:bg-slate-600 border border-border-color dark:border-dark-border-color transition-colors duration-200 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-brand-primary">
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
                          <li key={i}
                              onClick={() => setModalContent({ title: tip.name, content: <p className="text-lg leading-relaxed text-text-primary dark:text-dark-text-primary">{tip.description}</p> })}
                              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setModalContent({ title: tip.name, content: <p className="text-lg leading-relaxed text-text-primary dark:text-dark-text-primary">{tip.description}</p> })}
                              role="button"
                              tabIndex={0}
                              aria-label={`View details for ${tip.name}`}
                              className="bg-surface dark:bg-dark-surface p-4 rounded-lg shadow-md hover:bg-slate-50 dark:hover:bg-slate-600 border border-border-color dark:border-dark-border-color transition-colors duration-200 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-brand-primary">
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
                    <p className="text-sm text-text-muted dark:text-dark-text-muted font-semibold mb-3">
                        {new Date(session.date).toLocaleString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <div className="grid md:grid-cols-2 gap-6 items-start">
                      <AnalysisImageViewer imageUrl={session.imageDataUrl} heatmapPoints={session.heatmapPoints || []} />
                      <div className="p-2 max-h-[400px] overflow-y-auto">
                         <ParsedFeedback feedbackText={session.feedback} />
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
             {showGripGuide && <TabButton mode="grip" label="Grip Guide" icon={<GripIcon className="w-5 h-5"/>}/>}
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
        isOpen={!!modalContent}
        onClose={() => setModalContent(null)}
        title={modalContent?.title || ''}
      >
        {modalContent?.content}
      </Modal>

    </div>
  );
}