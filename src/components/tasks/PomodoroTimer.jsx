import { useState, useEffect, useRef } from 'react';
import { Timer, Play, Pause, RotateCcw, Settings, X } from 'lucide-react';
import Button from '../common/Button';
import { useToast } from '../../context/ToastContext';

const PomodoroTimer = () => {
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('work'); // work, break, longBreak
  const [timeLeft, setTimeLeft] = useState(25 * 60); // seconds
  const [sessions, setSessions] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  // Settings
  const [settings, setSettings] = useState({
    workDuration: 25,
    breakDuration: 5,
    longBreakDuration: 15,
    longBreakInterval: 4,
    autoStart: false,
    soundEnabled: true,
  });

  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('pomodoroSettings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setSettings(parsed);
      setTimeLeft(parsed.workDuration * 60);
    }
  }, []);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeLeft]);

  const handleTimerComplete = () => {
    setIsActive(false);

    // Play notification sound
    if (settings.soundEnabled) {
      playNotificationSound();
    }

    // Show notification
    if (mode === 'work') {
      toast.success('Work session complete! Time for a break.');
      const newSessions = sessions + 1;
      setSessions(newSessions);

      // Determine break type
      if (newSessions % settings.longBreakInterval === 0) {
        setMode('longBreak');
        setTimeLeft(settings.longBreakDuration * 60);
      } else {
        setMode('break');
        setTimeLeft(settings.breakDuration * 60);
      }
    } else {
      toast.info('Break complete! Ready for the next session?');
      setMode('work');
      setTimeLeft(settings.workDuration * 60);
    }

    // Auto-start next session if enabled
    if (settings.autoStart) {
      setIsActive(true);
    }
  };

  const playNotificationSound = () => {
    // Create a simple beep sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMode('work');
    setTimeLeft(settings.workDuration * 60);
    setSessions(0);
  };

  const skipSession = () => {
    setIsActive(false);
    if (mode === 'work') {
      const newSessions = sessions + 1;
      setSessions(newSessions);

      if (newSessions % settings.longBreakInterval === 0) {
        setMode('longBreak');
        setTimeLeft(settings.longBreakDuration * 60);
      } else {
        setMode('break');
        setTimeLeft(settings.breakDuration * 60);
      }
    } else {
      setMode('work');
      setTimeLeft(settings.workDuration * 60);
    }
  };

  const saveSettings = () => {
    localStorage.setItem('pomodoroSettings', JSON.stringify(settings));
    setTimeLeft(settings.workDuration * 60);
    setShowSettings(false);
    toast.success('Settings saved');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    let total;
    if (mode === 'work') total = settings.workDuration * 60;
    else if (mode === 'break') total = settings.breakDuration * 60;
    else total = settings.longBreakDuration * 60;

    return ((total - timeLeft) / total) * 100;
  };

  const getModeColor = () => {
    if (mode === 'work') return 'text-accent';
    if (mode === 'break') return 'text-green-500';
    return 'text-blue-500';
  };

  const getModeLabel = () => {
    if (mode === 'work') return 'Focus Time';
    if (mode === 'break') return 'Short Break';
    return 'Long Break';
  };

  if (!isOpen) {
    return (
      <Button
        variant="secondary"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 shadow-lg"
        title="Pomodoro Timer"
      >
        <Timer size={20} />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 bg-card-bg border border-border rounded-lg shadow-2xl w-80 animate-slide-in">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Timer size={18} className={getModeColor()} />
          <h3 className="font-semibold text-text-primary text-sm">{getModeLabel()}</h3>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-1 hover:bg-bg-secondary rounded transition-colors"
            title="Settings"
          >
            <Settings size={16} className="text-text-secondary" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-bg-secondary rounded transition-colors"
            title="Close"
          >
            <X size={16} className="text-text-secondary" />
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="p-3 border-b border-border bg-bg-secondary">
          <div className="space-y-2">
            <div>
              <label className="text-xs text-text-secondary">Work Duration (min)</label>
              <input
                type="number"
                value={settings.workDuration}
                onChange={(e) => setSettings({ ...settings, workDuration: parseInt(e.target.value) })}
                className="w-full px-2 py-1 bg-bg-primary border border-border rounded text-sm text-text-primary mt-1"
                min="1"
                max="60"
              />
            </div>
            <div>
              <label className="text-xs text-text-secondary">Break Duration (min)</label>
              <input
                type="number"
                value={settings.breakDuration}
                onChange={(e) => setSettings({ ...settings, breakDuration: parseInt(e.target.value) })}
                className="w-full px-2 py-1 bg-bg-primary border border-border rounded text-sm text-text-primary mt-1"
                min="1"
                max="30"
              />
            </div>
            <div>
              <label className="text-xs text-text-secondary">Long Break Duration (min)</label>
              <input
                type="number"
                value={settings.longBreakDuration}
                onChange={(e) => setSettings({ ...settings, longBreakDuration: parseInt(e.target.value) })}
                className="w-full px-2 py-1 bg-bg-primary border border-border rounded text-sm text-text-primary mt-1"
                min="1"
                max="60"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="autoStart"
                checked={settings.autoStart}
                onChange={(e) => setSettings({ ...settings, autoStart: e.target.checked })}
                className="rounded"
              />
              <label htmlFor="autoStart" className="text-xs text-text-secondary">Auto-start sessions</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="soundEnabled"
                checked={settings.soundEnabled}
                onChange={(e) => setSettings({ ...settings, soundEnabled: e.target.checked })}
                className="rounded"
              />
              <label htmlFor="soundEnabled" className="text-xs text-text-secondary">Sound notifications</label>
            </div>
            <Button variant="primary" onClick={saveSettings} className="w-full text-sm mt-2">
              Save Settings
            </Button>
          </div>
        </div>
      )}

      {/* Timer Display */}
      <div className="p-6">
        {/* Progress Ring */}
        <div className="relative w-48 h-48 mx-auto">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-bg-secondary"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 88}`}
              strokeDashoffset={`${2 * Math.PI * 88 * (1 - getProgress() / 100)}`}
              className={`${getModeColor()} transition-all duration-1000`}
              strokeLinecap="round"
            />
          </svg>

          {/* Time Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-text-primary tabular-nums">
              {formatTime(timeLeft)}
            </div>
            <div className="text-xs text-text-tertiary mt-1">
              Session {sessions + 1}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <Button
            variant="primary"
            onClick={toggleTimer}
            className="px-6"
          >
            {isActive ? <Pause size={18} /> : <Play size={18} />}
            <span>{isActive ? 'Pause' : 'Start'}</span>
          </Button>
          <Button
            variant="secondary"
            onClick={resetTimer}
            className="px-3"
            title="Reset"
          >
            <RotateCcw size={18} />
          </Button>
          <Button
            variant="secondary"
            onClick={skipSession}
            className="px-3 text-xs"
          >
            Skip
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
