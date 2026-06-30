import { useEffect, useRef, useCallback } from 'react';
import test2Img from './assets/test2.jpg';
import './App.css';

function App() {
  // 1. DOM要素にアクセスするためのRefを準備
  const boxRef = useRef(null);
  const spacerRef = useRef(null);
  const photoRef = useRef(null);

  // 2. 高さを計算・調整する関数（useCallbackでメモ化）
  const adjustLayout = useCallback(() => {
    const box = boxRef.current;
    const spacer = spacerRef.current;
    const photo = photoRef.current;

    // 要素がまだレンダリングされていない場合は何もしない
    if (!box || !spacer || !photo) return;

    // 一旦スペーサーの高さをリセット
    spacer.style.height = '0px';

    let prevHeight = -1;
    const maxLoops = 10; // 無限ループ防止

    // テキストの押し出しによる高さの変化が収束するまで計算
    for (let i = 0; i < maxLoops; i++) {
      const boxStyle = window.getComputedStyle(box);
      const paddingTop = parseFloat(boxStyle.paddingTop);
      const paddingBottom = parseFloat(boxStyle.paddingBottom);

      const innerHeight = box.clientHeight - paddingTop - paddingBottom;

      if (Math.abs(innerHeight - prevHeight) < 1) {
        break;
      }

      const photoStyle = window.getComputedStyle(photo);
      const photoTotalHeight =
        photo.offsetHeight +
        parseFloat(photoStyle.marginTop) +
        parseFloat(photoStyle.marginBottom);

      let newSpacerHeight = innerHeight - photoTotalHeight;
      if (newSpacerHeight < 0) newSpacerHeight = 0;

      spacer.style.height = newSpacerHeight + 'px';
      prevHeight = innerHeight;
    }
  }, []);

  // 3. リサイズ時のイベントリスナー登録と解除
  useEffect(() => {
    // 画面サイズが変わった時に再計算
    window.addEventListener('resize', adjustLayout);
    
    // 初回マウント時にも一回実行しておく
    adjustLayout();

    // コンポーネントが破棄される時にリスナーをお掃除する（Reactの重要なお作法）
    return () => {
      window.removeEventListener('resize', adjustLayout);
    };
  }, [adjustLayout]);

  return (
    <>
      {/* 4. idの代わりにrefを渡し、classをclassNameに変更 */}
      <div className="box" ref={boxRef}>
        <div className="spacer" ref={spacerRef}></div>
        
        {/* 画像の読み込みが完了したタイミングで adjustLayout を呼ぶ */}
        <img
          src={test2Img}
          alt="写真"
          className="photo"
          ref={photoRef}
          width="120"
          height="180"
          onLoad={adjustLayout} 
        />
        
        <p className="text">
          ここにテキストが入ります。テキストの量が増えれば枠の高さが自動で伸び、
          JavaScriptが枠の高さを瞬時に計算して、画像を常に右下に押し下げてくれます。
          文章と画像が被る部分は、綺麗に回り込んでくれます。
        </p>
      </div>
    </>
  );
}

export default App;