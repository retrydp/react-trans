import React, { useState, useRef, useEffect } from 'react';
import template from './template.json';

const App = () => {
  const [lang, setLang] = useState(false),
    [outputText, setOutputText] = useState('');

  const input = useRef(),
    out = useRef();

  const templateReversed = Object.fromEntries(
    Object.entries(template).map(([key, val]) => [val, key]),
  );

  const translate = () => {
    setOutputText(
      input.current.value.replace(/./g, (i) =>
        lang ? templateReversed[i] || '' : template[i] || '',
      ),
    );
  };

  useEffect(() => translate(), [lang]);

  const setLanguage = () => {
    setLang(!lang);
  };

  const copyText = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
      out.current.defaultValue = '< Текст скопирован в буфер обмена. >';
    }
  };

  return (
    <>
      <form>
        <textarea
          ref={input}
          rows="4"
          cols="50"
          name="subject"
          onChange={translate}
          placeholder="Введите или скопируйте текст"
          className="message string"></textarea>
        <button name="submit" className="btn toggle" type="button" onClick={setLanguage}>
          {lang ? 'RU' : 'EN'}
        </button>
      </form>
      <textarea
        ref={out}
        rows="4"
        cols="50"
        onClick={copyText}
        className="result"
        placeholder="Online перевод раскладки:
Набрали текст, а раскладку клавиатуры не переключили? Не беда! Вам поможет исправление раскладки онлайн (английский - русский).
Не забудте выбрать правильный язык кнопкой-переключателем!!!"
        defaultValue={outputText}
        readOnly></textarea>
    </>
  );
};

export default App;
