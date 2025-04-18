async function generatePDF() {
  
    const { jsPDF } = window.jspdf;
    
    const doc = new jsPDF();
  
    doc.addFileToVFS('malgun.ttf', _fonts); 
    doc.addFont('malgun.ttf','malgun', 'normal');
    doc.setFont('malgun'); 
    doc.setFontSize(8);
  
    const normalRanges = {
        "적혈구": ["4.5~6.0 (×10^6/μL)", 4.5, 6.0],
        "남성 혈색소": ["12~16 / 남자: 13.0~17.0 / 여자: 12.0~16.0 (g/dL)", 13.0, 17.0],
        "여성 혈색소": ["12~16 / 남자: 13.0~17.0 / 여자: 12.0~16.0 (g/dL)", 12.0, 16.0],
        "남성 헤마토크릿": ["남자: 39~51% / 여자: 36~48%", 39, 51],
        "여성 헤마토크릿": ["남자: 39~51% / 여자: 36~48%", 36, 48],
        "백혈구": ["4,000~10,000 (/mm³)", 4000, 10000],
        "호중구": ["33~72%", 33, 72],
        "림프구": ["22~40%", 20, 40],
        "단핵구": ["1~8%", 1, 8],
        "호산구": ["1~4%", 1, 4],
        "호염기구": ["0~1%", 0, 1],
        "PT": ["11.4~15.4초", 11.4, 15.4],
        "aPTT": ["33~45초", 33, 45],
        "혈소판": ["150,000~450,000 (/μL)", 150000, 450000],
        "콜레스테롤": ["< 200 mg/dL", 0, 200],
        "중성지방": ["< 150 mg/dL", 0, 150],
        "LDL": ["< 100 mg/dL", 0, 100],
        "남성 HDL": ["남: > 40 / 여: >50 mg/dL", 40, 100],
        "여성 HDL": ["남: > 40 / 여: >50 mg/dL", 40, 100],
        "공복시 혈당": ["70~100 mg/dL", 70, 100],
        "무작위 혈당": ["< 200 mg/dL", 0, 200],
        "식후2시간 혈당": ["< 140 mg/dL", 0, 140],
        "당화혈색소": ["4-6%", 4, 6],
        "단백질": ["6.6~8.3 g/dL", 6.6, 8.3],
        "알부민": ["3.5~5.2 g/dL", 3.5, 5.2],
        "글로불린": ["2.0~4.2 g/dL", 2.0, 4.2],
        "AST": ["< 40 U/L", 0, 40],
        "ALT": ["< 40 U/L", 0, 40]
    };

  
    let questions = '';
    let answers = '';
  
    Object.keys(normalRanges).forEach((test, i) => {
      const [desc, low, high] = normalRanges[test];
      
      let sample = parseFloat((Math.random() * (high * 1.5)).toFixed(2));
      let status = '';
      if (sample < low) {
        status = '낮음';
      } else if (sample > high) {
        status = '높음';
      } else {
        status = '정상';
      }
  
      questions += `${i+1}. 환자의 ${test} 수치는 ${sample}입니다. 이 수치는?\n`;
      questions += "   a. 정상   b. 높음   c. 낮음\n\n";
  
      let answer = '';
      if (status === '정상') answer = 'a. 정상';
      else if (status === '높음') answer = 'b. 높음';
      else answer = 'c. 낮음';
  
      answers += `${i+1}. ${test} - 정답: ${answer} \n정상치: ${desc}\n\n`;
    });
  
    // 페이지에 텍스트 추가
    doc.text("혈액검사 수치 해석 문제", 10, 10);
    doc.text(questions, 10, 20);
    doc.addPage();
    doc.text("혈액검사 수치 해석 해답지", 10, 10);
    doc.text(answers, 10, 20);
  
    // PDF 다운로드
    doc.save("혈액검사_문제_해답지.pdf");
}