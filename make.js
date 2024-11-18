// 複数の音声ファイルを一つのSTIファイルに保存
function saveSTIFile(dataURLs, fileName) {
  const zip = new JSZip();
  
  // 各音声ファイルをdataURLとして保存
  dataURLs.forEach((dataURL, index) => {
    zip.file(`${fileName}_audio${index + 1}.mp3`, dataURL.split(',')[1], { base64: true });
  });

  // ZIPファイルを作成し、保存
  zip.generateAsync({ type: 'blob' }).then(function(content) {
    saveAs(content, fileName.replace('.sti', '.zip'));
  });
}

// 複数の動画ファイルを一つのVTLファイルに保存
function saveVTLFile(dataURLs, fileName) {
  const zip = new JSZip();
  
  // 各動画ファイルをdataURLとして保存
  dataURLs.forEach((dataURL, index) => {
    zip.file(`${fileName}_video${index + 1}.mp4`, dataURL.split(',')[1], { base64: true });
  });

  // ZIPファイルを作成し、保存
  zip.generateAsync({ type: 'blob' }).then(function(content) {
    saveAs(content, fileName.replace('.vtl', '.zip'));
  });
}
