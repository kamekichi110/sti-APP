// STIファイルを読み込む関数 (複数の音声ファイル)
function loadSTIFile(file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    const zip = new JSZip();
    zip.loadAsync(e.target.result).then(function(contents) {
      const audioFiles = [];
      
      // 複数の音声ファイルを読み込み
      for (let fileName in contents.files) {
        if (fileName.endsWith('.mp3')) {
          const audioData = contents.files[fileName].async("base64");
          audioData.then(function(data) {
            const audioURL = 'data:audio/mp3;base64,' + data;
            audioFiles.push(audioURL);
            console.log("STIファイルの音声が読み込まれました:", audioURL);
          });
        }
      }

      // 音声ファイルが全て読み込まれた後に処理を続ける
      if (audioFiles.length > 0) {
        console.log("全ての音声ファイルが読み込まれました:", audioFiles);
      }
    });
  };
  reader.readAsArrayBuffer(file);
}
