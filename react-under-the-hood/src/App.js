import { useState, useCallback } from 'react';
import "./App.css";
import Button from './components/UI/Button';
import ParagraphOutput from './components/Output/ParagraphOutput';

const App = () => {
  const [isParagraphShown, setIsParagraphShown] = useState(false);
  const [isTogglingActivated, setIsTogglingActivated] = useState(false);

  console.log('App Component');

  const toggleParagraph = useCallback(() => {
    if (isTogglingActivated) {
      setIsParagraphShown(prevState => !prevState);
    }
  }, [isTogglingActivated]);

  const activateToggling = () => {
    setIsTogglingActivated(true);
  };

  return (
    <div className="app">
      <h1>React under the hood</h1>
      <ParagraphOutput isShown={isParagraphShown} />
      <Button onClick={activateToggling}>Активировать Переключение</Button>
      <Button onClick={toggleParagraph}>Показать / Скрыть</Button>
    </div>
  );
};

export default App;
