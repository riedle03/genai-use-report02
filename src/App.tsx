import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import './App.css'; // Import App-specific styles
import wordCloudImage from './image.png';

// Data for the charts
// Pie Chart: AI Tool Usage
const pieChartData = [
  { name: 'ChatGPT', value: 17, users: 17 }, // 'value' for chart, 'users' for tooltip if needed
  { name: 'Gemini', value: 6, users: 6 },
  { name: 'Perplexity', value: 3, users: 3 },
  { name: 'Wrtn (뤼튼)', value: 3, users: 3 },
  { name: '기타 (Other)', value: 3, users: 3 },
];
// Colors for Pie Chart (ensure enough colors if more categories)
const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4560'];

// Bar Chart: AI Usage by Subject
const subjectUsageData = [
  { subject: 'Java', 학생수: 16 },
  { subject: '영어', 학생수: 12 },
  { subject: '국어', 학생수: 8 },
  { subject: '기타', 학생수: 4 },
];

// Histogram (Bar Chart): Weekly AI Usage Frequency
const weeklyFrequencyData = [
  { range: '6일 이상', 학생수: 10 },
  { range: '4~5일', 학생수: 5 },
  { range: '2~3일', 학생수: 2 },
  { range: '1일 이하', 학생수: 1 },
];

// Custom Tooltip for Pie Chart to show percentage
const CustomPieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const total = pieChartData.reduce((sum, entry) => sum + entry.value, 0);
    const percent = ((data.value / total) * 100).toFixed(1);
    return (
      <div className="custom-tooltip bg-white p-2 border border-gray-300 rounded shadow-lg">
        <p className="label font-semibold">{`${data.name} : ${data.users}명 (${percent}%)`}</p>
      </div>
    );
  }
  return null;
};

// Custom Tooltip for Bar Charts
const CustomBarTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-white p-2 border border-gray-300 rounded shadow-lg">
        <p className="label font-semibold">{`${label}`}</p>
        <p className="intro">{`학생 수 : ${payload[0].value}명`}</p>
      </div>
    );
  }
  return null;
};


const App: React.FC = () => {
  // Path to the image. If using Vite and the image is in the `public` folder:
  const wordCloudImagePath = wordCloudImage;
  // If the image is imported:
  // import wordCloudImage from './assets/image_b1d5ee.jpg'; // then use wordCloudImage

  return (
    <div className="container mx-auto p-4 md:p-8 bg-white shadow-xl rounded-lg my-8 max-w-4xl">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-700 mb-2">생성형 AI, 우리 반은 이렇게 쓴다</h1>
        <p className="text-xl text-gray-600">우리학교 1학년 4반 생성형 AI 활용 실태 보고서</p>
      </header>

      <section className="report-section">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-l-4 border-blue-500 pl-4">1. 조사 동기와 목적</h2>
        <p>
          최근 생성형 인공지능(Generative AI)의 기술 고도화는 산업과 교육을 포함한 사회 전반에 중대한 변화를 초래하고 있다. 특히 2025년 4월, 카카오는 "코딩 등 인공지능(AI)이 대체 가능한 직무에 대해서는 신입 채용을 제한한다"는 방침을 공표하였다. 이와 같은 사례는 생성형 AI가 단순한 지원 도구를 넘어서 실질적으로 인간 노동을 대체할 수 있는 기술로 기능하고 있음을 시사한다.
        </p>
        <p>
          한편, 청소년의 생성형 AI 활용 실태 또한 급속히 변화하고 있다. 한국청소년정책연구원에 따르면, 중·고등학생 가운데 67.9%가 생성형 AI를 사용한 경험이 있으며, 특히 고등학생의 사용률이 중학생보다 높은 것으로 나타났다.
        </p>
        <p>
          이러한 사회적 흐름을 반영하여 본 조사는 우리 반 학생들이 생성형 AI를 어느 정도의 빈도로, 어떠한 목적과 방식으로 활용하고 있는지를 실태 중심으로 분석하고자 기획되었다. 본 조사의 주요 연구 질문은 다음과 같다.
        </p>
        <ul className="list-disc list-inside pl-4 my-4 space-y-1 text-gray-700">
          <li>학생들이 주로 사용하는 생성형 AI의 종류는 무엇인가?</li>
          <li>생성형 AI는 주로 어떤 과목이나 상황에서 활용되는가?</li>
          <li>주간 사용 빈도는 어느 정도인가?</li>
          <li>생성형 AI와 함께 공부하기 위해 요구되는 역량은 무엇인가?</li>
        </ul>
        <p>
          이러한 질문에 대한 실증적 응답을 바탕으로, 생성형 AI 시대를 살아가는 고등학생에게 필요한 디지털 리터러시와 활용 전략을 탐색하고자 한다.
        </p>
      </section>

      <section className="report-section">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-l-4 border-blue-500 pl-4">2. 조사 계획</h2>
        <p>
          조사는 2025년 5월 12일부터 2025년 5월 16일까지 총 5일간 실시되었으며, 조사 대상은 미림마이스터고등학교 1학년 4반 학생 18명 전원이다. 조사 방법은 다음과 같이 설계되었다.
        </p>
        <div className="mt-4 pl-4">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">설문조사:</h3>
            <p className="ml-4">Google Forms를 활용하여 총 3문항으로 구성함. 복수 응답 및 단일 응답 방식 혼용.</p>
            <h3 className="text-xl font-semibold text-gray-700 mt-4 mb-2">인터뷰:</h3>
            <p className="ml-4">질적 분석을 위한 보조 자료로 활용.</p>
            <p className="ml-4 font-medium mt-2">대상자 선정 기준:</p>
            <ul className="list-disc list-inside ml-8 space-y-1 text-gray-700">
                <li>생성형 AI 유료 서비스를 이용 중인 학생</li>
                <li>중학교 시절부터 생성형 AI를 지속적으로 활용해 온 학생</li>
                <li>생성형 AI 활용에 대해 부정적인 인식을 가진 학생</li>
            </ul>
            <p className="ml-4 font-medium mt-2">문항 구성:</p>
            <p className="ml-8">공통 질문 2개와 개인화된 질문 1개로 구성하여 심층적인 응답을 유도함.</p>
        </div>
      </section>

      <section className="report-section">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-l-4 border-blue-500 pl-4">3. 조사 결과</h2>

        <h3 className="text-2xl font-semibold text-gray-700 mb-4 mt-8">가. 생성형 AI 종류별 사용 비율</h3>
        <p className="mb-6 text-gray-600">
          조사 결과, 전체 학생 중 ChatGPT를 주로 사용하고 있는 것으로 나타났으며, 이어 Gemini, Perplexity, Wrtn(뤼튼), 기타의 순으로 나타났다. 대부분의 학생이 ChatGPT를 주요 도구로 활용하고 있었으며, 목적에 따라 Gemini, Perplexity, Wrtn 등을 병행 사용하는 경향을 보였다. (중복 응답 가능)
        </p>
        <div className="chart-container h-80 md:h-96 w-full">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius="80%"
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomPieTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-4 text-sm text-gray-500 text-center">
            ChatGPT: 17명 (53.1%), Gemini: 6명 (18.8%), Perplexity: 3명 (9.4%), Wrtn(뤼튼): 3명 (9.4%), 기타: 3명 (9.4%) - 비율은 총 응답 수 기반
        </p>


        <h3 className="text-2xl font-semibold text-gray-700 mb-4 mt-12">나. 과목별 생성형 AI 활용 빈도</h3>
         <p className="mb-6 text-gray-600">
          과목별 생성형 AI 활용 현황을 살펴보면, Java 과목에서의 활용 빈도가 가장 높게 나타났으며(16명), 그 다음으로 영어(12명), 국어(8명), 기타 과목(4명) 순으로 조사되었다. 특히 프로그래밍 과목에서의 활용이 두드러졌으며, 영어 작문과 자기소개서 작성 등의 영어 과제에서도 높은 활용도를 보였다. 국어 과목에서는 글쓰기나 문학 감상문 작성 등에서 AI를 사용하는 사례가 일부 확인되었다.
        </p>
        <div className="chart-container h-80 md:h-96 w-full">
          <ResponsiveContainer>
            <BarChart layout="vertical" data={subjectUsageData} margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="subject" type="category" width={80} />
              <Tooltip content={<CustomBarTooltip />} />
              <Legend />
              <Bar dataKey="학생수" fill="#82ca9d" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <h3 className="text-2xl font-semibold text-gray-700 mb-4 mt-12">다. 생성형 AI 주간 사용 빈도</h3>
        <p className="mb-6 text-gray-600">
          주간 사용 빈도 분석 결과, 전체 응답자 18명 중 10명(55.6%)이 주 6일 이상 생성형 AI를 사용하고 있었으며, 5명(27.8%)은 주 4~5일, 2명(11.1%)은 주 2~3일, 1명(5.6%)은 주 1일 이하 사용하는 것으로 나타났다. 이는 전국 평균 사용률보다 현저히 높은 수치로, 마이스터고등학교라는 학교의 특수성이 반영된 결과로 해석할 수 있다.
        </p>
        <div className="chart-container h-80 md:h-96 w-full">
          <ResponsiveContainer>
            <BarChart data={weeklyFrequencyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip content={<CustomBarTooltip />} />
              <Legend />
              <Bar dataKey="학생수" fill="#8884d8" barSize={50}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <h3 className="text-2xl font-semibold text-gray-700 mb-4 mt-12">라. 인터뷰 기반 질적 분석</h3>
        <div className="bg-gray-50 p-6 rounded-lg shadow">
            <p className="text-gray-700">질적 분석을 위해 선정된 인터뷰 참여자들의 응답을 요약하면 다음과 같다.</p>
            <ul className="list-disc list-inside pl-4 my-4 space-y-2 text-gray-700">
                <li>생성형 AI 유료 사용자들은 유료 버전의 GPT가 코드 생성 속도 및 정확도 면에서 우수하다고 평가하였으며, 무료 사용자에게는 Gemini 2.5의 성능을 추천하였다.</li>
                <li>생성형 AI를 효과적으로 활용하기 위해서는 프롬프트의 구체성과 맥락 제시가 매우 중요하다는 점을 공통적으로 지적하였다.</li>
                <li>생성형 AI는 초기 코드 생성 단계에서 강력한 성능을 보이나, 조건이 변경되거나 추가 수정이 필요한 상황에서는 오류 발생 가능성이 높아진다는 점이 지적되었다.</li>
                <li>이에 따라 응답자들은 생성형 AI의 결과물에 무비판적으로 의존하기보다는 일정 부분은 직접 수정하고 검토할 수 있는 비판적 사고 능력의 중요성을 강조하였다. 특히 향후 개발자로 진로를 희망하는 학생의 경우, 생성형 AI를 보조 도구로 활용할 수 있는 능력이 필수적이며, 도구 사용에 대한 주도적 인식이 요구된다고 언급하였다.</li>
            </ul>
            <div className="my-6 text-center">
              <h4 className="text-lg font-semibold text-gray-700 mb-2">인터뷰 기반 핵심 키워드 워드 클라우드</h4>
              {/* Assuming image_b1d5ee.jpg is in the public folder for Vite.
                Replace with actual path or import if image is in src/assets.
              */}
              <img 
                src={wordCloudImagePath} 
                alt="인터뷰 기반 핵심 키워드 워드 클라우드" 
                className="report-image mx-auto" 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null; // prevent infinite loop if placeholder also fails
                  target.src = "https://placehold.co/600x400/E0E0E0/B0B0B0?text=Word+Cloud+Image+Not+Found";
                  target.alt = "워드 클라우드 이미지 로드 실패";
                }}
              />
            </div>
        </div>
      </section>

      <section className="report-section">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-l-4 border-blue-500 pl-4">4. 결론 및 제언</h2>
        <h3 className="text-2xl font-semibold text-gray-700 mb-3 mt-6">가. 시사점 요약</h3>
        <p>
          본 조사 결과를 종합해 보면, 우리 반 학생들은 전국 평균보다 월등히 높은 빈도로 생성형 AI를 활용하고 있으며, 이 중 절반 이상이 ChatGPT를 주요 도구로 사용하고 있다. 활용 과목으로는 Java 및 영어 과제가 주를 이루었으며, 대부분의 학생들이 주 4일 이상 생성형 AI를 사용하는 것으로 나타났다. 학생들은 AI를 효과적으로 활용하기 위해 프롬프트 작성 능력과 결과 분석 역량을 중요하게 인식하고 있었으며, 단순한 수용을 넘어서 비판적 활용 역량을 갖추고자 하는 인식 수준도 상당히 높았다.
        </p>

        <h3 className="text-2xl font-semibold text-gray-700 mb-3 mt-8">나. 활용 제언</h3>
        <ul className="list-decimal list-inside pl-4 space-y-2 text-gray-700">
          <li>
            <strong>적절한 도구 선택:</strong> 생성형 AI는 목적에 따라 적절한 도구를 구분하여 사용하는 것이 바람직하다. 예를 들어, 글쓰기에는 Wrtn, 정보 검색에는 Perplexity, 이미지 생성에는 Midjourney 등 도구의 특성과 장점을 이해한 선택적 활용이 요구된다.
          </li>
          <li>
            <strong>비판적 사고 함양:</strong> 생성형 AI가 제공하는 결과물에 대해 무비판적으로 수용하기보다는, 그 정확성과 맥락 적합성을 스스로 검토하고 수정할 수 있는 능력을 함양하는 것이 중요하다.
          </li>
          <li>
            <strong>주체적 활용 태도:</strong> 생성형 AI는 학습을 주도하는 존재가 아니라 학습을 보조하는 도구임을 명확히 인식해야 한다. 따라서 학생 스스로가 학습의 주체로서 역할을 수행할 수 있도록, AI에 대한 의존보다는 주체적 활용 태도를 강화하는 방향으로 교육이 이루어져야 할 것이다.
          </li>
        </ul>
      </section>

      <footer className="report-section references mt-12 pt-8 border-t border-gray-300">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">참고문헌</h2>
        <ul className="list-none pl-0 space-y-1">
          <li>매일경제. (2025년 4월 17일). [단독] “24시간 일 시켜도 불평 없어”…카카오, 코딩 등 AI로 대체할 업무 신입 안 뽑는다. <a href="https://www.mk.co.kr/news/it/11294588" target="_blank" rel="noopener noreferrer">https://www.mk.co.kr/news/it/11294588</a></li>
          <li>에듀플러스. (2025년 2월 25일). 청소년 3명 중 2명, 생성형 AI 사용 경험 있어. <a href="https://www.eduplusnews.com/news/articleView.html?idxno=14137" target="_blank" rel="noopener noreferrer">https://www.eduplusnews.com/news/articleView.html?idxno=14137</a></li>
          <li>IBM. (2024). What is generative AI? <a href="https://www.ibm.com/think/topics/generative-ai" target="_blank" rel="noopener noreferrer">https://www.ibm.com/think/topics/generative-ai</a></li>
          {/* Add other references similarly */}
          <li>SAP. What is generative AI? <a href="https://www.sap.com/hk/products/artificial-intelligence/what-is-generative-ai.html" target="_blank" rel="noopener noreferrer">https://www.sap.com/hk/products/artificial-intelligence/what-is-generative-ai.html</a></li>
          <li>GitHub. GitHub Copilot Features. <a href="https://github.com/features/copilot" target="_blank" rel="noopener noreferrer">https://github.com/features/copilot</a></li>
        </ul>
      </footer>
    </div>
  );
};

export default App;

