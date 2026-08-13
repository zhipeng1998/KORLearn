import './Hangul.css';
import HangulBoard from '../components/Hangul/HangulBoard';

function Hangul() {
  return (
    <div className="page-container">
      <div className="page-header text-center">
        <h1>Learn Hangul (한글)</h1>
        <p className="subtitle">The elegant and logical Korean alphabet.</p>
      </div>
      
      <div className="module-container">
        <HangulBoard />
      </div>
    </div>
  );
}

export default Hangul;
