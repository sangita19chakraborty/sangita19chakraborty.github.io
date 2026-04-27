import { usePageTransition } from '../context/TransitionContext';
import './TransitionOverlay.css';

export default function TransitionOverlay() {
  const { phase, label } = usePageTransition();

  if (phase === 'idle') return null;

  return (
    <div className={`pto pto--${phase}`} aria-hidden="true">
      <div className="pto__door pto__door--top" />
      <div className="pto__door pto__door--bottom" />
      <div className={`pto__center pto__center--${phase}`}>
        <span className="pto__scan" />
        <p className="pto__label">{label}</p>
      </div>
    </div>
  );
}
