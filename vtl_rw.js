// VTLファイルを読み込む関数 (複数の動画ファイル)
function loadVTLFile(file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    const zip = new JSZip();
    zip.loadAsync(e.target.result).then(function(contents) {
      const videoFiles = [];
      
      // 複数の動画ファイルを読み込み
      for (let fileName in contents.files) {
        if (fileName.endsWith('.mp4')) {
          const videoData = contents.files[fileName].async("base64");
          videoData.then(function(data) {
            const videoURL = 'data:video/mp4;base64,' + data;
            videoFiles.push(videoURL);
            console.log("VTLファイルの動画が読み込まれました:", videoURL);
          });
        }
      }

      // 動画ファイルが全て読み込まれた後に処理を続ける
      if (videoFiles.length > 0) {
        console.log("全ての動画ファイルが読み込まれました:", videoFiles);
      }
    });
  };
  reader.readAsArrayBuffer(file);
}
